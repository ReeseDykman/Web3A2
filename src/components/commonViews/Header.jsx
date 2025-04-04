// Developer: Christopher Nottingham
// Description: This component is used to display the header of the application. 

import { NavLink} from 'react-router-dom';
import { useContext, useState} from 'react';
import { GalleriesFavoritesContext } from "../../App.jsx";
import { ArtistsFavoritesContext } from "../../App.jsx";
import { PaintingsFavoritesContext } from "../../App.jsx";
import FavoritesModal from './FavoritesModal.jsx';

const Navbar = () => {
    

    // Using context to access the favorites 
    const { galleryFavorites } = useContext(GalleriesFavoritesContext);
    const { artistsFavorites } = useContext(ArtistsFavoritesContext);
    const { paintingsFavorites } = useContext(PaintingsFavoritesContext);

    const [modalOpen, setModalOpen] = useState(false);


    // Checks if there are favorites
    const favoritesPopulated = () => {
        //  Checking if the favorites arrays are empty
        if (galleryFavorites.length === 0 && artistsFavorites.length === 0 && paintingsFavorites.length === 0) {
            return false; 
        }
        return true; // If any of the favorites arrays are not empty, return true
    };

    const handleFavorites = (e) => {
        e.preventDefault();
        setModalOpen(true); // Open the modal when the button is clicked
    }

    return (
        // div container to hold the navbar and alert message
        <div>
        {/* The overall container for the navbar */}
            <nav className="bg-green-700 p-4 text-white flex flex-row items-center align-center justify-between">
                {/* The logo and title */}
                <img src="Music_logo.png" alt="Music Logo" className="h-30" />
                <div className="text-2xl">
                    Art Database Project
                </div>

                {/* Overall container for the tab buttons to be changed */}
                <ul className="flex gap-2 items-center justify-center">
                    {/* The different links to the different pages */}
                    <li>
                        <NavLink to="/paintings" className="text-white px-3 py-2 rounded hover:bg-gray-200 hover:text-black">
                            Paintings
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/artists" className="text-white px-3 py-2 rounded hover:bg-gray-200 hover:text-black">
                            Artists
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/galleries" className="text-white px-3 py-2 rounded hover:bg-gray-200 hover:text-black"  >
                            Galleries
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/genres" className="text-white px-3 py-2 rounded hover:bg-gray-200 hover:text-black" >
                            Genres
                        </NavLink>
                    </li>
                    <li>
                        <button
                            onClick={handleFavorites}
                            disabled={!favoritesPopulated()}
                            className={`px-3 py-2 rounded ${
                                favoritesPopulated()
                                    ? "text-white hover:bg-gray-200 hover:text-black"
                                    : "text-gray-400 cursor-not-allowed"
                            }`}
                        >
                            Favorites
                        </button>
                    </li>
                    <li>
                        <NavLink to="/about" className="text-white px-3 py-2 rounded hover:bg-gray-200 hover:text-black" >
                            About
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <FavoritesModal open={modalOpen} onClose={() => setModalOpen(false)} />
        </div>

    );
};

export default Navbar;