import { useState } from 'react'
import './App.css'
import { Login } from './features/auth/pages/Login'
import { Register } from './features/auth/pages/Register'

function App() {
  const [activePage, setActivePage] = useState<'login' | 'register'>('register')

  return (
    <>
      {activePage === 'login' && <Login setActivePage={setActivePage} />}
      {activePage === 'register' && <Register setActivePage={setActivePage} />}
    </>
  )
}

export default App
