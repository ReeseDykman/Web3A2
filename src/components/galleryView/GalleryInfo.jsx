import GalleryPaintings from "./GalleryPaintings";
import "leaflet/dist/leaflet.css";
import { GalleriesFavoritesContext } from "../../App.jsx";
import { useContext, useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import PaintingsToast from "../paintingsView/PaintingsToast.jsx";

const GalleryInfo = (props) => {
    // Using context to access the gallery favorites
    const { galleryFavorites, setGalleryFavorites } = useContext(GalleriesFavoritesContext);
    const [toastMessage, setToastMessage] = useState(""); // State for toast message

    // Event handler function to handle adding the gallery to the favorites
    const addGalleryToFavorites = (gallery) => {
        const isFound = galleryFavorites.some((g) => g.galleryId === gallery.galleryId);

        if (isFound) {
          // Show error toast message if already in favorites
            setToastMessage("This gallery is already in your favorites!");
            setTimeout(() => setToastMessage(""), 3000); // Clear toast after 3 seconds
            return galleryFavorites;
        } else {
            const updatedGalFav = [...galleryFavorites, gallery];
            localStorage.setItem("galleryFavorites", JSON.stringify(updatedGalFav));
            setGalleryFavorites(updatedGalFav);

            setToastMessage(`${gallery.galleryName} added to favorites!`);
            setTimeout(() => setToastMessage(""), 3000); // Clear toast after 3 seconds

            return updatedGalFav;
        }
    };

    return (
        <div className="flex-3 bg-green-100 shadow-md rounded p-6 h-167 overflow-y-auto">
            {/* Toast message appears when add to favorites is clicked */}
            {toastMessage && <PaintingsToast message={toastMessage} />}

            {/* Show placeholder message if no gallery is selected */}
            {!props.gallery.galleryName && (
                <div className="flex flex-col items-center gap-4 text-center">
                    <h1 className="text-2xl font-bold">A Gallery Will Show Here</h1>
                    <p className="text-gray-500">Select a gallery to get started!</p>
                </div>
            )}

            {/* Show gallery details if a gallery is selected */}
            {props.gallery.galleryName && (
                <div className="flex flex-col items-center gap-6 h-full">
                    {/* Gallery name */}
                    <h1 className="text-3xl font-bold text-center">{props.gallery.galleryName}</h1>

                    {/* Gallery city and country */}
                    <p className="text-gray-600 text-center">
                        {props.gallery.galleryCity}, {props.gallery.galleryCountry}
                    </p>

                    {/* Gallery website */}
                    <a
                        href={props.gallery.galleryWebSite}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-green-500 hover:bg-green-300 hover:text-black text-white rounded px-6 py-2 mt-4 w-48 text-center"
                    >
                        Visit Website
                    </a>

                    {/* Map showing gallery location */}
                    <MapContainer
                        key={`${props.gallery.latitude}-${props.gallery.longitude}`}
                        center={[props.gallery.latitude, props.gallery.longitude]}
                        zoom={14}
                        className="h-80 w-full rounded-lg shadow z-0"
                    >
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <Marker position={[props.gallery.latitude, props.gallery.longitude]} />
                    </MapContainer>

                    {/* Add to favorites button */}
                    <button
                        type="button"
                        className="bg-green-500 hover:bg-green-300 hover:text-black text-white rounded px-6 py-2 mt-4 w-48"
                        onClick={() => addGalleryToFavorites(props.gallery)}
                    >
                        Add to Favorites
                    </button>
                </div>
            )}
        </div>
    );
};

// Exporting the GalleryInfo component
export default GalleryInfo;