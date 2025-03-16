import { useState } from 'react'
import './App.css'
import Login from './components/Login.jsx'

function App() {

  const [loggedIn, setLoggedIn] = useState(false)

  const handleLogin = (loginState) => {
    setLoggedIn(loginState)
  }

  console.log(loggedIn)

  // if(loggedIn) {
  //   return (
  //     PLACEHOLDER
  //   )
  // }

  return (
    <main className="bg-gray-100 max-w-screen min-h-screen">
      <Login handleLogin={handleLogin} />
    </main>
  )
}

export default App
