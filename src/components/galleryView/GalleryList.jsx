import GalleryListItem from "./GalleryListItem.jsx";
import { useContext, useState } from "react";
import { GalleriesContext } from "../../App.jsx";

const GalleryList = (props) => {
    // Using context to access the galleries
    const { galleries } = useContext(GalleriesContext);

    // State to manage the filtered list of galleries
    const [filteredGalleries, setFilteredGalleries] = useState(galleries);

    // Function to handle the search input and filter galleries
    const handleSearch = (e) => {
        const searchTerm = e.target.value;

        // If search term is empty, reset to the full list of galleries
        if (searchTerm === "") {
            setFilteredGalleries(galleries);
            return;
        }

        // Filter galleries based on the gallery name starting with the search term
        const filtered = galleries.filter((gallery) =>
            gallery.galleryName.toLowerCase().startsWith(searchTerm.toLowerCase())
        );

        // Update the state with the filtered list
        setFilteredGalleries(filtered);
    };

    return (
        <div className="bg-green-700 flex-1 bg-gray-100 shadow-md rounded p-4 h-167 overflow-hidden">
            {/* Input field for searching galleries */}
            <input
                onChange={handleSearch}
                type="text"
                placeholder="Search for a gallery..."
                className="w-full p-2 border border-gray-300 bg-green-100 rounded mb-4"
            />
            {/* List of galleries displayed as list items */}
            <ul className="list-none space-y-2 overflow-y-auto h-full p-2">
                {filteredGalleries.map((gallery, index) => (
                    <GalleryListItem
                        key={gallery.galleryId ? `${gallery.galleryId}Li` : `${index}Li`}
                        data={gallery}
                        update={props.update}
                    />
                ))}
            </ul>
        </div>
    );
};

export default GalleryList;