import './App.css';
import { useEffect, useState, createContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/commonViews/Login.jsx';
import Navbar from './components/commonViews/Header.jsx';
import GenreView from './components/genresView/GenreView.jsx';
import GalleryView from './components/galleryView/GalleryView.jsx';
import ArtistsView from './components/artistsView/artistsView.jsx';
import PaintingsView from './components/paintingsView/PaintingsView.jsx';
import supabase from './scripts/supabaseClient.js';
import AboutView from './components/commonViews/AboutView.jsx';
import FavoritesView from './components/commonViews/FavoritesView.jsx';

// Cteating contexts for all the data needed to be used in the app
export const ArtistsContext = createContext();
export const GenresContext = createContext();
export const PaintingsContext = createContext();
export const GalleriesContext = createContext();
export const PaintingGenresContext = createContext();
export const ErasContext = createContext();

// Creating contexts for the favorites
export const GalleriesFavoritesContext = createContext();
export const ArtistsFavoritesContext = createContext();
export const PaintingsFavoritesContext = createContext();


function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const handleLogin = (loginState) => {
    setLoggedIn(loginState);
  };


  // Creating state variables to hold the various data
  const [artists, setArtists] = useState([]);
  const [galleries, setGalleries] = useState([]);
  const [genres, setGenres] = useState([]);
  const [paintingGenres, setPaintingGenres] = useState([]);
  const [eras, setEras] = useState([]);
  const [paintings, setPaintings] = useState([]);


  // Creating state variables to hold the favorites
  const [artistsFavorites, setArtistsFavorites] = useState([]);
  const [galleryFavorites, setGalleryFavorites] = useState([]);
  const [paintingsFavorites, setPaintingsFavorites] = useState([]);

  // Function to get the painting genres from the database
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
// Function to get the paintings from the database
  async function getPaintings() {
    if (localStorage.getItem("paintings") == null) {
        const { data, error } = await supabase
            .from("Paintings")
            .select(
                "paintingId,imageFileName,title,shapeId,museumLink,accessionNumber,copyrightText,description,excerpt,yearOfWork,width,height,medium,cost,MSRP,googleLink,googleDescription,wikiLink,jsonAnnotations, Artists!inner(artistId, firstName, lastName, nationality, yearOfBirth, yearOfDeath, details, artistLink), Galleries!inner(galleryName,galleryNativeName,galleryCity,galleryAddress,galleryCountry,latitude,longitude,galleryWebSite,flickrPlaceId,yahooWoeId,googlePlaceId)"
            );

      if (error) {
        console.error("Error fetching paintings:", error);
        return;
      }

      // Supabase sort is not case insensitive, so we sort it here
      const sortedData = data.sort((a, b) => {
        const titleA = a.title.toLowerCase().trim().replace(/ /g, "");
        const titleB = b.title.toLowerCase().trim().replace(/ /g, "");
        return titleA < titleB ? -1 : titleA > titleB ? 1 : 0;
      });

      localStorage.setItem("paintings", JSON.stringify(sortedData));
      setPaintings(sortedData);
    } else {
      const loadData = JSON.parse(localStorage.getItem("paintings"));
      setPaintings(loadData);
    }
  }

  // Function to get the galleries from the database
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

  // Function to get the artists from the database
  async function getArtists() {
    if (localStorage.getItem("artists") == null) {
      const { data, error } = await supabase.from("Artists")
                      .select("artistId, firstName, lastName, gender, nationality, yearOfBirth, yearOfDeath, details, artistLink, Paintings!inner(paintingId,imageFileName,title,shapeId,museumLink,accessionNumber,copyrightText,description,excerpt,yearOfWork,width,height,medium,cost,MSRP,googleLink,googleDescription,wikiLink,jsonAnnotations)").order("lastName", { ascending: true });
      if (error) {
        console.error("Error fetching artists:", error);
      }
      localStorage.setItem("artists", JSON.stringify(data));
      setArtists(data);
    } else {
      setArtists(JSON.parse(localStorage.getItem("artists")));
    }



  }

  // Function to get the genres from the database
  async function getGenre() {
    if (localStorage.getItem("genres") == null) {
      const { data } = await supabase.from("Genres").select();
      localStorage.setItem("genres", JSON.stringify(data));
      setGenres(data);
    } else {
      setGenres(JSON.parse(localStorage.getItem("genres")));
    }

  }

  // Function to get the favorites from local storage
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
                      {console.log("Favorite Artists", artistsFavorites)}
                      <main className="max-w-screen min-h-screen flex flex-col bg-green-200">
                        {loggedIn && <Navbar />}
                        <Routes>
                          <Route path="/" element={<Navigate to="/login" />} />
                          <Route path="/login"
                            element={loggedIn ? <Navigate to="/paintings" /> : <Login handleLogin={handleLogin} />} />
                          <Route path="/galleries" element={loggedIn ? <GalleryView /> : <Navigate to="/login" />} />
                          <Route path="/artists"
                            element={loggedIn ? (<ArtistsView />) : (
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
                          <footer className="bg-green-700 text-white text-center py-4 mt-auto">
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
