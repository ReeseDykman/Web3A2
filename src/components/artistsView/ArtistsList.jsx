import { useContext, useState } from "react";
import { ArtistsContext } from "../../App.jsx";
import ArtistListItem from "./ArtistListItem.jsx";

const ArtistsList = (props) => {
    // Access the artists data from the context
    const { artists } = useContext(ArtistsContext);

    // State to manage the filtered list of artists
    const [artistSearch, setArtistSearch] = useState(artists);

    // Function to handle the search input and filter artists
    const handleSearch = (e) => {
        const searchTerm = e.target.value;

        // If search term is empty, reset to the full list of artists
        if (searchTerm === "") {
            setArtistSearch(artists);
            return;
        }

        // Filter artists based on first or last name starting with the search term
        const filteredArtists = artists.filter(
            (artist) =>
                artist.firstName.toLowerCase().startsWith(searchTerm.toLowerCase()) ||
                artist.lastName.toLowerCase().startsWith(searchTerm.toLowerCase())
        );

        // Update the state with the filtered list
        setArtistSearch(filteredArtists);
    };

    return (
        <div className="bg-green-700 flex-1 bg-gray-100 shadow-md rounded p-4 h-167 overflow-hidden">
            {/* Input field for searching artists */}
            <input
                onChange={handleSearch}
                type="text"
                placeholder="Search for an artist..."
                className="w-full p-2 border border-gray-300 bg-green-100 rounded mb-4"
            />
            {/* List of artists displayed as list items */}
            <ul className="list-none space-y-2 overflow-y-auto h-full p-2">
                {artistSearch.map((artist, index) => (
                    <ArtistListItem
                        key={artist.artistId ? `${artist.artistId}Li` : `${index}Li`}
                        artist={artist}
                        index={index}
                        handleArtistClick={props.handleArtistClick}
                    />
                ))}
            </ul>
        </div>
    );
};

export default ArtistsList;