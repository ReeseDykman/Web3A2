import GenreListItem from "./GenreListItem.jsx";
import { useContext, useState } from "react";
import { GenresContext } from "../../App.jsx";

const GenreList = (props) => {
    const { genres } = useContext(GenresContext);

    // State to manage the filtered list of genres
    const [filteredGenres, setFilteredGenres] = useState(genres);

    // Function to handle the search input and filter genres
    const handleSearch = (e) => {
        const searchTerm = e.target.value;

        // If search term is empty, reset to the full list of genres
        if (searchTerm === "") {
            setFilteredGenres(genres);
            return;
        }

        // Filter genres based on the genre name starting with the search term
        const filtered = genres.filter((genre) =>
            genre.genreName.toLowerCase().startsWith(searchTerm.toLowerCase())
        );

        // Update the state with the filtered list
        setFilteredGenres(filtered);
    };

    return (
        <div className="bg-green-700 flex-1 bg-gray-100 shadow-md rounded p-4 h-167 overflow-hidden">
            {/* Input field for searching genres */}
            <input
                onChange={handleSearch}
                type="text"
                placeholder="Search for a genre..."
                className="w-full p-2 border border-gray-300 bg-green-100 rounded mb-4"
            />
            {/* List of genres displayed as list items */}
            <ul className="list-none space-y-2 overflow-y-auto h-full p-2">
                {filteredGenres.map((genre) => (
                    <GenreListItem
                        key={genre.genreId}
                        data={genre}
                        update={props.update}
                    />
                ))}
            </ul>
        </div>
    );
};

export default GenreList;