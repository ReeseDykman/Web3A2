// Developer: Christopher Nottingham, revized into modal by Reese Dykman
// MODAL STYLING AND HELP FROM "YOUR CODE LAB" YOUTUBE: https://www.youtube.com/watch?v=dEGbXY-8YtU&ab_channel=YourCodeLab
// Description: This component displays the user's favorite galleries, artists, and paintings. It allows the user to remove individual favorites or clear all favorites at once.
import { useContext } from "react";
import { GalleriesFavoritesContext, ArtistsFavoritesContext, PaintingsFavoritesContext } from "../../App.jsx";

const FavoritesModal = (props) => {

  // Using context to access the favorites
  const { galleryFavorites, setGalleryFavorites } = useContext(GalleriesFavoritesContext);
  const { artistsFavorites, setArtistsFavorites } = useContext(ArtistsFavoritesContext);
  const { paintingsFavorites, setPaintingsFavorites } = useContext(PaintingsFavoritesContext);

  // Functions to remove individual favorites
  // These functions filter out the selected favorite by making the match case not equal to the selected favorite id type
  // and then update the state and local storage with the new list
  const removeArtist = (artistId) => {
    const revised = artistsFavorites.filter((a) => a.artistId !== artistId);
    setArtistsFavorites(revised);
    localStorage.setItem("artistsFavorites", JSON.stringify(revised));
  };

  const removeGallery = (galleryId) => {
    const revised = galleryFavorites.filter((g) => g.galleryId !== galleryId);
    setGalleryFavorites(revised);
    localStorage.setItem("galleryFavorites", JSON.stringify(revised));
  };

  const removePainting = (paintingId) => {
    const revised = paintingsFavorites.filter((p) => p.paintingId !== paintingId);
    setPaintingsFavorites(revised);
    localStorage.setItem("paintingFavorites", JSON.stringify(revised));
  };

  // Function to remove all favorites
  // This function clears all favorites from the state and local storage
  const removeAllFavorites = () => {
    // Setting the state to empty arrays
    setGalleryFavorites([]);
    setArtistsFavorites([]);
    setPaintingsFavorites([]);

    // Setting the local storage to empty arrays
    localStorage.setItem("galleryFavorites", galleryFavorites);
    localStorage.setItem("artistsFavorites", artistsFavorites);
    localStorage.setItem("paintingFavorites", paintingsFavorites);
  };

  return (
    // The overall container for the favorites section.
    <div
        onClick={props.onClose} // Clicking outside the modal will close it
        className={`fixed inset-0 flex justify-center items-center bg-black/50 transition-opacity z-100 ${
            props.open ? "visible opacity-100" : "invisible opacity-0"
        }`}
    >
        <div
            onClick={(e) => e.stopPropagation()} // so that clicking inside the modal does not close it
            className={`bg-green-700 rounded-lg shadow-lg w-3/4 max-w-5xl p-6 overflow-y-auto transition-transform ${
                props.open ? "scale-100" : "scale-95"
            }`}
        >
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-white">Favorites</h1>
                <button onClick={props.onClose}
                    className="text-gray-500 hover:text-gray-700 hover:cursor-pointer focus:outline-none"
                >
                    ✖
                </button>
            </div>


            {/* Favorites Tables */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 overflow-hidden">
                {/* Gallery Favorites */}
                <div className="bg-green-200 p-4 rounded-lg shadow overflow-y-auto">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Galleries</h2>
                    {galleryFavorites.length > 0 ? (
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b text-sm text-gray-600">
                                    <th className="pb-2">Gallery Name</th>
                                    <th className="pb-2 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {galleryFavorites.map((gallery) => (
                                    <tr key={gallery.galleryId} className="border-t">
                                        <td className="py-2 text-gray-800">{gallery.galleryName}</td>
                                        <td className="py-2 text-right">
                                            <button
                                                onClick={() => removeGallery(gallery.galleryId)}
                                                className="text-red-500 hover:text-red-700 text-sm"
                                            >
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-gray-600">No favorite galleries found.</p>
                    )}
                </div>

                {/* Artist Favorites */}
                <div className="bg-green-200 p-4 rounded-lg shadow overflow-y-auto">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Artists</h2>
                    {artistsFavorites.length > 0 ? (
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b text-sm text-gray-600">
                                    <th className="pb-2">Artist Name</th>
                                    <th className="pb-2 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {artistsFavorites.map((artist) => (
                                    <tr key={artist.artistId} className="border-t">
                                        <td className="py-2 text-gray-800">{artist.firstName} {artist.lastName}</td>
                                        <td className="py-2 text-right">
                                            <button
                                                onClick={() => removeArtist(artist.artistId)}
                                                className="text-red-500 hover:text-red-700 text-sm"
                                            >
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-gray-600">No favorite artists found.</p>
                    )}
                </div>

                {/* Painting Favorites */}
                <div className="bg-green-200 p-4 rounded-lg shadow overflow-y-auto">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Paintings</h2>
                    {paintingsFavorites.length > 0 ? (
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b text-sm text-gray-600">
                                    <th className="pb-2">Painting Title</th>
                                    <th className="pb-2 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paintingsFavorites.map((painting) => (
                                    <tr key={painting.paintingId} className="border-t">
                                        <td className="py-2 text-gray-800">{painting.title}</td>
                                        <td className="py-2 text-right">
                                            <button
                                                onClick={() => removePainting(painting.paintingId)}
                                                className="text-red-500 hover:text-red-700 text-sm"
                                            >
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-gray-600">No favorite paintings found.</p>
                    )}
                </div>
            </div>
            {/* Remove All Favorites Button */}
            <div className="flex justify-end mb-6 mt-6">
                <button
                    onClick={removeAllFavorites}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                    Remove All Favorites
                </button>
            </div>
        </div>
    </div>
  );
};

// Exporting the FavoriteView component 
export default FavoritesModal;