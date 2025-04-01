import { useState, useContext } from "react";

import GenreList from "./GenreList.jsx";
import { GenresContext } from "../../App.jsx";
import { PaintingGenresContext } from "../../App.jsx";
import { PaintingsContext } from "../../App.jsx";
import GenreInfo from "./GenreInfo.jsx";
import GenrePaintings from "./GenrePaintings.jsx";

const GenreView = (props) => {
  const { genres } = useContext(GenresContext);
  const { paintingGenres } = useContext(PaintingGenresContext);
  const { paintings } = useContext(PaintingsContext);

  const [displayPaintings, setDisplayPaintings] = useState([]);
  const [displayGenre, setDisplayGenre] = useState(null);

  const clickedGenre = (genreId) => {
    const matchedGenre = paintingGenres.filter((row) => row.genreId === genreId);
    const tempPaintings = matchedGenre.map((match) =>
      paintings.find((p) => p.paintingId === match.paintingId)
    );
    const tempGenre = genres.find((g) => g.genreId === genreId);

    setDisplayPaintings(tempPaintings);
    setDisplayGenre(tempGenre);
  };

  return (
    <div className="flex h-screen overflow-hidden">

      <div className="w-1/3  text-white">
        <GenreList update={clickedGenre} data={genres} />
      </div>


      <div className="w-2/3 flex flex-col overflow-y-auto bg-gray-100">
        {displayPaintings.length === 0 ? (
          <div className="p-6">
            <h2 className="text-2xl font-bold">No genre selected.</h2>
            <p className="text-gray-700">Please select a genre to view its details.</p>
          </div>
        ) : (

          <div>
            <GenreInfo data={displayGenre} />
            <div className="flex-1 overflow-y-auto px-6 pb-6">
              <GenrePaintings data={displayPaintings} />
            </div>
          </div>
        )}
      </div>
    </div >
  );
};

export default GenreView;