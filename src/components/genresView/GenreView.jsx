// Developer: Christopher Nottingham
// Description: This component is used to display the genre view of the application. 
// It displays the list of genres and the selected genre's information and paintings.


import { useState, useContext } from "react";
import GenreList from "./GenreList.jsx";
import { GenresContext } from "../../App.jsx";
import { PaintingGenresContext } from "../../App.jsx";
import { PaintingsContext } from "../../App.jsx";
import GenreInfo from "./GenreInfo.jsx";
import GenrePaintings from "./GenrePaintings.jsx";

// This component is used to display the genre view of the application.
const GenreView = () => {

  // Using context to access the genres, painting genres, and paintings
  const { genres } = useContext(GenresContext);
  const { paintingGenres } = useContext(PaintingGenresContext);
  const { paintings } = useContext(PaintingsContext);

  // Using state to keep track of the selected genre and the respective paintings paintings to display
  const [displayPaintings, setDisplayPaintings] = useState([]);
  const [displayGenre, setDisplayGenre] = useState(null);


  const clickedGenre = (props) => {
    // Filtering the painting genres to find the ones that match the selected genre
    const matchedGenre = paintingGenres.filter((row) => row.genreId === props);

    // Using the map function to find the paintings that match the desired genre
    const tempPaintings = matchedGenre.map((match) =>
      paintings.find((p) => p.paintingId === match.paintingId)
    );

    // Finding the genre that matches the selected genre
    const tempGenre = genres.find((g) => g.genreId === props);

    // Setting the display paintings to the filtered paintings
    setDisplayPaintings(tempPaintings);

    // Setting the display genre to the selected genre
    setDisplayGenre(tempGenre);
  };

  return (
    // Overall container for the genre view
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar for the genre list */}
      <div className="w-1/3  text-black">
        <GenreList update={clickedGenre} data={genres} />
      </div>

      {/* Overall component for when the specific gallery information */}
      <div className="w-2/3 flex flex-col overflow-y-auto ">

        {/* Using a ternerary operator to change the layout of whether or not the user has clicked on a genre from the Genre List.
         If the user has not clicked on a genre..displayPaintings will be null due to the clickedGenre function.  */}
        {displayPaintings.length === 0 ? (
          <div className="p-6 bg-gray-400 rounded-lg m-6">
            <h2 className="text-2xl font-bold">No genre selected.</h2>
            <p className="text-gray-700">Please select a genre to view its details.</p>
          </div>
        ) : (
          // If the user has clicked on a genre, display the clicked genre information and relavent paintings.
          <div>
            <GenreInfo data={displayGenre} />
            <div className="flex-1 space-y-2 overflow-y-auto px-6 pb-6">
              <GenrePaintings data={displayPaintings} />
            </div>
          </div>
        )}
      </div>
    </div >
  );
};
// Exporting the GenreView component
export default GenreView;