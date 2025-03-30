import GalleryPaintings from "./GalleryPaintings";
import "leaflet/dist/leaflet.css";
import { GalleriesFavoritesContext } from "../../App.jsx";
import { useContext } from "react";
import { MapContainer, TileLayer, Marker } from 'react-leaflet'


const GalleryInfo = (props) => {

  // const {galleryFavorites, setGalleriesFavorites} = useContext(GalleriesFavoritesContext);

  const { galleryFavorites, setGalleryFavorites } = useContext(GalleriesFavoritesContext);

  const addGalleryToFavorites = (gallery) => {
    const isFound = galleryFavorites.some((g) => g.galleryId == gallery.galleryId);


    if (isFound) {

      return galleryFavorites;
    } else {
      const updatedGalFav = [...galleryFavorites, gallery];
      localStorage.setItem("galleryFavorites", JSON.stringify(updatedGalFav));
      setGalleryFavorites(updatedGalFav);
      return updatedGalFav;
    }

  };



  if (!props.gallery) {
    return (
      <div className="flex-1 border mt-6 p-4 rounded-lg shadow-sm">
        <p className="text-black italic">Select a gallery to view details.</p>
      </div>
    );
  }

  return (
    <div className="flex gap-6 mt-6 w-2/3">

      <div className="w-1/2 space-y-4">
      <div className="bg-sky-500 p-4 rounded-lg shadow flex flex-col items-center justify-center text-center">
          {props.gallery.galleryName ? (
            <div>
              <h2 className="text-2xl font-bold">
                {props.gallery.galleryName}
              </h2>
              <p>
                {props.gallery.galleryCity}, {props.gallery.galleryCountry}
              </p>
              <a
                href={props.gallery.galleryWebSite}
                target="_blank"
                className="text-blue-900 hover:text-white underline block mt-1"
              >
                Gallery Website
              </a>

              <MapContainer
                key={`${props.gallery.latitude}-${props.gallery.longitude}`}
                center={[props.gallery.latitude, props.gallery.longitude]}
                zoom={14}
                className="h-80 w-80 rounded-lg "
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker
                  position={[
                    props.gallery.latitude,
                    props.gallery.longitude,
                  ]}
                />
              </MapContainer>

              <button
                type="button"
                className="mt-4  w-full hover:bg-white hover:text-black  rounded px-4 py-2 "
                onClick={() => { addGalleryToFavorites(props.gallery) }}
              >
                Add to Favorites
              </button>

            </div>

          ) : (
            <div>
              <h2 className="text-2xl font-bold">No gallery selected.</h2>
              <p>Please select a gallery to view its details.</p>
              <p className="italic text-gray-600 mt-1">No map available.</p>
            </div>
          )}
        </div>
      </div>


      <div className="w-1/2 bg-sky-500 p-4 rounded-lg shadow text-black">
        <GalleryPaintings
          paintings={props.paintings}
          setGalleryPaintings={props.setGalleryPaintings}
        />
      </div>
    </div>
  );
};

export default GalleryInfo;