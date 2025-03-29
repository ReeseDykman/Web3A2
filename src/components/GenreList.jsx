import GenreListItem from "./GenreListItem.jsx";
import {useContext} from "react";
import { GenresContext } from "../App.jsx";


const GenreList = (props) => {
     const { genres } = useContext(GenresContext);
    // Print each item in the props array
    // Sort alphabetically by name
    // When the user clicks the name of a specific list, you will need to handle the click above

    //1. Getting the array


    //2. Sort the array


    genres.sort((a, b) => {
        if (a.genreName > b.genreName) {
            return 1;
        }
        if (b.genreName > a.genreName) {
            return -1;
        }
        return 0;
    });

    return (


        <li>{genres.map(g => <GenreListItem data={g} id={g.genreId} key={g.genreId} update={props.update}/>)}</li>


    )


}
export default GenreList;