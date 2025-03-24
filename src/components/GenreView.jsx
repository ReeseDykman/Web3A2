import { useEffect, useState } from "react";
import supabase from "./supabaseClient.js";
  
  function GenreView() {
    const [genres, setGenre] = useState([]);

    useEffect(() => {
      getGenre();
    }, []);

    async function getGenre() {
      const { data } = await supabase.from("Genres").select();
      // console.log(data);
     setGenre(data);
    }

    return (
      <ul>
       
        {/* {genres.map((genre) => (
          <li key={genre.genreId}>{genre.genreId}</li>
        ))} */}
      </ul>
    );
  }


  export default GenreView;
 