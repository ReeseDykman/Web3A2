import { useEffect, useState, useContext } from "react";
import supabase from "../scripts/supabaseClient.js";
import GenreList from "./GenreList.jsx";
import GenreScreen from "./GenreScreen.jsx";
import { GenresContext } from "../App.jsx";
import { PaintingGenresContext } from "../App.jsx";
import { PaintingsContext } from "../App.jsx";

function GenreView(props) {
  const { genres } = useContext(GenresContext);
  const { paintingGenres } = useContext(PaintingGenresContext);
  const { paintings } = useContext(PaintingsContext);
  // const [genres, setGenre] = useState([]);
  // const [paintingGenres, setPaintingGenres]= useState([]);
  // const [paintings, setPaintings] = useState([]);
  const [displayPaintings, setDisplayPaintings] = useState([]);
  const [displayGenre, setDisplayGenre] = useState([]);


 
  const clickedGenre = (props) => {
    const matchedGenre = paintingGenres.filter((row) => (row.genreId == props));

    const tempPaintings = [];

    const tempGenre = genres.find((row) => (row.genreId == props ));



    for (let i = 0; i < matchedGenre.length; i++) {
      const searchId = matchedGenre[i].paintingId;
      const foundPainting = paintings.find((row) => (row.paintingId == searchId));
      tempPaintings.push(foundPainting);

    }
   
    setDisplayPaintings(tempPaintings);
    setDisplayGenre(tempGenre)

  }



  return (
      // <div><GenreInfo/></div>,
      // <div><GenreScreen/></div>,
      <div><GenreList data={genres}  update={clickedGenre} /></div>

  );
}

export default GenreView;

