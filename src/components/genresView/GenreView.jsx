// Developer: Christopher Nottingham
// Description: This component is used to display the genre view of the application. 
// It displays the list of genres and the selected genre's information and paintings.


import { useState, useContext } from "react";
import GenreList from "./GenreList.jsx";
import { GenresContext } from "../../App.jsx";
import { PaintingGenresContext } from "../../App.jsx";
import { PaintingsContext } from "../../App.jsx";
import GenreInfo from "./GenreInfo.jsx";
import PaintingsTable from "../paintingsView/PaintingsTable.jsx";
import filter from "../../scripts/filterFactory.js";

// This component is used to display the genre view of the application.
const GenreView = () => {

  // Using context to access the genres, painting genres, and paintings
  const { genres } = useContext(GenresContext);
  const { paintingGenres } = useContext(PaintingGenresContext);
  const { paintings } = useContext(PaintingsContext);

  // Using state to keep track of the selected genre and the respective paintings paintings to display
  const [displayPaintings, setDisplayPaintings] = useState([]);
  const [displayGenre, setDisplayGenre] = useState(null);
  const [sort, setSort] = useState(new filter("Title", "asc"));


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
    handleSort(sort,tempPaintings);

    // Setting the display genre to the selected genre
    setDisplayGenre(tempGenre);
  };

  const handleSort = ({ field, value }, paintings) => {
    setSort(new filter(field, value));

    //Returns the proper field in the json
    const fieldMapping = {
        title: (painting) => painting.title,
        artist: (painting) => `${painting.Artists.firstName} ${painting.Artists.lastName}`,
        gallery: (painting) => painting.Galleries.galleryName,
        year: (painting) => painting.yearOfWork,
    };

    if (!paintings) {
        paintings = [...displayPaintings];
    }

    const sortedPaintings = paintings.sort((a, b) => {
        let aValue, bValue;

        //get the function for the field and pass the painting to it
        aValue = fieldMapping[field.toLowerCase()](a) || "";
        bValue = fieldMapping[field.toLowerCase()](b) || "";

        // Years are numbers, so we need to handle them differently but we can compare them directly
        //if ascending, subtract a from b, if descending, subtract b from a
        if (typeof aValue === "number" && typeof bValue === "number") {
            return value === "asc" ? bValue - aValue : aValue - bValue;
        }

        //if a is greater than b, return 1, if a is less than b, return -1, else return 0
        //the return value is inverted if descending
        if (aValue.toLowerCase().trim().replace(/ /g, "") < bValue.toLowerCase().trim().replace(/ /g, "")) {
            return value === "asc" ? -1 : 1;
        } else if (aValue.toLowerCase().replace(/ /g, "") > bValue.toLowerCase().trim().replace(/ /g, "")) {
            return value === "asc" ? 1 : -1;
        } else {
            return 0;
        }
    });

    setDisplayPaintings(sortedPaintings);
};

  return (
    // Overall container for the genre view
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar for the genre list */}
      <div className="w-1/3  text-black">
        <GenreList update={clickedGenre} data={genres} />
      </div>

      {/* Overall component for when the specific gallery information */}
      <div className="w-2/3 flex flex-col h-full">

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
            {/* Table displaying the selected artists paintings */}
            <div className="flex-5 bg-green-700 shadow-md rounded p-4 h-100 overflow-hidden">
                <PaintingsTable
                    paintings={displayPaintings}
                    handleSort={handleSort}
                    sort={sort}
                />
            </div>
          </div>
        )}
      </div>
    </div >
  );
};
// Exporting the GenreView component
export default GenreView;