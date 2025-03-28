import {useContext, useEffect, useState} from "react";


import { GalleriesContext } from "../App.jsx";
import { PaintingsContext } from "../App.jsx";
import GalleryList from "./GalleryList.jsx";




const GalleryView = (props) => {
   
    const { galleries } = useContext(GalleriesContext);
    
    const { paintings } = useContext(PaintingsContext);


    const handleClick = (props) => {
        
        const found = galleries.find((row) => (row.galleryId == props));
        
        const paintingsArray = paintings.filter((row) => (row.galleryId == props));
        
        
    }
    


    return(<GalleryList update={handleClick}/>)

}
export default GalleryView;
