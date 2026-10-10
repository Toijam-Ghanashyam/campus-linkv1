import type { NavSection, PortalRole, UserProfile } from './types';

export const ROLE_PROFILES: Record<PortalRole, UserProfile> = {
  student: {
    name: 'Ananya Sharma',
    email: 'ananya.cse26@bput.ac.in',
    role: 'student',
    roleTitle: 'B.Tech CSE (Batch of 2026)',
    initials: 'AS',
    institutionOrCompany: 'BPUT Central Campus',
  },
  recruiter: {
    name: 'Rajesh Verma',
    email: 'r.verma@microsoft.com',
    role: 'recruiter',
    roleTitle: 'University Talent Acquisition Lead',
    initials: 'RV',
    institutionOrCompany: 'Microsoft India',
  },
  admin: {
    name: 'Dr. S. K. Patnaik',
    email: 'placement.director@bput.ac.in',
    role: 'admin',
    roleTitle: 'Director of Training & Placement',
    initials: 'SK',
    institutionOrCompany: 'BPUT University Administration',
  },
};

export const ROLE_NAV_CONFIG: Record<PortalRole, NavSection[]> = {
  student: [
    {
      title: 'Navigation',
      items: [
        { id: 'overview', label: 'Overview', href: '/student', iconName: 'LayoutDashboard' },
        { id: 'jobs', label: 'Job & Internship Drives', href: '/student/jobs', iconName: 'Briefcase', badge: '12 New' },
        { id: 'applications', label: 'My Applications', href: '/student/applications', iconName: 'FileText', badge: '4 Active' },
        { id: 'interviews', label: 'Interview Schedule', href: '/student/interviews', iconName: 'Calendar' },
      ],
    },
    {
      title: 'Career Tools',
      items: [
        { id: 'resume', label: 'AI Resume Studio', href: '/student/resume', iconName: 'Sparkles', badge: 'AI' },
        { id: 'assessments', label: 'Mock Tests & Skills', href: '/student/assessments', iconName: 'CheckSquare' },
        { id: 'credentials', label: 'Verified Credentials', href: '/student/credentials', iconName: 'ShieldCheck' },
      ],
    },
    {
      title: 'Support',
      items: [
        { id: 'guidelines', label: 'T&P Rules & Guidelines', href: '/student/guidelines', iconName: 'BookOpen' },
        { id: 'settings', label: 'Account Settings', href: '/student/settings', iconName: 'Settings' },
      ],
    },
  ],
  recruiter: [
    {
      title: 'Talent Acquisition',
      items: [
        { id: 'overview', label: 'Talent Overview', href: '/recruiter', iconName: 'LayoutDashboard' },
        { id: 'postings', label: 'Active Job Postings', href: '/recruiter/postings', iconName: 'Briefcase', badge: '3 Open' },
        { id: 'pipeline', label: 'Candidate Pipeline', href: '/recruiter/pipeline', iconName: 'Users', badge: '86 Total' },
        { id: 'shortlist', label: 'AI Match & Screening', href: '/recruiter/shortlist', iconName: 'Sparkles' },
      ],
    },
    {
      title: 'Interviews & Campus',
      items: [
        { id: 'schedules', label: 'Interview Slots', href: '/recruiter/schedules', iconName: 'Calendar', badge: '6 Today' },
        { id: 'drives', label: 'Campus Drive Calendar', href: '/recruiter/drives', iconName: 'Building' },
        { id: 'offers', label: 'Offers & Rollouts', href: '/recruiter/offers', iconName: 'Award' },
      ],
    },
    {
      title: 'Operations',
      items: [
        { id: 'analytics', label: 'Hiring Analytics', href: '/recruiter/analytics', iconName: 'BarChart3' },
        { id: 'settings', label: 'Company Profile & Team', href: '/recruiter/settings', iconName: 'Settings' },
      ],
    },
  ],
  admin: [
    {
      title: 'Administration',
      items: [
        { id: 'overview', label: 'Placement Command Center', href: '/admin', iconName: 'LayoutDashboard' },
        { id: 'students', label: 'Student Directory', href: '/admin/students', iconName: 'Users', badge: '1,420' },
        { id: 'recruiters', label: 'Recruiter Partners', href: '/admin/recruiters', iconName: 'Building', badge: '38 Active' },
        { id: 'drives', label: 'Placement Drives', href: '/admin/drives', iconName: 'Calendar', badge: '7 Ongoing' },
      ],
    },
    {
      title: 'Governance & Analytics',
      items: [
        { id: 'eligibility', label: 'Eligibility & Rules', href: '/admin/eligibility', iconName: 'ShieldCheck' },
        { id: 'reports', label: 'University Reports', href: '/admin/reports', iconName: 'BarChart3' },
        { id: 'logs', label: 'Audit Logs', href: '/admin/logs', iconName: 'Database' },
      ],
    },
    {
      title: 'System',
      items: [
        { id: 'settings', label: 'Portal Configuration', href: '/admin/settings', iconName: 'Settings' },
      ],
    },
  ],
};
