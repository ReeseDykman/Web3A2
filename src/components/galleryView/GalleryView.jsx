import { useContext, useEffect, useState } from "react";
import { GalleriesContext } from "../../App.jsx";
import { PaintingsContext } from "../../App.jsx";
import GalleryList from "./GalleryList.jsx";
import GalleryInfo from "./GalleryInfo.jsx";

const GalleryView = (props) => {


  const { galleries } = useContext(GalleriesContext);
  const { paintings } = useContext(PaintingsContext);



  const [selectedGallery, setSelectedGallery] = useState([])
  const [galleryPaintings, setGalleryPaintings] = useState([])

  const handleClick = (props) => {
    console.log(props);

    const foundGallery = galleries.find((row) => (row.galleryId == props));
    const paintingsArray = paintings.filter((row) => (row.galleryId == props));

    setGalleryPaintings(paintingsArray);
    setSelectedGallery(foundGallery);
    

  }

  return (
    <div className="flex gap-6  p-6">
      <GalleryList update={handleClick} />
      <GalleryInfo gallery={selectedGallery} paintings={galleryPaintings} setGalleryPaintings={setGalleryPaintings} />
    </div>
  )
}
export default GalleryView;
