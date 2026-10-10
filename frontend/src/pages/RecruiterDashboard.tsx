import { useState } from 'react';
import { DashboardLayout } from '../components/layout';
import {
  Users,
  Calendar,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Download,
  Plus,
  Clock
} from 'lucide-react';

export default function RecruiterDashboard() {
  const [filterDept, setFilterDept] = useState<'all' | 'cse' | 'ece'>('all');

  const candidates = [
    {
      id: 'c1',
      name: 'Rohan Senapati',
      rollNo: '220101045',
      branch: 'Computer Science',
      cgpa: '9.12',
      aiScore: '94%',
      assessmentScore: '92/100',
      status: 'Shortlisted for R2',
    },
    {
      id: 'c2',
      name: 'Priyanka Mohapatra',
      rollNo: '220101089',
      branch: 'Computer Science',
      cgpa: '8.86',
      aiScore: '91%',
      assessmentScore: '88/100',
      status: 'Technical Review',
    },
    {
      id: 'c3',
      name: 'Subham Pradhan',
      rollNo: '220102014',
      branch: 'Electronics & Comm.',
      cgpa: '8.64',
      aiScore: '87%',
      assessmentScore: '85/100',
      status: 'Shortlisted for R1',
    },
    {
      id: 'c4',
      name: 'Sneha Tripathy',
      rollNo: '220101112',
      branch: 'Information Tech.',
      cgpa: '8.75',
      aiScore: '89%',
      assessmentScore: '90/100',
      status: 'Scheduled',
    },
  ];

  const filteredCandidates =
    filterDept === 'all'
      ? candidates
      : candidates.filter((c) =>
          filterDept === 'cse'
            ? c.branch.includes('Computer') || c.branch.includes('Information')
            : c.branch.includes('Electronics')
        );

  return (
    <DashboardLayout role="recruiter" title="Talent Console">
      <div className="space-y-6">
        {/* Recruiter Header Card */}
        <div className="border border-slate-200 rounded p-5 bg-white flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
              Campus Placement Season 2026
            </span>
            <h2 className="text-lg font-semibold text-slate-900 mt-0.5">
              Microsoft India — Campus Hiring Dashboard
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              Drive: Associate Software Engineer (Full-Time 2026 Batch). 342 BPUT candidates applied.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              className="px-3.5 py-2 text-xs font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create New Hiring Drive</span>
            </button>
            <button
              type="button"
              className="px-3.5 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded hover:bg-slate-50 transition-colors flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-slate-400" />
              <span>Export Candidates (CSV)</span>
            </button>
          </div>
        </div>

        {/* 4 Minimalist Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 border border-slate-200 rounded bg-white">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                Total Applicants
              </span>
              <span className="p-1.5 rounded bg-slate-50 text-slate-600 border border-slate-200">
                <Users className="w-3.5 h-3.5" />
              </span>
            </div>
            <div className="text-2xl font-bold text-slate-900 mt-2">342</div>
            <div className="text-xs text-slate-500 mt-1">
              Verified BPUT final year engineering
            </div>
          </div>

          <div className="p-4 border border-slate-200 rounded bg-white">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                AI Match Score &ge; 85%
              </span>
              <span className="p-1.5 rounded bg-blue-50 text-blue-600 border border-blue-200">
                <Sparkles className="w-3.5 h-3.5" />
              </span>
            </div>
            <div className="text-2xl font-bold text-blue-600 mt-2">48</div>
            <div className="text-xs text-slate-500 mt-1">
              High match with Job Description
            </div>
          </div>

          <div className="p-4 border border-slate-200 rounded bg-white">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                Interviews Scheduled
              </span>
              <span className="p-1.5 rounded bg-slate-50 text-slate-600 border border-slate-200">
                <Calendar className="w-3.5 h-3.5" />
              </span>
            </div>
            <div className="text-2xl font-bold text-slate-900 mt-2">16</div>
            <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-400" />
              6 interview slots today
            </div>
          </div>

          <div className="p-4 border border-slate-200 rounded bg-white">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                Offers Extended
              </span>
              <span className="p-1.5 rounded bg-slate-50 text-slate-600 border border-slate-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              </span>
            </div>
            <div className="text-2xl font-bold text-slate-900 mt-2">12</div>
            <div className="text-xs text-slate-500 mt-1">
              Target quota: 25 hires
            </div>
          </div>
        </div>

        {/* Candidate Pipeline Table */}
        <div className="border border-slate-200 rounded bg-white overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">
                AI Shortlisted Candidates
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Evaluated against job criteria, verified CGPA, and online coding assessment
              </p>
            </div>

            {/* Department filter tabs */}
            <div className="flex items-center border border-slate-200 rounded p-0.5 bg-slate-50 text-xs">
              <button
                type="button"
                onClick={() => setFilterDept('all')}
                className={`px-3 py-1 rounded transition-colors ${
                  filterDept === 'all'
                    ? 'bg-white text-blue-600 font-medium border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All Streams
              </button>
              <button
                type="button"
                onClick={() => setFilterDept('cse')}
                className={`px-3 py-1 rounded transition-colors ${
                  filterDept === 'cse'
                    ? 'bg-white text-blue-600 font-medium border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                CSE / IT
              </button>
              <button
                type="button"
                onClick={() => setFilterDept('ece')}
                className={`px-3 py-1 rounded transition-colors ${
                  filterDept === 'ece'
                    ? 'bg-white text-blue-600 font-medium border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                ECE
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/75 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  <th className="py-2.5 px-4">Candidate & Roll No.</th>
                  <th className="py-2.5 px-4">Branch</th>
                  <th className="py-2.5 px-4">CGPA</th>
                  <th className="py-2.5 px-4">AI Resume Match</th>
                  <th className="py-2.5 px-4">Test Score</th>
                  <th className="py-2.5 px-4">Pipeline Status</th>
                  <th className="py-2.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredCandidates.map((candidate) => (
                  <tr key={candidate.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-900">{candidate.name}</div>
                      <div className="text-slate-500 text-[11px] font-mono">{candidate.rollNo}</div>
                    </td>
                    <td className="py-3 px-4 text-slate-700">{candidate.branch}</td>
                    <td className="py-3 px-4 font-medium text-slate-900">{candidate.cgpa}</td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-blue-50 text-blue-700 border border-blue-200">
                        <Sparkles className="w-2.5 h-2.5 text-blue-600" />
                        {candidate.aiScore}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-800">{candidate.assessmentScore}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200">
                        {candidate.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          className="px-2.5 py-1 text-xs font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors"
                        >
                          Schedule Slot
                        </button>
                        <button
                          type="button"
                          className="px-2.5 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded hover:bg-slate-50 transition-colors"
                        >
                          View Bio
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-3 border-t border-slate-200 bg-slate-50/50 flex items-center justify-between text-xs text-slate-500">
            <span>Showing 4 of 48 shortlisted candidates</span>
            <button
              type="button"
              className="text-xs font-medium text-blue-600 hover:text-blue-700 inline-flex items-center gap-1"
            >
              Open Full Candidate Pipeline
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
