import os
import json
from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from supabase import create_client, Client
from pydantic import BaseModel
import requests
from dotenv import load_dotenv

# Load environment variables from .env file if present
load_dotenv()

app = FastAPI(
    title="CampusLink AI Backend",
    description="Placement and recruitment automation API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY")

# Initialize Supabase client
supabase: Client | None = None
if SUPABASE_URL and SUPABASE_KEY:
    try:
        supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
    except Exception as e:
        print(f"Warning: Failed to initialize Supabase client: {e}")
else:
    print("Notice: SUPABASE_URL and SUPABASE_KEY not detected. Set them in .env to enable Supabase.")

NOTION_TOKEN = os.environ.get("NOTION_TOKEN")
NOTION_DB_ID = os.environ.get("NOTION_DB_ID")


# Health & Root Check Endpoints
@app.get("/")
def root():
    return {
        "service": "CampusLink AI Backend",
        "status": "online",
        "supabase_configured": supabase is not None,
        "notion_configured": bool(NOTION_TOKEN and NOTION_DB_ID),
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }
