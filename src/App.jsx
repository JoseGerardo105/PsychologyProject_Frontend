import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthLayout from './layout/AuthLayout'
import Login from './pages/Login'
import Register from './pages/Register'
import ResetPasswordForEnter from './pages/ResetPasswordForEnter'
import MailForPassword from './pages/MailForPassword'
import Home from './pages/Home'

function App() {
  return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AuthLayout/>}>
              <Route index element={<Login/>}/>
              <Route path='register' element={<Register/>}/>
              <Route path='restore-account' element={<MailForPassword/>}/>
              <Route path='reset-password' element={<ResetPasswordForEnter/>}/>
              <Route path='home' element={<Home/>}/>
            </Route>
          </Routes>
        </BrowserRouter>
    )
}

export default App
