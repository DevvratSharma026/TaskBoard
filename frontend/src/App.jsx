import { Route, Routes } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import {Toaster} from 'react-hot-toast'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'

function App() {


  return (
    <div className='bg-[#4c456a] text-white'>
    <Toaster position='top-right'/>
      <Routes >
        <Route path='/' element={<LandingPage/>} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/dashboard' element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  )
}

export default App
