import { useState } from 'react';
import { DashboardLayout } from '../components/layout';
import {
  Users,
  Building,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Download,
  Plus,
  BarChart3,
  AlertTriangle
} from 'lucide-react';

export default function AdminDashboard() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'ongoing' | 'completed'>('all');

  const drives = [
    {
      id: 'd1',
      company: 'Microsoft India',
      package: '₹21.0 LPA',
      branches: 'CSE, IT, ECE',
      registered: 342,
      shortlisted: 48,
      date: 'Oct 18, 2026',
      status: 'Ongoing Drive',
      verified: true,
    },
    {
      id: 'd2',
      company: 'Tata Consultancy Services',
      package: '₹9.0 LPA',
      branches: 'All BPUT Branches',
      registered: 890,
      shortlisted: 210,
      date: 'Oct 22, 2026',
      status: 'Upcoming Drive',
      verified: true,
    },
    {
      id: 'd3',
      company: 'Larsen & Toubro Ltd.',
      package: '₹8.0 LPA',
      branches: 'Civil, Mech, EE',
      registered: 245,
      shortlisted: 35,
      date: 'Oct 25, 2026',
      status: 'Upcoming Drive',
      verified: true,
    },
    {
      id: 'd4',
      company: 'Cognizant Technology',
      package: '₹9.25 LPA',
      branches: 'CSE, IT, MCA',
      registered: 610,
      shortlisted: 140,
      date: 'Nov 02, 2026',
      status: 'Registration Open',
      verified: true,
    },
  ];

  const [isScheduling, setIsScheduling] = useState(false);
  const [scheduleStatus, setScheduleStatus] = useState<{
    type: 'success' | 'conflict' | 'error';
    message: string;
  } | null>(null);

  const handleAuthorizeDrive = async () => {
    try {
      setIsScheduling(true);
      setScheduleStatus(null);

      // Payload configured to test /api/drives/schedule and overlap detection logic
      const payload = {
        recruiter_id: 'rec_microsoft_01',
        title: 'Microsoft India Campus Drive',
        required_skills: ['Data Structures', 'Algorithms', 'React', 'Python'],
        min_cgpa: 8.0,
        drive_date: '2026-10-18', // Oct 18 date to test overlap conflict
      };

      const response = await fetch('http://localhost:8000/api/drives/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.status === 409) {
        const conflictMsg = result.detail || 'Scheduling Conflict: A drive is already scheduled for this date.';
        setScheduleStatus({ type: 'conflict', message: conflictMsg });
        alert(`⚠️ ${conflictMsg}`);
      } else if (response.ok) {
        const successMsg = result.message || 'Drive scheduled successfully, no conflicts detected.';
        setScheduleStatus({ type: 'success', message: successMsg });
        alert(`✅ ${successMsg}`);
      } else {
        const errorMsg = result.detail || 'Failed to authorize drive.';
        setScheduleStatus({ type: 'error', message: errorMsg });
        alert(`Error: ${errorMsg}`);
      }
    } catch (err) {
      console.error('Failed to trigger drive schedule:', err);
      alert('Failed to connect to backend at http://localhost:8000. Please ensure the backend server is running.');
    } finally {
      setIsScheduling(false);
    }
  };

  return (
    <DashboardLayout
      role="admin"
      title="University Administration"
      onPrimaryAction={handleAuthorizeDrive}
    >
      <div className="space-y-6">
        {/* Admin Header Box */}
        <div className="border border-slate-200 rounded p-5 bg-white flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
              Training & Placement Directorate — Central Portal
            </span>
            <h2 className="text-lg font-semibold text-slate-900 mt-0.5">
              Placement Season 2026 Administration Console
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              Overseeing 1,420 graduating students across affiliated colleges and 42 approved industrial hiring partners.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              disabled={isScheduling}
              onClick={handleAuthorizeDrive}
              className="px-3.5 py-2 text-xs font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors flex items-center gap-1.5 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{isScheduling ? 'Checking Overlaps...' : 'Authorize New Drive'}</span>
            </button>
            <button
              type="button"
              className="px-3.5 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded hover:bg-slate-50 transition-colors flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-slate-400" />
              <span>University Placement Report</span>
            </button>
          </div>
        </div>

        {/* Overlap Detection Feedback Banner */}
        {scheduleStatus && (
          <div
            className={`p-3.5 rounded border text-xs flex items-center justify-between ${
              scheduleStatus.type === 'conflict'
                ? 'bg-amber-50 border-amber-200 text-amber-900'
                : scheduleStatus.type === 'success'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : 'bg-red-50 border-red-200 text-red-900'
            }`}
          >
            <div className="flex items-center gap-2">
              {scheduleStatus.type === 'conflict' ? (
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              ) : (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              )}
              <span className="font-medium">{scheduleStatus.message}</span>
            </div>
            <button
              type="button"
              onClick={() => setScheduleStatus(null)}
              className="text-xs text-slate-500 hover:text-slate-800 ml-4 font-medium"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* 4 Minimalist Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 border border-slate-200 rounded bg-white">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                Eligible Students
              </span>
              <span className="p-1.5 rounded bg-slate-50 text-slate-600 border border-slate-200">
                <Users className="w-3.5 h-3.5" />
              </span>
            </div>
            <div className="text-2xl font-bold text-slate-900 mt-2">1,420</div>
            <div className="text-xs text-slate-500 mt-1">
              Verified by Dean Academics
            </div>
          </div>

          <div className="p-4 border border-slate-200 rounded bg-white">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                Active Recruiters
              </span>
              <span className="p-1.5 rounded bg-slate-50 text-slate-600 border border-slate-200">
                <Building className="w-3.5 h-3.5" />
              </span>
            </div>
            <div className="text-2xl font-bold text-slate-900 mt-2">42</div>
            <div className="text-xs text-slate-500 mt-1">
              7 drives scheduled this month
            </div>
          </div>

          <div className="p-4 border border-slate-200 rounded bg-white">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                Overall Placed %
              </span>
              <span className="p-1.5 rounded bg-blue-50 text-blue-600 border border-blue-200">
                <BarChart3 className="w-3.5 h-3.5" />
              </span>
            </div>
            <div className="text-2xl font-bold text-blue-600 mt-2">78.4%</div>
            <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
              <span className="text-emerald-600 font-medium">+6.2%</span> vs 2025 season
            </div>
          </div>

          <div className="p-4 border border-slate-200 rounded bg-white">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                Highest CTC
              </span>
              <span className="p-1.5 rounded bg-slate-50 text-slate-600 border border-slate-200">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              </span>
            </div>
            <div className="text-2xl font-bold text-slate-900 mt-2">₹34.0 LPA</div>
            <div className="text-xs text-slate-500 mt-1">
              Average CTC: ₹8.4 LPA
            </div>
          </div>
        </div>

        {/* Drives Table */}
        <div className="border border-slate-200 rounded bg-white overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">
                University Recruitment Drives
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Centralized drive monitoring, slot allocations, and student participation
              </p>
            </div>

            <div className="flex items-center border border-slate-200 rounded p-0.5 bg-slate-50 text-xs">
              <button
                type="button"
                onClick={() => setActiveFilter('all')}
                className={`px-3 py-1 rounded transition-colors ${
                  activeFilter === 'all'
                    ? 'bg-white text-blue-600 font-medium border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All Drives
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter('ongoing')}
                className={`px-3 py-1 rounded transition-colors ${
                  activeFilter === 'ongoing'
                    ? 'bg-white text-blue-600 font-medium border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Ongoing (1)
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/75 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  <th className="py-2.5 px-4">Company Name</th>
                  <th className="py-2.5 px-4">CTC Package</th>
                  <th className="py-2.5 px-4">Eligible Branches</th>
                  <th className="py-2.5 px-4">Applied</th>
                  <th className="py-2.5 px-4">Drive Date</th>
                  <th className="py-2.5 px-4">Audit Status</th>
                  <th className="py-2.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {drives.map((drive) => (
                  <tr key={drive.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-4 font-semibold text-slate-900">{drive.company}</td>
                    <td className="py-3 px-4 font-medium text-slate-800">{drive.package}</td>
                    <td className="py-3 px-4 text-slate-600">{drive.branches}</td>
                    <td className="py-3 px-4 text-slate-900 font-mono font-medium">{drive.registered}</td>
                    <td className="py-3 px-4 text-slate-600">{drive.date}</td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                        Verified
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          className="px-2.5 py-1 text-xs font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors"
                        >
                          Manage Drive
                        </button>
                        <button
                          type="button"
                          className="px-2.5 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded hover:bg-slate-50 transition-colors"
                        >
                          Audit Logs
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-3 border-t border-slate-200 bg-slate-50/50 flex items-center justify-between text-xs text-slate-500">
            <span>Showing 4 active university recruitment schedules</span>
            <button
              type="button"
              className="text-xs font-medium text-blue-600 hover:text-blue-700 inline-flex items-center gap-1"
            >
              View All Schedules & Archives
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
