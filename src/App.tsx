import { Toaster } from 'sonner';
import { useRole } from '@services/state/useRole';
import { Routes, Route } from 'react-router-dom'

import LandingPage from '@pages/auth/LandingPage';
import LoginPage from '@pages/auth/LoginPage';
import SignUpPage from '@pages/auth/SignUpPage';

// Admin
import AdminDashboardPage from '@pages/admin/AdminDashboardPage';
import AdminCalendarPage from '@pages/admin/AdminCalendarPage';
import AdminTreatmentPage from '@pages/admin/AdminTreatmentPage';
import AdminStaffPage from '@pages/admin/AdminStaffPage';
import AdminKnowledgePage from '@pages/admin/AdminKnowledgePage';
// Utils
import PublicPages from '@pages/utils/PublicPages';
import PrivatePages from '@pages/utils/PrivatePages';
import ProtectedRoute from '@pages/utils/ProtectedPages';
import RestrictedPage from '@pages/utils/RestrictedPage';

// Auth
import RecoveryPage from '@pages/auth/RecoveryPage';
import ResetPasswordPage from '@pages/auth/ResetPasswordPage';
import VerifyPage from '@pages/auth/VerifyPage';
// Patient
import PatientCalendarPage from '@pages/patient/PatientCalendarPage';
import PatientProfilePage from '@pages/patient/PatientProfilePage';
// Dentist
import DentistCalendarPage from '@pages/dentist/DentistCalendarPage';
// Assistant
import AssistantCalendarPage from '@pages/assistant/AssistantCalendarPage';
// Staff
import StaffPatientPage from '@pages/staff/StaffPatientPage';
import StaffPaymentPage from '@pages/staff/StaffPaymentPage';
import StaffStocksPage from '@pages/staff/StaffStocksPage';
import StaffVendorPage from '@pages/staff/StaffVendorPage';
import SettingsPage from '@pages/shared/SettingsPage';
import StaffProfilePage from '@pages/staff/StaffPatientProfilePage';
import AdminActivityPage from '@pages/admin/AdminActivityPage';


const App = () => {

  const { data: role } = useRole()


  const getCalendar = (role: string) =>{
    switch (role) {
      case "admin":
        return <AdminCalendarPage />
      case "assistant":
        return <AssistantCalendarPage />
      case "patient":
        return <PatientCalendarPage />
      case "dentist":
        return <DentistCalendarPage />
      default:
        return <RestrictedPage />
    }
  }

  const getSettings = (role: string) =>{
    switch (role) {
      case "admin":
      case "assistant":
      case "dentist":
      case "patient":
        return <SettingsPage role={role} />
      default:
        return <RestrictedPage />
    }
  }

  const getPatient = (role: string) => {
    switch (role) {
      case "admin":
      case "assistant":
      case "dentist":
        return <StaffPatientPage role={role} />;
      default:
        return <RestrictedPage />;
    }
  };

  const getPayment = (role: string) => {
    switch (role) {
      case "assistant":
      case "admin":
        return <StaffPaymentPage role={role} />;
      default:
        return <RestrictedPage />;
    }
  }
    
  const getStocks = (role: string) => {
    switch (role) {
      case "assistant":
      case "admin":
        return <StaffStocksPage role={role} />;
      default:
        return <RestrictedPage />;
    }
  }

  const getVendor = (role: string) => {
    switch (role) {
      case "assistant":
      case "admin":        
        return <StaffVendorPage role={role} />;
      default:
        return <RestrictedPage />;
    }
  }

  const getProfile = (role: string) => {
    switch (role) {
      case "admin":
      case "assistant":
      case "dentist":
        return <StaffProfilePage role={role} />;
      default:
        return <RestrictedPage />;
    }
  }

  const CalendarPage = getCalendar(role)
  const SharedSettingsPage = getSettings(role)
  const PatientPage = getPatient(role)
  const PaymentPage = getPayment(role)
  const StocksPage = getStocks(role)
  const VendorPage = getVendor(role)
  const ProfilePage = getProfile(role)

  return (
    <main className="bg-white mx-auto antialiased h-screen w-screen overflow-x-hidden overflow-y-hidden font-sf-pro ">
      <Toaster />
      <Routes>
        
        {/* Public */}
        <Route element={<PublicPages /> }>        
          <Route index path="/" element={<LandingPage />}/>
          <Route path="*" element={<RestrictedPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/recovery" element={<RecoveryPage />} />
          <Route path="/reset" element={<ResetPasswordPage />} />
          <Route path="/verify" element={<VerifyPage />} />

        </Route>

        <Route element={<PrivatePages />}>
          {/* Shared */}
          <Route path="/calendar" element={CalendarPage} />
          <Route path="/settings" element={SharedSettingsPage} />
          {/* Staff */}
          <Route path="/patient" element={PatientPage} />
          <Route path="/payment" element={PaymentPage} />
          <Route path="/stocks" element={StocksPage} />
          <Route path="/vendors" element={VendorPage} />
          <Route path="/patient/:id" element={ProfilePage} />
          
          <Route element={<ProtectedRoute role="admin" />}>
            <Route path="/dashboard" element={<AdminDashboardPage />}/>
            <Route path="/staff" element={<AdminStaffPage />} />
            <Route path="/treatment" element={<AdminTreatmentPage />} />
            <Route path="/activities" element={<AdminActivityPage />} />
            <Route path="/knowledge" element={<AdminKnowledgePage />} />
          </Route>

          <Route element={<ProtectedRoute role="patient" />}>
            <Route path="/profile" element={<PatientProfilePage />} />
          </Route>
          
        </Route>


      </Routes>
    </main>
  )
}

export default App
