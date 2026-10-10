export type PortalRole = 'student' | 'recruiter' | 'admin';

export interface UserProfile {
  name: string;
  email: string;
  role: PortalRole;
  roleTitle: string;
  avatarUrl?: string;
  initials: string;
  institutionOrCompany: string;
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
  iconName: string;
  badge?: string | number;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}
