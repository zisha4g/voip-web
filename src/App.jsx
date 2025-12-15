import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import ForgotPassword from './pages/Forgot-password'
import Layout from './components/Layout'
import Phone from './pages/Phone'
import Messages from './pages/Messages'
import Voicemail from './pages/Voicemail'
import CallHistory from './pages/CallHistory'
import Contacts from './pages/Contacts'
import IVR from './pages/IVR'
import Hours from './pages/Hours'
import RingGroups from './pages/RingGroups'
import Billing from './pages/Billing'
import Settings from './pages/Settings'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        {/* Protected routes with Layout */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/phone" element={<Phone />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/voicemail" element={<Voicemail />} />
          <Route path="/call-history" element={<CallHistory />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/ivr" element={<IVR />} />
          <Route path="/hours" element={<Hours />} />
          <Route path="/ring-groups" element={<RingGroups />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App