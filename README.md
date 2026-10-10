# CampusLink AI (campus-linkv1)

CampusLink AI is a modern campus placement and recruitment automation platform designed for university training & placement directorates, students, and corporate recruiters.

## Project Structure

```
campuslink-ai/
├── frontend/          # React + Vite + Tailwind CSS dashboard web client
│   ├── src/
│   │   ├── components/layout/   # Minimalist dashboard layout & navigation system
│   │   ├── pages/               # Student, Recruiter, and Admin portals
│   │   └── ...
│   └── ...
├── backend/           # Python backend services & APIs
└── .gitignore         # Workspace gitignore
```

## Features

- **Multi-Role Portals**: Dedicated workspaces for Students, Recruiters, and University Administrators.
- **Minimalist Design System**: Clean white canvas, slate-gray typography hierarchy, and professional blue accents with zero unnecessary gradients or heavy shadows.
- **Fixed Left Navigation**: Responsive sidebar with role switching, section categorization, and real-time status.
- **Header & Profile System**: Breadcrumb trail, global search with keyboard shortcuts, notifications, and user profile management.
- **Placement Pipeline Tracking**: Real-time tracking of placement drives, applications, interview slots, and ATS resume match scores.

## Getting Started

### Frontend Development

```bash
cd frontend
npm install
npm run dev
```

The application runs locally at `http://localhost:5173/`.

### Building for Production

```bash
cd frontend
npm run build
```
