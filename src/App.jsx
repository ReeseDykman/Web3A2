import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './components/Login.jsx';
import Navbar from './components/Header.jsx';


function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = (loginState) => {
    setLoggedIn(loginState);
  };

  console.log(loggedIn);

  return (
    <main className="bg-gray-100 max-w-screen min-h-screen">
 {loggedIn && <Navbar />}      
      <Routes>
        <Route path="/" element={<Navigate to="/login"/>}/>
        <Route path="/login" element={loggedIn ? <Navigate to="/paintings"/> : <Login handleLogin={handleLogin} />}/>
        <Route path="/galleries" element={loggedIn ? (<h1 className="text-4xl text-center font-bold p-8">Galleries</h1>) : (<Navigate to="/login" />)}/>
        <Route path="/artists" element={loggedIn ? (<h1 className="text-4xl text-center font-bold p-8">Artists</h1>) : (<Navigate to="/login" />)}/>
        <Route path="/genres" element={loggedIn ? (<h1 className="text-4xl text-center font-bold p-8">Genres</h1>) : (<Navigate to="/login" />)}/>
        <Route path="/paintings" element={loggedIn ? (<h1 className="text-4xl text-center font-bold p-8">Paintings</h1>) : (<Navigate to="/login" />)}/>
        <Route path="*" element={<Navigate to="/login" />}/>
      </Routes>
    </main>
  );
}

export default App;
