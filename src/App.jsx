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
      <h1 className="text-4xl text-center font-bold p-8">Art Dashboard</h1>
      <Login handleLogin={handleLogin} />
      <p className="text-center text-gray-500 text-xs">Image Credit: PLACEHOLDER</p>
    </main>
  )
}

export default App
