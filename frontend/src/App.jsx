import { useState } from 'react';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/login.jsx';
import Signup from './pages/signup.jsx';

function App() {
  const [currentView, setCurrentView] = useState('login');

  return (
    <>
      {currentView === 'login' ? (
        <Login onSwitch={() => setCurrentView('signup')} />
      ) : (
        <Signup onSwitch={() => setCurrentView('login')} />
      )}
    </>
  )
}

export default App
