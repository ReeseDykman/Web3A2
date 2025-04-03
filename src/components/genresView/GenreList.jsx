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
    props.data.length === 0 ? (
        <div className="p-6 text-gray-700">
            <h2 className="text-2xl font-bold">No gallery selected.</h2>
            <p>Please select a gallery to view its details.</p>
            <p className="italic text-gray-600 mt-1">No map available.</p>
        </div>
    ) : (
        <section className="p-6 space-y-6">
            <div className="border p-4 bg-sky-500 text-white rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-4">List of Genres</h2>
                <ul className="space-y-2">
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
    )  
    
);

};

export default GenreList;