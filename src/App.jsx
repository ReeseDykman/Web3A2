import { useEffect, useState, createContext, useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './components/Login.jsx';
import Navbar from './components/Header.jsx';
import GenreView from './components/GenreView.jsx';
import GalleryView from "./components/GalleryView.jsx";
import supabase from './components/supabaseClient.js';

export const ArtistsContext = createContext();
export const GenresContext = createContext();
export const PaintingsContext = createContext();
export const GalleriesContext = createContext();
export const PaintingGenresContext = createContext();
export const ErasContext = createContext();
export const FavoritesContext = createContext();
import PaintingsView from './components/paintingsView/PaintingsView.jsx';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const handleLogin = (loginState) => {
    setLoggedIn(loginState);
  };

  console.log(loggedIn);

  const [artists, setArtists] = useState([]);
  const [galleries, setGalleries] = useState([]);
  const [genres, setGenres] = useState([]);
  const [paintingGenres, setPaintingGenres] = useState([]);
  const [eras, setEras] = useState([]);
  const [paintings, setPaintings] = useState([]);
  const [favorites, setFavorites] = useState([]);

  async function getPaintingGenres() {
    if (localStorage.getItem('paintingGenres') == null) {
      const { data } = await supabase.from("PaintingGenres").select();
      localStorage.setItem("paintingGenres", JSON.stringify(data));
      setPaintingGenres(data);

    } else {
      const loadData = JSON.parse(localStorage.getItem("paintingGenres"));
      setPaintingGenres(loadData);
    }


  }

  async function getPaintings() {
    if (localStorage.getItem("paintings") == null) {
      const { data, error } = await supabase
                        .from("Paintings")
                        .select("paintingId,imageFileName,title,shapeId,museumLink,accessionNumber,copyrightText,description,excerpt,yearOfWork,width,height,medium,cost,MSRP,googleLink,googleDescription,wikiLink,jsonAnnotations, Artists!inner(firstName, lastName, nationality, yearOfBirth, yearOfDeath, details, artistLink), Galleries!inner(galleryName,galleryNativeName,galleryCity,galleryAddress,galleryCountry,latitude,longitude,galleryWebSite,flickrPlaceId,yahooWoeId,googlePlaceId)")
                        .order("title", { ascending: true })
      if (error) {
        console.error("Error fetching paintings:", error);
        return;
      }
      localStorage.setItem("paintings", JSON.stringify(data));
      setPaintings(data);
    } else {
      const loadData = JSON.parse(localStorage.getItem("paintings"));
      setPaintings(loadData);
    }

  }

  async function getGalleries() {
    if (localStorage.getItem("galleries") == null) {
      const { data } = await supabase.from("Galleries").select().order("galleryName", { ascending: true });
      localStorage.setItem("galleries", JSON.stringify(data));
      setGalleries(data);
    } else {
      const loadData = JSON.parse(localStorage.getItem("galleries"));
      setGalleries(loadData);
    }

  }

  async function getArtists() {
    if (localStorage.getItem("artists") == null) {
      const { data, error } = await supabase.from("Artists").select().order("lastName", { ascending: true });
      if (error) {
        console.error("Error fetching artists:", error);
      }
      localStorage.setItem("artists", JSON.stringify(data));
      setArtists(data);
    } else {

      setArtists(JSON.parse(localStorage.getItem("artists")));
    }



  }

  async function getGenre() {
    if (localStorage.getItem("genres") == null) {
      const { data } = await supabase.from("Genres").select();
      localStorage.setItem("genres", JSON.stringify(data));
      setGenres(data);
    } else {
      setGenres(JSON.parse(localStorage.getItem("genres")));
    }

  }

  async function getFavorites() {
    if (localStorage.getItem("favorites") == null) {
      const storedFavsData = {
        galleriesFav: [],
        artistsFav: [],
        paintingsFav: []
      };
      localStorage.setItem("favorites", JSON.stringify(storedFavsData));
      setFavorites(storedFavsData);

    } else {
      setFavorites(JSON.parse(localStorage.getItem("favorites")));
    }
  }


  useEffect(() => {
    getGenre();
    getPaintingGenres();
    getPaintings();
    getArtists();
    getGalleries();
    getFavorites();
  }, []);


  return (
    <ArtistsContext.Provider value={{ artists, setArtists }}>
      <PaintingGenresContext.Provider value={{ paintingGenres, setPaintingGenres }}>
        <GenresContext.Provider value={{ genres, setGenres }}>
          <PaintingsContext.Provider value={{ paintings, setPaintings }}>
            <GalleriesContext.Provider value={{ galleries, setGalleries }}>
              <FavoritesContext.Provider value={{ favorites, setFavorites }}>
                <ErasContext.Provider value={{ eras, setEras }}>







                  <main className="bg-gray-100 max-w-screen h-screen flex flex-col">

                    {loggedIn && <Navbar />}
                    <Routes>
                      <Route path="/" element={<Navigate to="/login" />} />
                      <Route path="/login"
                        element={loggedIn ? <Navigate to="/paintings" /> : <Login handleLogin={handleLogin} />} />
                      <Route path="/galleries" element={loggedIn ? <GalleryView /> : <Navigate to="/login" />} />
                      <Route path="/artists"
                        element={loggedIn ? (<h1 className="text-4xl text-center font-bold p-8">Artists</h1>) : (
                          <Navigate to="/login" />)} />
                      <Route path="/genres" element={loggedIn ? <GenreView /> : <Navigate to="/login" />} />
                      <Route path="/paintings"
                        element={loggedIn ? <PaintingsView /> : (
                          <Navigate to="/login" />)} />
                      <Route path="*" element={<Navigate to="/login" />} />
                    </Routes>
                    {loggedIn && (
                      <footer className="bg-gray-800 text-white text-center py-4 mt-auto">
                        <p>&copy; 2025 Reese Dykman & Christopher Nottingham.</p>
                      </footer>
                    )}
                  </main>
                </ErasContext.Provider>

              </FavoritesContext.Provider>
            </GalleriesContext.Provider>
          </PaintingsContext.Provider>
        </GenresContext.Provider>
      </PaintingGenresContext.Provider>
    </ArtistsContext.Provider>
  );
}

export default App;
