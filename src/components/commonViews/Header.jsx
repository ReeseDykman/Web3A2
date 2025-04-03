import { NavLink, useLocation } from 'react-router-dom';
import { useContext, useState } from 'react';
import { GalleriesFavoritesContext } from "../../App.jsx";
import { ArtistsFavoritesContext } from "../../App.jsx";
import { PaintingsFavoritesContext } from "../../App.jsx";

const Navbar = () => {
    const location = useLocation();

    // Using context to access the favorites 
    const { galleryFavorites } = useContext(GalleriesFavoritesContext);
    const { artistsFavorites } = useContext(ArtistsFavoritesContext);
    const { paintingsFavorites } = useContext(PaintingsFavoritesContext);

    // State to manage the alert message
    const [alertMessage, setAlertMessage] = useState("");

    // Function to handle the click event on the favorites link
    const handleFavoritesClick = (e) => {

        //  Checking if the favorites arrays are empty
        if (galleryFavorites.length === 0 && artistsFavorites.length === 0 && paintingsFavorites.length === 0) {
            // Prevent the click
            e.preventDefault();

            // Show set the alert message to alert the user that 
            setAlertMessage("All favorites are empty...please add to access screen!");

            // Set a timeout to clear the alert message after 3 seconds
            setTimeout(() => {
                setAlertMessage("");
            }, 3000);
        }
    };


    return (
        // div container to hold the navbar and alert message
        <div>
        {/* The overall container for the navbar */}
            <nav className="bg-sky-700 p-4 text-white flex items-center justify-between">
                {/* The logo and title */}
                <img src="src/assets/Music_logo.png" alt="Music Logo" className="h-30" />
                <div className="text-2xl">
                    Art Database Project
                </div>

                {/* Overall container for the tab buttons to be changed */}
                <ul className="flex gap-2">
                    {/* The different links to the different pages */}
                    <li>
                        <NavLink to="/paintings" className="text-white px-3 py-2 rounded hover:bg-gray-200 hover:text-black">
                            Paintings
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
                        {/* Favorites navLink whick uses the onClick event handler to deny the user access to the tab if all favorites are empty */}
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
            {/* Alert message for empty favorites */}
            {alertMessage && (
                <div className="fixed inset-0 flex items-center justify-center ">
                    <div className="bg-yellow-400 text-black px-6 py-3 rounded shadow-lg text-lg font-medium">
                        {alertMessage}
                    </div>
                </div>
            )}
        </div>

    );
};

export default Navbar;