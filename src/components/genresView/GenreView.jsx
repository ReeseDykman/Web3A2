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

const GenreView = () => {
  // Using context to access the genres, painting genres, and paintings
  const { genres } = useContext(GenresContext);
  const { paintingGenres } = useContext(PaintingGenresContext);
  const { paintings } = useContext(PaintingsContext);

  // Using state to keep track of the selected genre and the respective paintings to display
  const [displayPaintings, setDisplayPaintings] = useState(paintings);
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
    handleSort(sort, tempPaintings);

    // Setting the display genre to the selected genre
    setDisplayGenre(tempGenre);
  };

  const handleSort = ({ field, value }, paintings) => {
    setSort(new filter(field, value));

    // Returns the proper field in the JSON
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

      // Get the function for the field and pass the painting to it
      aValue = fieldMapping[field.toLowerCase()](a) || "";
      bValue = fieldMapping[field.toLowerCase()](b) || "";

      // Years are numbers, so we need to handle them differently but we can compare them directly
      if (typeof aValue === "number" && typeof bValue === "number") {
        return value === "asc" ? bValue - aValue : aValue - bValue;
      }

      // Compare strings
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
    <section className="w-full h-full mx-auto p-4 flex flex-col md:flex-row gap-4 justify-between">
      {/* Sidebar for the genre list */}
      <GenreList update={clickedGenre} />

      {/* Genre information */}
      <GenreInfo data={displayGenre} />

      {/* Table displaying the selected genre's paintings */}
      <div className="flex-5 bg-green-700 shadow-md rounded p-4 h-167 overflow-hidden">
        <PaintingsTable
          paintings={displayPaintings}
          handleSort={handleSort}
          sort={sort}
        />
      </div>
    </section>
  );
};

// Exporting the GenreView component
export default GenreView;