import { NavLink, useLocation } from 'react-router-dom'; 


// Navigation bar component
const Navbar = () => {
 
    // Creating an array of objects to store the page titles
    const pageTitles = {
    "/paintings": "Paintings",
    "/galleries": "Galleries",
    "/artists": "Artists",
    "/genres": "Genres",
    "/favorites": "Favorites",
    "/about": "About"
    };
  
    // Getting the current page title using the useLocation hook and the pageTitles object
    const currentPage = pageTitles[useLocation().pathname];

    // ---Each NavLink is a prodiveds a link to a different page in the app---
  
    return (
            <nav className='bg-blue-500 p-4 text-white flex items-center justify-between rounded '>
                <img src="src/assests/Music_logo.png" alt="Music Logo" className='h-30' />
                <div className='text-2xl'>Art Database Project {currentPage} View </div>
                <ul className='flex gap-2'>
                    <li ><NavLink to="/paintings" className='bg-white text-blue-500 px-4 py-2 rounded hover:bg-gray-200'>Paintings</NavLink></li>
                    <li><NavLink to="/galleries" className='bg-white text-blue-500 px-4 py-2 rounded hover:bg-gray-200'>Galleries</NavLink></li>
                    <li><NavLink to="/genres" className='bg-white text-blue-500 px-4 py-2 rounded hover:bg-gray-200'>Genres</NavLink></li>
                    <li><NavLink to="/favorite"className='bg-white text-blue-500 px-4 py-2 rounded hover:bg-gray-200'>Favorite</NavLink></li>
                    <li><NavLink to="/about"className='bg-white text-blue-500 px-4 py-2 rounded hover:bg-gray-200'>About</NavLink></li>
                </ul>
            </nav>
        );
}

export default Navbar;

