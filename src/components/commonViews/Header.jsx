import { NavLink, useLocation } from 'react-router-dom';
import { useContext, useState } from 'react';
import { GalleriesFavoritesContext } from "../../App.jsx";
import { ArtistsFavoritesContext } from "../../App.jsx";
import { PaintingsFavoritesContext } from "../../App.jsx";

const Navbar = () => {
    const location = useLocation();

    const { galleryFavorites } = useContext(GalleriesFavoritesContext);
    const { artistsFavorites } = useContext(ArtistsFavoritesContext);
    const { paintingsFavorites } = useContext(PaintingsFavoritesContext);

    const [alertMessage, setAlertMessage] = useState("");

    const handleFavoritesClick = (e) => {
       

        if (galleryFavorites.length === 0 &&  artistsFavorites.length === 0 &&  paintingsFavorites.length === 0) {
            e.preventDefault();
            setAlertMessage("All favorites are empty...please add to access screen!");

            setTimeout(() => {
                setAlertMessage("");
            }, 3000);
        }
    };
  

    return (
        <>
            <nav className="bg-sky-700 p-4 text-white flex items-center justify-between">
                <img src="src/assests/Music_logo.png" alt="Music Logo" className="h-30" />
                <div className="text-2xl">
                    Art Database Project
                </div>
                <ul className="flex gap-2">
                    <li>
                        <NavLink to="/paintings"  className="text-white px-3 py-2 rounded hover:bg-gray-200 hover:text-black">
                            Paintings
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/galleries" className="text-white px-3 py-2 rounded hover:bg-gray-200 hover:text-black"  >
                            Galleries
                        </NavLink>
                    </li>
                    <li>
                        <NavLink  to="/genres" className="text-white px-3 py-2 rounded hover:bg-gray-200 hover:text-black" >
                            Genres
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/favorites" onClick={handleFavoritesClick} className="text-white px-3 py-2 rounded hover:bg-gray-200 hover:text-black" id="favBtn">
                                Favorites
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/about" className="text-white px-3 py-2 rounded hover:bg-gray-200 hover:text-black" >
                          About
                        </NavLink>
                    </li>
                </ul>
            </nav>
            {alertMessage && (
                <div className="fixed inset-0 flex items-center justify-center ">
                            <div className="bg-yellow-400 text-black px-6 py-3 rounded shadow-lg text-lg font-medium">
                                {alertMessage}
                            </div>
                        </div>
                    )}

        </>
    );
};

export default Navbar;