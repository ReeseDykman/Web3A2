import { useEffect, useState, createContext, useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './components/Login.jsx';
import Navbar from './components/commonViews/Header.jsx';
import GenreView from './components/genresView/GenreView.jsx';
import GalleryView from './components/galleryView/GalleryView.jsx';

import FavoritesView from './components/commonViews/FavoritesView.jsx';

import AboutView from './components/commonViews/AboutView.jsx';
import supabase from './components/supabaseClient.js';

export const ArtistsContext = createContext();
export const GenresContext = createContext();
export const PaintingsContext = createContext();
export const GalleriesContext = createContext();
export const PaintingGenresContext = createContext();
export const ErasContext = createContext();

export const GalleriesFavoritesContext = createContext();
export const ArtistsFavoritesContext = createContext();
export const PaintingsFavoritesContext = createContext();
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



  const [artistsFavorites, setArtistsFavorites] = useState([]);
  const [galleryFavorites, setGalleryFavorites] = useState([]);
  const [paintingsFavorites, setPaintingsFavorites] = useState([]);

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
        .select("artistId, paintingId, galleryId,imageFileName,title,shapeId,museumLink,accessionNumber,copyrightText,description,excerpt,yearOfWork,width,height,medium,cost,MSRP,googleLink,googleDescription,wikiLink,jsonAnnotations, Artists!inner(firstName, lastName, nationality, yearOfBirth, yearOfDeath, details, artistLink), Galleries!inner(galleryName,galleryNativeName,galleryCity,galleryAddress,galleryCountry,latitude,longitude,galleryWebSite,flickrPlaceId,yahooWoeId,googlePlaceId)")
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
      const { data } = await supabase.from("Galleries").select();
      localStorage.setItem("galleries", JSON.stringify(data));
      setGalleries(data);
    } else {
      const loadData = JSON.parse(localStorage.getItem("galleries"));
      setGalleries(loadData);
    }

  }

  async function getArtists() {
    if (localStorage.getItem("artists") == null) {
      const { data } = await supabase.from("Artists").select();
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
    if (localStorage.getItem("galleryFavorites") == null) {
      localStorage.setItem("galleryFavorites", JSON.stringify([]));
      setGalleryFavorites([]);
    } else {
      setGalleryFavorites(JSON.parse(localStorage.getItem("galleryFavorites")));
    }


    if (localStorage.getItem("artistsFavorites") == null) {
      localStorage.setItem("artistsFavorites", JSON.stringify([]));
      setArtistsFavorites([]);
    } else {
      setArtistsFavorites(JSON.parse(localStorage.getItem("artistsFavorites")));
    }

    if (localStorage.getItem("paintingFavorites") == null) {

      localStorage.setItem("paintingFavorites", JSON.stringify([]));
      setPaintingsFavorites([]);

    } else {
      setPaintingsFavorites(JSON.parse(localStorage.getItem("paintingFavorites")));
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

  useEffect(() => {
    console.log("Favorites changed!");
    localStorage.setItem("galleryFavorites", JSON.stringify(galleryFavorites));
    localStorage.setItem("artistsFavorites", JSON.stringify(artistsFavorites));
    localStorage.setItem("paintingFavorites", JSON.stringify(paintingsFavorites));

    const favBttn = document.querySelector("#fav-bttn");
    if (!favBttn) return;
    const hasFavorites =
      galleryFavorites.length > 0 ||
      artistsFavorites.length > 0 ||
      paintingsFavorites.length > 0;
    hasFavorites ? favBttn.classList.remove("disabled") : favBttn.classList.add("disabled");

  }, [galleryFavorites, artistsFavorites, paintingsFavorites]);




  return (
    <ArtistsContext.Provider value={{ artists, setArtists }}>
      <PaintingGenresContext.Provider value={{ paintingGenres, setPaintingGenres }}>
        <GenresContext.Provider value={{ genres, setGenres }}>
          <PaintingsContext.Provider value={{ paintings, setPaintings }}>
            <GalleriesContext.Provider value={{ galleries, setGalleries }}>
              <PaintingsFavoritesContext.Provider value={{ paintingsFavorites, setPaintingsFavorites }}>
                <GalleriesFavoritesContext.Provider value={{ galleryFavorites, setGalleryFavorites }}>
                  <ArtistsFavoritesContext.Provider value={{ artistsFavorites, setArtistsFavorites }}>
                    <ErasContext.Provider value={{ eras, setEras }}>
                      <main className="max-w-screen min-h-screen">

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
                            element={loggedIn ? <PaintingsView /> : (<Navigate to="/login" />)} />
                          <Route path="/about" element={loggedIn ? <AboutView /> : (
                            <Navigate to="/login" />)} />
                          <Route path="/favorites" element={loggedIn ? <FavoritesView /> : (
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
                  </ArtistsFavoritesContext.Provider>
                </GalleriesFavoritesContext.Provider>
              </PaintingsFavoritesContext.Provider>
            </GalleriesContext.Provider>
          </PaintingsContext.Provider>
        </GenresContext.Provider>
      </PaintingGenresContext.Provider>
    </ArtistsContext.Provider>
  );
}

export default App;