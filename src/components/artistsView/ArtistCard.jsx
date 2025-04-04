import React, { useContext } from "react";
import { ArtistsFavoritesContext } from "../../App";
import PaintingsToast from "../paintingsView/PaintingsToast.jsx";

const ArtistCard = (props) => {
    const selectedArtist = props.selectedArtist;

    // Access artistsFavorites and setArtistsFavorites from context
    const { artistsFavorites, setArtistsFavorites } = useContext(ArtistsFavoritesContext);
    const [toastMessage, setToastMessage] = React.useState(""); // State for toast message

    // Handle adding an artist to favorites
    const handleFavorite = (artist) => {
        const favoriteArtist = artistsFavorites.find((fav) => fav.artistId === artist.artistId);
        const isFavorite = favoriteArtist !== undefined;

        if (!isFavorite) {
            // Add artist to favorites and update localStorage
            setArtistsFavorites([...artistsFavorites, artist]);
            localStorage.setItem("artistsFavorites", JSON.stringify([...artistsFavorites, artist]));
            console.log("Added to favorites:", artist.firstName);

            // Show success toast message
            setToastMessage(`${artist.firstName} added to favorites!`);
            setTimeout(() => setToastMessage(""), 3000); // Clear toast after 3 seconds
        } else {
            // Show error toast message if already in favorites
            setToastMessage("This artist is already in your favorites!");
            setTimeout(() => setToastMessage(""), 3000); // Clear toast after 3 seconds
        }
    };

    return (
        <div className="flex-3 bg-gray-100 shadow-md rounded p-6 h-167 overflow-y-auto">
            {/* Toast message appears when add to favorites is clicked */}
            {toastMessage && <PaintingsToast message={toastMessage} />}

            {/* Show placeholder message if no artist is selected */}
            {!selectedArtist && (
                <div className="flex flex-col items-center gap-4 text-center">
                    <h1 className="text-2xl font-bold">An Artist Will Show Here</h1>
                    <p className="text-gray-500">Select an artist to get started!</p>
                </div>
            )}

            {/* Show artist details if an artist is selected */}
            {selectedArtist && (
                <div className="flex flex-col items-center gap-6 h-full">
                    {/* Artist image with fallback for missing images */}
                    <img
                        src={`src/assets/art-images/artists/square/${selectedArtist.artistId}.jpg`}
                        alt={selectedArtist.lastName}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png";
                            e.target.className = "w-32 h-32 object-cover rounded-full";
                            e.target.alt = "Image not available";
                        }}
                        className="w-32 h-32 object-cover rounded-full shadow-lg"
                    />

                    {/* Artist name */}
                    <h1 className="text-3xl font-bold text-center">
                        {`${selectedArtist.firstName} ${selectedArtist.lastName}`}
                    </h1>

                    {/* Artist details */}
                    <p className="text-gray-600 text-center">{selectedArtist.details}</p>
                    <div className="grid grid-cols-2 gap-4 w-full text-left justify-items-center">
                        <p className="text-gray-500">
                            <span className="font-semibold">Born:</span> {selectedArtist.yearOfBirth}
                        </p>
                        <p className="text-gray-500">
                            <span className="font-semibold">Died:</span> {selectedArtist.yearOfDeath}
                        </p>
                        <p className="text-gray-500">
                            <span className="font-semibold">Nationality:</span> {selectedArtist.nationality}
                        </p>
                        <p className="text-gray-500">
                            <span className="font-semibold">Gender:</span> {selectedArtist.gender || "N/A"}
                        </p>
                    </div>

                    {/* Link to more information about the artist */}
                    <a
                        href={selectedArtist.artistLink}
                        target="_blank"
                        className="bg-blue-500 text-white px-6 py-2 rounded shadow hover:bg-blue-600 hover:underline w-48 text-center"
                    >
                        More about {selectedArtist.firstName}
                    </a>

                    {/* Button to add artist to favorites */}
                    <button
                        className="bg-blue-500 text-white px-6 py-2 rounded shadow hover:bg-blue-600 hover:underline w-48"
                        onClick={() => handleFavorite(selectedArtist)}
                    >
                        Add to Favorites
                    </button>

                    {/* Back button */}
                    <button
                        className="bg-gray-300 text-gray-700 px-6 py-2 rounded shadow hover:bg-gray-400 w-48"
                        onClick={() => props.handleBackButton()}
                    >
                        Back
                    </button>
                </div>
            )}
        </div>
    );
};

export default ArtistCard;