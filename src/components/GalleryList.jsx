import GalleryListItem from "./GalleryListItem.jsx";

import {useContext} from "react";
import { GalleriesContext } from "../App.jsx";



const GalleryList = (props) => {
    const { galleries } = useContext(GalleriesContext);
    //Sort the gallereies by name

    galleries.sort((a, b) => {
        if (a.galleryName > b.galleryName) {
            return 1;
        }
        if (b.galleryName > a.galleryName) {
            return -1;
        }
        return 0;
    });


         return (


            <li>{galleries.map(g => <GalleryListItem data={g} id={g.galleryId} key={g.galleryId} update={props.update}/>)}</li>


            )

// <ul>
//         <li>{props.data.map(g => <GalleryListItem data={g} id={g.genreId} key={g.genreId} update={props.update}/>)}</li>
// </ul>


}
export default GalleryList;