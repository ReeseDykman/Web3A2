import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './components/Login.jsx';
import Navbar from './components/Header.jsx';
import GenreView from './components/GenreView.jsx';



function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = (loginState) => {
    setLoggedIn(loginState);
  };

  console.log(loggedIn);

    const [genres, setGenre] = useState([]);
    const [paintingGenres, setPaintingGenres] = useState([]);
    const [gallieres, setGallieres] = useState([]);
    const [artists, setArtists] = useState([]);
    const [eras, setEras] = useState([]);
    const [paintings, setPaintings] = useState([]);
    




    async function getPaintingGenres() {
        if (localStorage.getItem('paintingGenres') == null) {
            const {data} = await supabase.from("PaintingGenres").select();
            localStorage.setItem("paintingGenres", JSON.stringify(data));
            setPaintingGenres(data);

        } else {
            const loadData = JSON.parse(localStorage.getItem("paintingGenres"));
            setPaintingGenres(loadData);
        }


    }

    async function getPaintings() {
        if (localStorage.getItem("paintings") == null) {
            const {data} = await supabase.from("Paintings").select();
            localStorage.setItem("paintings", JSON.stringify(data));
            setPaintings(data);
        } else {
            const loadData = JSON.parse(localStorage.getItem("paintings"));
            setPaintings(loadData);
        }

    }

    async function getGalleries() {
        if (localStorage.getItem("galleries") == null) {
            const {data} = await supabase.from("Galleries").select();
            localStorage.setItem("galleries", JSON.stringify(data));
            setGallieres(data);
        } else {
            const loadData = JSON.parse(localStorage.getItem("galleries"));
            setGallieres(loadData);
        }

    }

    async function getArtists() {
        if (localStorage.getItem("artists") == null) {
            const {data} = await supabase.from("Artists").select();
            localStorage.setItem("artists", JSON.stringify(data));
            setArtists(data);
        } else {

            setArtists(JSON.parse(localStorage.getItem("artists")));
        }

    }

    async function getGenre() {
        if (localStorage.getItem("genres") == null) {
            const {data} = await supabase.from("Genres").select();
            localStorage.setItem("genres", JSON.stringify(data));
            setGenre(data);
        } else {
            setGenre(JSON.parse(localStorage.getItem("genres")));
        }

    }


    useEffect(() => {
        getGenre();
        getPaintingGenres();
        getPaintings();
        getArtists();
        getGalleries();
    }, []);


  return (
    <main className="bg-gray-100 max-w-screen min-h-screen">
     
    {loggedIn && <Navbar />}      
      <Routes>
        <Route path="/" element={<Navigate to="/login"/>}/>
        <Route path="/login" element={loggedIn ? <Navigate to="/paintings"/> : <Login handleLogin={handleLogin} />}/>
        <Route path="/galleries" element={loggedIn ? (<h1 className="text-4xl text-center font-bold p-8">Galleries</h1>) : (<Navigate to="/login" />)}/>
        <Route path="/artists" element={loggedIn ? (<h1 className="text-4xl text-center font-bold p-8">Artists</h1>) : (<Navigate to="/login" />)}/>
        <Route path="/genres" element={loggedIn ? <GenreView /> : <Navigate to="/login" />} />        
        <Route path="/paintings" element={loggedIn ? (<h1 className="text-4xl text-center font-bold p-8">Paintings</h1>) : (<Navigate to="/login" />)}/>
        <Route path="*" element={<Navigate to="/login" />}/>
      </Routes>
    </main>
  );
}

export default App;
