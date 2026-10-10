import { useState } from 'react';
import type { FC, ReactNode } from 'react';
import type { PortalRole } from './types';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export interface DashboardLayoutProps {
  role: PortalRole;
  title?: string;
  onRoleChange?: (newRole: PortalRole) => void;
  onPrimaryAction?: () => void;
  children: ReactNode;
}

export const DashboardLayout: FC<DashboardLayoutProps> = ({
  role,
  title,
  onRoleChange,
  onPrimaryAction,
  children,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Fixed Left Sidebar */}
      <Sidebar
        role={role}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
        onRoleChange={onRoleChange}
      />

      {/* Main Content Area offset by fixed sidebar width (64 = 16rem) on desktop */}
      <div className="md:pl-64 flex flex-col min-h-screen">
        {/* Top Header with User Profile */}
        <Header
          role={role}
          title={title}
          onOpenMobile={() => setMobileOpen(true)}
          onPrimaryAction={onPrimaryAction}
        />

        {/* Page Main Content Body */}
        <main className="flex-1 bg-white p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>

        {/* Minimalist Footer */}
        <footer className="border-t border-slate-200 py-4 px-6 text-center sm:flex sm:justify-between sm:items-center text-xs text-slate-500 bg-white">
          <span>Biju Patnaik University of Technology — Campus Placement Automation System</span>
          <div className="mt-2 sm:mt-0 flex items-center justify-center gap-4">
            <span className="hover:text-slate-700 cursor-pointer">Support Desk</span>
            <span>•</span>
            <span className="hover:text-slate-700 cursor-pointer">Placement Policies</span>
            <span>•</span>
            <span className="hover:text-slate-700 cursor-pointer">Privacy & GDPR</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default DashboardLayout;
