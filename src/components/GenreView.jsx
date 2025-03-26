import { useEffect, useState } from "react";
import supabase from "./supabaseClient.js";
import GenreList from "./GenreList.jsx";
import GenreScreen from "./GenreScreen.jsx";


function GenreView(props) {
  const [genres, setGenre] = useState([]);
  const [paintingGenres, setPaintingGenres]= useState([]);
  const [paintings, setPaintings] = useState([]);
  const [displayPaintings, setDisplayPaintings] = useState([]);
  const [displayGenre, setDisplayGenre] = useState([]);


  async function getPaintingGenres() {
    const { data } = await supabase.from("PaintingGenres").select();
    setPaintingGenres(data);
  }

  useEffect(() => {
    getGenre();
    getPaintingGenres();
    getPaintings()
  }, []);

  async function getGenre() {
    const { data } = await supabase.from("Genres").select();
     setGenre(data);
  }
  async function getPaintings() {
    const { data } = await supabase.from("Paintings").select();
    setPaintings(data);
  }
  const clickedGenre = (props) => {
    const matchedGenre = paintingGenres.filter((row) => (row.genreId == props));

    const tempPaintings = [];

    const tempGenre = genres.find((row) => (row.genreId == props ));



    for (let i = 0; i < matchedGenre.length; i++) {
      const searchId = matchedGenre[i].paintingId;
      const foundPainting = paintings.find((row) => (row.paintingId == searchId));
      tempPaintings.push(foundPainting);

    }
    console.log(tempGenre)
    console.log(tempPaintings)
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

