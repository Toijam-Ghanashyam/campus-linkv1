import os
import json
import requests
from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from supabase import create_client, Client
from pydantic import BaseModel

# ==========================================
# 1. Initialization & Configuration
# ==========================================

app = FastAPI(title="CampusLink API")

# Enable CORS for the Vite React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Supabase Credentials
SUPABASE_URL = os.environ.get("SUPABASE_URL", "your_supabase_url")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY", "your_supabase_key")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Notion Credentials
NOTION_TOKEN = os.environ.get("NOTION_TOKEN", "your_notion_integration_secret")
NOTION_DB_ID = os.environ.get("NOTION_DB_ID", "your_32_character_database_id")

# ==========================================
# 2. Pydantic Models
# ==========================================

class MatchRequest(BaseModel):
    student_id: str
    job_id: str

class DriveSchedule(BaseModel):
    recruiter_id: str
    title: str
    required_skills: list[str]
    min_cgpa: float
    drive_date: str

# ==========================================
# 3. Notion Remediation Task (Background)
# ==========================================

def generate_notion_roadmap(student_id: str, target_role: str, gap_analysis: str):
    url = "https://api.notion.com/v1/pages"
    headers = {
        "Authorization": f"Bearer {NOTION_TOKEN}",
        "Content-Type": "application/json",
        "Notion-Version": "2022-06-28"
    }
    
    payload = {
        "parent": {"database_id": NOTION_DB_ID},
        "properties": {
            "title": {
                "title": [{"text": {"content": f"AI/ML Remediation Plan: {target_role}"}}]
            }
        },
        "children": [
            {
                "object": "block",
                "type": "heading_2",
                "heading_2": {"rich_text": [{"text": {"content": "Identified Skill Gaps"}}]}
            },
            {
                "object": "block",
                "type": "paragraph",
                "paragraph": {"rich_text": [{"text": {"content": gap_analysis}}]}
            },
            {
                "object": "block",
                "type": "heading_2",
                "heading_2": {"rich_text": [{"text": {"content": "120-Minute Action Plan"}}]}
            },
            {
                "object": "block",
                "type": "to_do",
                "to_do": {
                    "rich_text": [{"text": {"content": "Minutes 0-45: Conceptual Data Storytelling (Kaggle Titanic Survival dataset walk-through to understand core logic)"}}]
                }
            },
            {
                "object": "block",
                "type": "to_do",
                "to_do": {
                    "rich_text": [{"text": {"content": "Minutes 45-90: Applied Implementation & Syntax in Python (Pandas/NumPy basics)"}}]
                }
            },
            {
                "object": "block",
                "type": "to_do",
                "to_do": {
                    "rich_text": [{"text": {"content": "Minutes 90-120: Evaluation Metrics & Next Steps"}}]
                }
            }
        ]
    }
    
    response = requests.post(url, headers=headers, json=payload)
    if response.status_code == 200:
        notion_url = response.json().get("url")
        # Update the application record with the generated Notion URL
        supabase.table("applications").update({"notion_roadmap_url": notion_url}).eq("student_id", student_id).execute()
    else:
        print(f"Failed to create Notion page: {response.text}")

# ==========================================
# 4. API Endpoints
# ==========================================

@app.get("/")
def read_root():
    return {"status": "CampusLink API is running"}

@app.get("/api/jobs")
def get_active_jobs():
    response = supabase.table("jobs").select("*").eq("is_active", True).execute()
    return response.data

@app.post("/api/match")
def generate_ai_match(req: MatchRequest, background_tasks: BackgroundTasks):
    # Fetch Student and Job Data
    student_res = supabase.table("student_profiles").select("*").eq("student_id", req.student_id).execute()
    job_res = supabase.table("jobs").select("*").eq("id", req.job_id).execute()
    
    if not student_res.data or not job_res.data:
        raise HTTPException(status_code=404, detail="Student or Job not found")
        
    student = student_res.data[0]
    job = job_res.data[0]

    # For the hackathon prototype, we mock the LLM output directly. 
    # In production, you pass `job` and `student` details to OpenAI/Gemini here.
    match_data = {
        "fit_score": 70, 
        "ai_explanation": "Below Threshold: CGPA meets criteria, but missing core machine learning frameworks and mock interview score is below recruiter benchmark."
    }
    
    status = "Shortlisted" if match_data["fit_score"] >= 85 else "Rejected"

    # Save to Supabase
    app_data = {
        "student_id": req.student_id,
        "job_id": req.job_id,
        "fit_score": match_data["fit_score"],
        "ai_explanation": match_data["ai_explanation"],
        "status": status
    }
    
    try:
        supabase.table("applications").insert(app_data).execute()
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

    # Trigger Notion Remediation if Rejected
    if status == "Rejected":
        background_tasks.add_task(generate_notion_roadmap, req.student_id, job['title'], match_data["ai_explanation"])

    return {"message": "Match generated successfully", "data": app_data}

@app.post("/api/drives/schedule")
def schedule_drive(drive: DriveSchedule):
    # Query existing drives to check for overlaps on the same date
    start_of_day = f"{drive.drive_date}T00:00:00"
    end_of_day = f"{drive.drive_date}T23:59:59"
    
    conflicts = supabase.table("jobs")\
        .select("id, title, drive_date")\
        .gte("drive_date", start_of_day)\
        .lte("drive_date", end_of_day)\
        .execute()
        
    if conflicts.data and len(conflicts.data) > 0:
        raise HTTPException(
            status_code=409, 
            detail=f"Scheduling Conflict: {conflicts.data[0]['title']} is already scheduled for this date."
        )
        
    # Insert if no conflict
    new_drive = {
        "recruiter_id": drive.recruiter_id,
        "title": drive.title,
        "required_skills": drive.required_skills,
        "min_cgpa": drive.min_cgpa,
        "drive_date": drive.drive_date
    }
    
    try:
        res = supabase.table("jobs").insert(new_drive).execute()
        return {"message": "Drive scheduled successfully, no conflicts detected.", "data": res.data}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))