// Developer:  Christopher Nottingham
// Description: This component is used to display the gallery information and their respective paintings in the Gallery View.

import GalleryPaintings from "./GalleryPaintings";
import "leaflet/dist/leaflet.css";
import { GalleriesFavoritesContext } from "../../App.jsx";
import { useContext } from "react";
import { MapContainer, TileLayer, Marker } from 'react-leaflet'


const GalleryInfo = (props) => {


  //  Ussing context to access the gallery favorites
  const { galleryFavorites, setGalleryFavorites } = useContext(GalleriesFavoritesContext);

  // Event handler function to handle adding the gallery to the favorites
  const addGalleryToFavorites = (gallery) => {
    // Some is like find but instead returns true or false instead of the object
    const isFound = galleryFavorites.some((g) => g.galleryId == gallery.galleryId);

    // If isFound is true, then skip adding the gallery to the favorites to avoid duplicates
    if (isFound) {
      return galleryFavorites;
    }
    // If isFound is false, then add the gallery to the favorites
    else {

      const updatedGalFav = [...galleryFavorites, gallery];

      // Update the local storage and state with new gallery favorites
      localStorage.setItem("galleryFavorites", JSON.stringify(updatedGalFav));
      setGalleryFavorites(updatedGalFav);

      // Return the updated gallery favorites
      return updatedGalFav;
    }

  };

  return (
    // The overall container for the gallery info
    <div className="flex  gap-6 mt-6 w-2/3">
      {/* Creating the gallery info container.
      The gallery info container is split into two sections, one for the 
      gallery info and one for the gallery paintings.
      Adding visual to differntiate the the two components.   */}
      <div className="w-1/2 space-y-4">
        <div className="bg-gray-400 p-4 rounded-lg shadow flex flex-col items-center justify-center text-center">
          {/* Ternary operator to hide the gallery paitings and info if no gallery is clicked.
          If there is a gallery selected then display the gallery info and map.
          */}
          {props.gallery.galleryName ? (
            <div>
              {/* Displaying the gallery name in large bold font */}
              <h2 className="text-2xl font-bold">
                {props.gallery.galleryName}
              </h2>
              {/* Displaying the gallery city and country */}
              <p>
                {props.gallery.galleryCity}, {props.gallery.galleryCountry}
              </p>
              {/* Gallery Webstite hyperlink */}
              <a href={props.gallery.galleryWebSite} target="_blank" className="text-blue-900 hover:text-white underline block mt-1" >
                Gallery Website
              </a>
              {/*  Displaying where  gallery is on the map using leaflet 
              allowed the user to zoom in and out incase they are needing to locate it better on their travels.

              Massive help provided by:
                the leaflet documentation: https://react-leaflet.js.org/docs/start-setup/#
                Alejandro AO - Software & Ai:  https://www.youtube.com/watch?v=jD6813wGdBA
              */}

              <MapContainer
                key={`${props.gallery.latitude}-${props.gallery.longitude}`}

                center={[props.gallery.latitude, props.gallery.longitude]}
                zoom={14}

                // z index 0 to make sure the map is behind any alert messages
                className="h-80 w-80 z-0 rounded-lg ">

                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[props.gallery.latitude, props.gallery.longitude]} />
              </MapContainer>

              {/* button to allow the user to add the specific gallery to their favorites */}
              <button type="button" className="mt-4  w-full hover:bg-white hover:text-black rounded px-4 py-2 "
                // function to add the gallery to the favorites array
                onClick={() => { addGalleryToFavorites(props.gallery) }}>
                Add to Favorites
              </button>

            </div>

          ) : (
            // If no gallery is selected, display this message and no gallery paintings container
            <div>
              <h2 className="text-2xl text-black font-bold">No gallery selected.</h2>
              <p>Please select a gallery to view its details.</p>
              <p className="italic text-black ">No map available.</p>
            </div>
          )}
        </div>
      </div>

      {/* Creating the GalleryPaintings contanier */}
      <div className="w-1/2 bg-gray-400 p-4 rounded-lg text-black">

        {/* prop passing the paintings array and the selected gallery paintings */}
        <GalleryPaintings className="bg-gray-400"
          paintings={props.paintings}
          setGalleryPaintings={props.setGalleryPaintings}
        />
      </div>
    </div>
  );
};

// Exporting the GalleryInfo component 
export default GalleryInfo;