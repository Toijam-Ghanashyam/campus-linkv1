import type { FC } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import type { PortalRole, NavSection } from './types';
import { ROLE_NAV_CONFIG } from './navConfig';
import { NavIcon } from './NavIcon';
import { X, ArrowRightLeft, ShieldCheck } from 'lucide-react';

interface SidebarProps {
  role: PortalRole;
  mobileOpen: boolean;
  onCloseMobile: () => void;
  onRoleChange?: (newRole: PortalRole) => void;
}

export const Sidebar: FC<SidebarProps> = ({
  role,
  mobileOpen,
  onCloseMobile,
  onRoleChange,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const navSections: NavSection[] = ROLE_NAV_CONFIG[role] || [];

  const roleTitleMap: Record<PortalRole, string> = {
    student: 'Student Portal',
    recruiter: 'Recruiter Portal',
    admin: 'Admin Portal',
  };

  const handleSwitchRole = (newRole: PortalRole) => {
    if (onRoleChange) {
      onRoleChange(newRole);
    }
    navigate(`/${newRole}`);
    onCloseMobile();
  };

  const isActive = (href: string) => {
    if (href === `/${role}`) {
      return location.pathname === `/${role}` || location.pathname === `/${role}/`;
    }
    return location.pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-slate-900/30 md:hidden"
          aria-hidden="true"
        />
      )}

      {/* Fixed Left Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col transition-transform duration-200 ease-in-out md:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand & Portal Label */}
        <div className="h-16 px-5 border-b border-slate-200 flex items-center justify-between">
          <Link
            to={`/${role}`}
            className="flex items-center gap-2.5 text-slate-900 focus:outline-none"
          >
            <div className="w-8 h-8 rounded bg-blue-600 text-white flex items-center justify-center font-bold text-sm tracking-tight shrink-0">
              CL
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-slate-900 text-sm leading-tight tracking-tight">
                CampusLink AI
              </span>
              <span className="text-[11px] font-medium text-slate-500 leading-tight">
                Placement System
              </span>
            </div>
          </Link>

          {/* Close button for mobile */}
          <button
            type="button"
            onClick={onCloseMobile}
            className="p-1.5 rounded text-slate-500 hover:text-slate-800 hover:bg-slate-100 md:hidden focus:outline-none"
            aria-label="Close navigation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Portal Active Badge */}
        <div className="px-5 py-3 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            <span className="text-xs font-semibold text-slate-700 tracking-wide uppercase">
              {roleTitleMap[role]}
            </span>
          </div>
          <span className="text-[11px] text-slate-500 font-medium">BPUT</span>
        </div>

        {/* Scrollable Navigation List */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {navSections.map((section) => (
            <div key={section.title}>
              <h2 className="px-3 mb-2 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
                {section.title}
              </h2>
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.id}
                      to={item.href}
                      onClick={onCloseMobile}
                      className={`group flex items-center justify-between px-3 py-2 text-sm rounded transition-colors ${
                        active
                          ? 'bg-blue-50 text-blue-600 font-medium'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-normal'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <span
                          className={`shrink-0 ${
                            active
                              ? 'text-blue-600'
                              : 'text-slate-400 group-hover:text-slate-600'
                          }`}
                        >
                          <NavIcon name={item.iconName} className="w-4 h-4" />
                        </span>
                        <span className="truncate">{item.label}</span>
                      </div>

                      {item.badge && (
                        <span
                          className={`ml-2 px-1.5 py-0.5 text-[10px] font-medium rounded ${
                            active
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-slate-100 text-slate-600 border border-slate-200'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Portal Switcher & System Status Footer */}
        <div className="p-3 border-t border-slate-200 bg-white space-y-3">
          {/* Quick Portal Switcher */}
          <div className="p-2.5 rounded border border-slate-200 bg-slate-50/60">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <ArrowRightLeft className="w-3 h-3 text-slate-400" />
                Switch Portal
              </span>
              <span className="text-[10px] text-slate-400 font-mono">v2.4</span>
            </div>
            <div className="grid grid-cols-3 gap-1">
              {(['student', 'recruiter', 'admin'] as PortalRole[]).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => handleSwitchRole(r)}
                  className={`py-1 text-[11px] font-medium rounded capitalize transition-colors ${
                    role === r
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-slate-600 border border-slate-200 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* System status */}
          <div className="px-2 flex items-center justify-between text-[11px] text-slate-500">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Network Active</span>
            </div>
            <span className="flex items-center gap-1 text-slate-400">
              <ShieldCheck className="w-3 h-3 text-slate-400" />
              Verified
            </span>
          </div>
        </div>
      </aside>
    </>
  );
};
