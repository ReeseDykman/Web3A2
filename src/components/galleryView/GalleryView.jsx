// Developer: Christopher Nottingham
// Description: This component is used to display the gallery view of the application.

import { useContext, useState } from "react";
import { GalleriesContext } from "../../App.jsx";
import { PaintingsContext } from "../../App.jsx";
import GalleryList from "./GalleryList.jsx";
import GalleryInfo from "./GalleryInfo.jsx";


const GalleryView = () => {

// Using context to access the galleries and paintings
  const { galleries } = useContext(GalleriesContext);
  const { paintings } = useContext(PaintingsContext);


// Creating a state variables to keep track of the selected gallery and the respective paintings to display
  const [selectedGallery, setSelectedGallery] = useState([])
  const [galleryPaintings, setGalleryPaintings] = useState([])


// Function to get the selected gallery and find the respective painings
  const handleClick = (props) => {


    // Find the galleries that matche the selected gallery id in props
    const foundGallery = galleries.find((row) => (row.galleryId == props));

    // Filtering the paintings to find the ones that match the selected gallery id in props
    const paintingsArray = paintings.filter((row) => (row.galleryId == props));

    // Saving the found information to the state variables
    setGalleryPaintings(paintingsArray);
    setSelectedGallery(foundGallery);
    

  }

  return (
    // Overall container for the gallery view which is further split into two sections, 
    // one for the list of all galleries and one for the gallery info (and its paintings).
    <div className="flex gap-6  p-6">
      <GalleryList update={handleClick} />
      <GalleryInfo gallery={selectedGallery} paintings={galleryPaintings} setGalleryPaintings={setGalleryPaintings} />
    </div>
  )
}

// Exporting the GalleryView component
export default GalleryView;
