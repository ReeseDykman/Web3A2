// Developer: Christopher Nottingham
// Description: This component is used to display the gallery view of the application.

import { useContext, useState } from "react";
import { GalleriesContext } from "../../App.jsx";
import { PaintingsContext } from "../../App.jsx";
import GalleryList from "./GalleryList.jsx";
import GalleryInfo from "./GalleryInfo.jsx";
import PaintingsTable from "../paintingsView/PaintingsTable.jsx";
import filter from "../../scripts/filterFactory.js";


const GalleryView = () => {

  // Using context to access the galleries and paintings
  const { galleries } = useContext(GalleriesContext);
  const { paintings } = useContext(PaintingsContext);


  // Creating a state variables to keep track of the selected gallery and the respective paintings to display
  const [selectedGallery, setSelectedGallery] = useState([])
  const [galleryPaintings, setGalleryPaintings] = useState(paintings)
  const [sort, setSort] = useState(new filter("Title", "asc"));


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

  // Handles sorting of paintings based on the selected field and order
  const handleSort = ({ field, value }, paintings) => {
    setSort(new filter(field, value));

    // Maps fields to their corresponding values in the painting object
    const fieldMapping = {
        title: (painting) => painting.title,
        artist: (painting) => `${painting.Artists.firstName} ${painting.Artists.lastName}`,
        gallery: (painting) => painting.Galleries.galleryName,
        year: (painting) => painting.yearOfWork,
    };

    // Use current artistPaintings if no paintings are provided
    if (!paintings) {
        paintings = [...galleryPaintings];
    }

    // Sort paintings based on the selected field and order
    const sortedPaintings = paintings.sort((a, b) => {
        let aValue, bValue;

        // Get the function for the field and pass the painting to it
        aValue = fieldMapping[field.toLowerCase()](a) || "";
        bValue = fieldMapping[field.toLowerCase()](b) || "";

        // Handle numeric comparison for years
        if (typeof aValue === "number" && typeof bValue === "number") {
            return value === "asc" ? bValue - aValue : aValue - bValue;
        }

        // Handle string comparison
        if (
            aValue.toLowerCase().trim().replace(/ /g, "") <
            bValue.toLowerCase().trim().replace(/ /g, "")
        ) {
            return value === "asc" ? -1 : 1;
        } else if (
            aValue.toLowerCase().trim().replace(/ /g, "") >
            bValue.toLowerCase().trim().replace(/ /g, "")
        ) {
            return value === "asc" ? 1 : -1;
        } else {
            return 0;
        }
    });

    setGalleryPaintings(sortedPaintings);
};

  return (
    // Overall container for the gallery view which is further split into two sections, 
    // one for the list of all galleries and one for the gallery info (and its paintings).
    <div className="w-full h-full mx-auto p-4 flex flex-col md:flex-row gap-4">
      <GalleryList update={handleClick} />
      <GalleryInfo gallery={selectedGallery} paintings={galleryPaintings} setGalleryPaintings={setGalleryPaintings} />
      <div className="flex-5 bg-green-700 shadow-md rounded p-4 h-167 overflow-hidden">
        <PaintingsTable
            paintings={galleryPaintings}
            handleSort={handleSort}
            sort={sort}
        />
      </div>
    </div>
  )
}

// Exporting the GalleryView component
export default GalleryView;
