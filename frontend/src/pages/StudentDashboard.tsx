import { useState } from 'react';
import { DashboardLayout } from '../components/layout';
import {
  Briefcase,
  Calendar,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Clock,
  Building,
  FileCheck,
  AlertCircle
} from 'lucide-react';

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState<'all' | 'it' | 'core'>('all');

  const drives = [
    {
      id: 'd1',
      company: 'Microsoft India',
      role: 'Associate Software Engineer',
      ctc: '₹16.5 - 21.0 LPA',
      deadline: 'Oct 18, 2026',
      eligibility: 'Eligible (CGPA >= 8.0)',
      category: 'it',
    },
    {
      id: 'd2',
      company: 'Tata Consultancy Services',
      role: 'Digital System Engineer',
      ctc: '₹7.5 - 9.0 LPA',
      deadline: 'Oct 22, 2026',
      eligibility: 'Eligible (CGPA >= 7.0)',
      category: 'it',
    },
    {
      id: 'd3',
      company: 'L&T Technology Services',
      role: 'Graduate Engineer Trainee',
      ctc: '₹6.5 - 8.0 LPA',
      deadline: 'Oct 25, 2026',
      eligibility: 'Eligible (CSE / ECE / EE)',
      category: 'core',
    },
    {
      id: 'd4',
      company: 'Cognizant Technology',
      role: 'GenC Next Developer',
      ctc: '₹6.75 - 9.25 LPA',
      deadline: 'Nov 02, 2026',
      eligibility: 'Eligible (All Streams)',
      category: 'it',
    },
  ];

  const filteredDrives =
    activeTab === 'all' ? drives : drives.filter((d) => d.category === activeTab);

  return (
    <DashboardLayout role="student" title="Overview">
      <div className="space-y-6">
        {/* Welcome & Status Banner */}
        <div className="border border-slate-200 rounded p-5 bg-white flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
              Campus Placement Drive 2026
            </span>
            <h2 className="text-lg font-semibold text-slate-900 mt-0.5">
              Welcome back, Ananya Sharma
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              Your profile is verified by BPUT Placement Cell. You are currently eligible for 18 upcoming recruitment drives.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              className="px-3.5 py-2 text-xs font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors"
            >
              Update Resume & Bio
            </button>
            <button
              type="button"
              className="px-3.5 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded hover:bg-slate-50 transition-colors"
            >
              Placement Guidelines
            </button>
          </div>
        </div>

        {/* 4 Minimalist Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 border border-slate-200 rounded bg-white">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                Eligible Drives
              </span>
              <span className="p-1.5 rounded bg-slate-50 text-slate-600 border border-slate-200">
                <Briefcase className="w-3.5 h-3.5" />
              </span>
            </div>
            <div className="text-2xl font-bold text-slate-900 mt-2">18</div>
            <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
              <span className="text-emerald-600 font-medium">+3 new</span> this week
            </div>
          </div>

          <div className="p-4 border border-slate-200 rounded bg-white">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                Active Applications
              </span>
              <span className="p-1.5 rounded bg-slate-50 text-slate-600 border border-slate-200">
                <FileCheck className="w-3.5 h-3.5" />
              </span>
            </div>
            <div className="text-2xl font-bold text-slate-900 mt-2">4</div>
            <div className="text-xs text-slate-500 mt-1">
              2 in technical assessment review
            </div>
          </div>

          <div className="p-4 border border-slate-200 rounded bg-white">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                Upcoming Interviews
              </span>
              <span className="p-1.5 rounded bg-slate-50 text-slate-600 border border-slate-200">
                <Calendar className="w-3.5 h-3.5" />
              </span>
            </div>
            <div className="text-2xl font-bold text-blue-600 mt-2">2</div>
            <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-400" />
              Next on Oct 14, 10:30 AM
            </div>
          </div>

          <div className="p-4 border border-slate-200 rounded bg-white">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                AI Resume Match
              </span>
              <span className="p-1.5 rounded bg-blue-50 text-blue-600 border border-blue-200">
                <Sparkles className="w-3.5 h-3.5" />
              </span>
            </div>
            <div className="text-2xl font-bold text-slate-900 mt-2">88%</div>
            <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              Strong ATS optimization
            </div>
          </div>
        </div>

        {/* Main 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Drives Table (2 Columns) */}
          <div className="lg:col-span-2 border border-slate-200 rounded bg-white overflow-hidden">
            <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">
                  Active Placement Drives
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Verified campus recruitment opportunities open for your branch
                </p>
              </div>

              {/* Minimalist Filter Tabs */}
              <div className="flex items-center border border-slate-200 rounded p-0.5 bg-slate-50 text-xs">
                <button
                  type="button"
                  onClick={() => setActiveTab('all')}
                  className={`px-3 py-1 rounded transition-colors ${
                    activeTab === 'all'
                      ? 'bg-white text-blue-600 font-medium border border-slate-200'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  All (4)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('it')}
                  className={`px-3 py-1 rounded transition-colors ${
                    activeTab === 'it'
                      ? 'bg-white text-blue-600 font-medium border border-slate-200'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  IT / Software
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('core')}
                  className={`px-3 py-1 rounded transition-colors ${
                    activeTab === 'core'
                      ? 'bg-white text-blue-600 font-medium border border-slate-200'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Core Engg
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/75 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                    <th className="py-2.5 px-4">Company & Role</th>
                    <th className="py-2.5 px-4">CTC Package</th>
                    <th className="py-2.5 px-4">Deadline</th>
                    <th className="py-2.5 px-4">Eligibility</th>
                    <th className="py-2.5 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {filteredDrives.map((drive) => (
                    <tr key={drive.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-900">{drive.company}</div>
                        <div className="text-slate-500 text-[11px]">{drive.role}</div>
                      </td>
                      <td className="py-3 px-4 font-medium text-slate-800">{drive.ctc}</td>
                      <td className="py-3 px-4 text-slate-600">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span>{drive.deadline}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200">
                          <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                          {drive.eligibility}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          type="button"
                          className="px-3 py-1 text-xs font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors"
                        >
                          Apply
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-3 border-t border-slate-200 bg-slate-50/50 text-center">
              <button
                type="button"
                className="text-xs font-medium text-blue-600 hover:text-blue-700 inline-flex items-center gap-1"
              >
                View all 18 eligible placement drives
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Right Column: Schedule & Resume ATS Checklist */}
          <div className="space-y-6">
            {/* Upcoming Interviews Box */}
            <div className="border border-slate-200 rounded bg-white p-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
                  Upcoming Round
                </h3>
                <span className="text-[11px] font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  Round 2: Technical
                </span>
              </div>
              <div className="pt-3 space-y-2">
                <div className="text-sm font-semibold text-slate-900">Microsoft India</div>
                <div className="text-xs text-slate-600 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  Tuesday, Oct 14 • 10:30 AM IST
                </div>
                <div className="text-xs text-slate-600 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-slate-400" />
                  Virtual Video Assessment (MS Teams)
                </div>
                <div className="pt-2">
                  <button
                    type="button"
                    className="w-full py-1.5 text-xs font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Launch Interview Room</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* AI Resume Check Box */}
            <div className="border border-slate-200 rounded bg-white p-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
                    AI Resume Studio
                  </h3>
                </div>
                <span className="text-[11px] text-slate-500">v2.1</span>
              </div>
              <div className="pt-3 space-y-2.5 text-xs text-slate-600">
                <p>
                  Your resume has strong coverage for <span className="text-slate-900 font-medium">React, Python, Data Structures</span>.
                </p>
                <div className="p-2.5 rounded border border-slate-200 bg-slate-50 space-y-1">
                  <div className="text-[11px] font-medium text-slate-700 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 text-amber-500" />
                    Recommendation:
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Add quantifiable metrics to your 3rd-year capstone project to raise ATS score to 94%.
                  </div>
                </div>
                <button
                  type="button"
                  className="w-full py-1.5 text-xs font-medium text-slate-800 bg-white border border-slate-200 rounded hover:bg-slate-50 transition-colors"
                >
                  Open AI Resume Editor
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
