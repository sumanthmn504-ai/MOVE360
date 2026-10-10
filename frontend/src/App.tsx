import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import ActivityLibraryPage from './pages/ActivityLibraryPage'
import AIPage from './pages/AIPage'
import CreateSessionPage from './pages/CreateSessionPage'
import CurriculumPage from './pages/CurriculumPage'
import DashboardPage from './pages/DashboardPage'
import EquipmentPage from './pages/EquipmentPage'
import LiveSessionPage from './pages/LiveSessionPage'
import LoginPage from './pages/LoginPage'
import ReportsPage from './pages/ReportsPage'
import SessionDetailPage from './pages/SessionDetailPage'
import SessionsPage from './pages/SessionsPage'
import SettingsPage from './pages/SettingsPage'
import StudentsPage from './pages/StudentsPage'

function ProtectedRoutes() {
  const token = localStorage.getItem('move360_token')
  if (!token) {
    return <Navigate to="/login" replace />
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/sessions" element={<SessionsPage />} />
        <Route path="/sessions/create" element={<CreateSessionPage />} />
        <Route path="/sessions/:id" element={<SessionDetailPage />} />
        <Route path="/sessions/:id/live" element={<LiveSessionPage />} />
        <Route path="/activities" element={<ActivityLibraryPage />} />
        <Route path="/equipment" element={<EquipmentPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/curriculum" element={<CurriculumPage />} />
        <Route path="/students" element={<StudentsPage />} />
        <Route path="/ai-assistant" element={<AIPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>
    </Routes>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Navigate to={localStorage.getItem('move360_token') ? '/dashboard' : '/login'} replace />} />
      <Route path="*" element={<ProtectedRoutes />} />
    </Routes>
  )
}

export default App
