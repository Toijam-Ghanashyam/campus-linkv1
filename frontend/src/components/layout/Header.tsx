import { useState, useRef, useEffect } from 'react';
import type { FC } from 'react';
import type { PortalRole, UserProfile } from './types';
import { ROLE_PROFILES } from './navConfig';
import {
  Menu,
  Search,
  Bell,
  ChevronDown,
  User,
  Settings,
  LogOut,
  HelpCircle,
  Plus,
  Sparkles,
  Briefcase
} from 'lucide-react';

interface HeaderProps {
  role: PortalRole;
  onOpenMobile: () => void;
  title?: string;
  onSearchChange?: (query: string) => void;
  onPrimaryAction?: () => void;
}

export const Header: FC<HeaderProps> = ({
  role,
  onOpenMobile,
  title,
  onSearchChange,
  onPrimaryAction,
}) => {
  const profile: UserProfile = ROLE_PROFILES[role];
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  // Close menus on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileMenuOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getRoleAction = () => {
    switch (role) {
      case 'student':
        return {
          label: 'AI Resume Score',
          icon: <Sparkles className="w-3.5 h-3.5 mr-1.5" />,
        };
      case 'recruiter':
        return {
          label: 'Post New Drive',
          icon: <Briefcase className="w-3.5 h-3.5 mr-1.5" />,
        };
      case 'admin':
        return {
          label: 'Schedule Drive',
          icon: <Plus className="w-3.5 h-3.5 mr-1.5" />,
        };
    }
  };

  const action = getRoleAction();

  return (
    <header className="sticky top-0 z-20 h-16 bg-white border-b border-slate-200 px-4 md:px-8 flex items-center justify-between">
      {/* Left Area: Mobile hamburger & Context breadcrumb / Title */}
      <div className="flex items-center gap-3">
        {/* Mobile menu button */}
        <button
          type="button"
          onClick={onOpenMobile}
          className="p-1.5 rounded text-slate-600 hover:text-slate-900 hover:bg-slate-100 md:hidden focus:outline-none"
          aria-label="Open mobile navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <span className="capitalize">{role} Portal</span>
            <span>/</span>
            <span className="text-slate-700 font-medium">{title || 'Dashboard'}</span>
          </div>
          <h1 className="text-sm md:text-base font-semibold text-slate-900 leading-tight">
            {title || (role === 'student' ? 'Student Workspace' : role === 'recruiter' ? 'Recruiter Console' : 'Administration')}
          </h1>
        </div>
      </div>

      {/* Middle/Center: Global Search */}
      <div className="hidden lg:flex items-center max-w-sm w-full mx-6">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder={
              role === 'student'
                ? 'Search jobs, companies, exams...'
                : role === 'recruiter'
                ? 'Search candidates, roll numbers, skills...'
                : 'Search students, companies, drives...'
            }
            onChange={(e) => onSearchChange?.(e.target.value)}
            className="w-full pl-9 pr-14 py-1.5 text-xs text-slate-900 bg-white border border-slate-200 rounded focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 placeholder:text-slate-400"
          />
          <kbd className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-[10px] text-slate-400 font-mono pointer-events-none">
            Ctrl+K
          </kbd>
        </div>
      </div>

      {/* Right Area: Primary action, notifications, and User Profile Info */}
      <div className="flex items-center gap-3">
        {/* Role Primary Action Button */}
        <button
          type="button"
          onClick={onPrimaryAction}
          className="hidden sm:inline-flex items-center px-3 py-1.5 text-xs font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
        >
          {action.icon}
          {action.label}
        </button>

        {/* Notifications Button */}
        <div className="relative" ref={notifRef}>
          <button
            type="button"
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative p-2 rounded text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-colors focus:outline-none"
            aria-label="View notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600" />
          </button>

          {/* Simple Minimalist Notifications Popover */}
          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded py-2 z-50 text-left">
              <div className="px-3 py-1.5 border-b border-slate-200 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-900">Notifications</span>
                <span className="text-[10px] text-blue-600 font-medium cursor-pointer hover:underline">
                  Mark all read
                </span>
              </div>
              <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto">
                <div className="p-3 hover:bg-slate-50 cursor-pointer">
                  <div className="text-xs font-medium text-slate-800">
                    {role === 'student'
                      ? 'Tata Consultancy Services drive announced'
                      : role === 'recruiter'
                      ? '14 new candidate profiles matched'
                      : 'Drive schedule approved for B.Tech batch'}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">15 minutes ago</div>
                </div>
                <div className="p-3 hover:bg-slate-50 cursor-pointer">
                  <div className="text-xs font-medium text-slate-800">
                    Eligibility criteria verified for Round 2
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">2 hours ago</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="h-6 w-px bg-slate-200" />

        {/* User Profile Info Section */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setProfileMenuOpen(!profileMenuOpen)}
            className="flex items-center gap-2.5 p-1 rounded hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-colors text-left focus:outline-none"
            aria-expanded={profileMenuOpen}
            aria-label="User profile menu"
          >
            {/* User Avatar Initials */}
            <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center font-semibold text-xs shrink-0">
              {profile.initials}
            </div>

            {/* Profile Info Details */}
            <div className="hidden md:flex flex-col text-left">
              <span className="text-xs font-semibold text-slate-900 leading-tight">
                {profile.name}
              </span>
              <span className="text-[11px] text-slate-500 leading-tight truncate max-w-[140px]">
                {profile.roleTitle}
              </span>
            </div>

            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden md:block" />
          </button>

          {/* User Profile Menu Dropdown */}
          {profileMenuOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded py-2 z-50 text-left">
              {/* Profile summary */}
              <div className="px-4 py-2 border-b border-slate-200">
                <div className="text-xs font-semibold text-slate-900">{profile.name}</div>
                <div className="text-[11px] text-slate-500 truncate">{profile.email}</div>
                <div className="mt-1.5 inline-block text-[10px] font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 capitalize">
                  {profile.role} Portal Access
                </div>
              </div>

              {/* Menu items */}
              <div className="py-1">
                <button
                  type="button"
                  className="w-full px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 text-left"
                >
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  View Profile & Documents
                </button>
                <button
                  type="button"
                  className="w-full px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 text-left"
                >
                  <Settings className="w-3.5 h-3.5 text-slate-400" />
                  Account Preferences
                </button>
                <button
                  type="button"
                  className="w-full px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 text-left"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                  T&P Helpdesk & FAQs
                </button>
              </div>

              <div className="border-t border-slate-200 pt-1 mt-1">
                <button
                  type="button"
                  className="w-full px-4 py-2 text-xs text-red-600 hover:bg-slate-50 flex items-center gap-2 text-left"
                >
                  <LogOut className="w-3.5 h-3.5 text-red-500" />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
