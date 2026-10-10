import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import StudentDashboard from './pages/StudentDashboard';
import RecruiterDashboard from './pages/RecruiterDashboard';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  // In Phase 2, this will be tied to Supabase Auth state
  const userRole = 'student'; 

  return (
    <Router>
      <Routes>
        <Route path="/student/*" element={<StudentDashboard />} />
        <Route path="/recruiter/*" element={<RecruiterDashboard />} />
        <Route path="/admin/*" element={<AdminDashboard />} />
        {/* Redirect root to appropriate portal based on role */}
        <Route path="/" element={<Navigate to={`/${userRole}`} />} />
      </Routes>
    </Router>
  );
}

export default App;
