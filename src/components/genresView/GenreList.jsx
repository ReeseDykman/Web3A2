// Developer: Christopher Nottingham
// Description: This component is used to display the list of genres in the Genre View sidebar.
import GenreListItem from "./GenreListItem.jsx";
import { useContext } from "react";
import { GenresContext } from "../../App.jsx";

const GenreList = (props) => {
   
    const { genres } = useContext(GenresContext);

    // Sort genres alphabetically by name
    const sortedGenres = [...genres].sort((a, b) => {
        return a.genreName.localeCompare(b.genreName);
    });

   return (
// Container for the genres list section
        <section className="p-6  space-y-6">
            <div className=" p-4 bg-gray-400 text-black rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-4">List of Genres</h2>
                <ul className="space-y-2">
                    {/* Using the map function to loop through and print all the genres */}
                    {sortedGenres.map((g) => (
                        <GenreListItem
                            key={g.genreId}
                            data={g}
                            id={g.genreId}
                            update={props.update}
                        />
                    ))}
                </ul>
            </div>
        </section>
     
);

};

// Exporting the GenreList component
export default GenreList;