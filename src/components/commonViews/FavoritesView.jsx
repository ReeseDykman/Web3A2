// Developer: Christopher Nottingham
// Description: This component displays the user's favorite galleries, artists, and paintings. It allows the user to remove individual favorites or clear all favorites at once.
import { useContext } from "react";
import { GalleriesFavoritesContext } from "../../App.jsx";
import { ArtistsFavoritesContext } from "../../App.jsx";
import { PaintingsFavoritesContext } from "../../App.jsx";

const FavoriteView = () => {

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
    // Used ternary operators for each favorite array to check if there are any favorites and therefore handle what should be displayed in that column.
    <div className=" text-center items-center justify-center min-h-screen  text-black px-4 py-8">
      <h1 className="text-4xl font-bold mb-4 text-black">Favorites</h1>
      {/* Button to let the user clear all favorite arrays */}
      <button onClick={removeAllFavorites} className="mb-8 px-4 py-2 bg-blue-200  rounded hover:bg-blue-300 " >
        Remove All Favorites
      </button>

      <div className="flex flex-row gap-8 justify-center items-start  w-full">

        {/* Gallery Fav's */}
        <div className="bg-gray-400 p-6 rounded-lg  w-1/3">
          <h2 className="text-2xl font-bold mb-4">Galleries</h2>
          {galleryFavorites.length > 0 ? (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b text-black text-sm ">
                  <th className="pb-2">Gallery Name</th>
                  <th className="pb-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {/* Using the map file to programmatically print out all the favorites */}
                {galleryFavorites.map((gallery) => (
                  <tr key={gallery.galleryId} className="border bg-white">
                    <td className="py-2">{gallery.galleryName}</td>
                    <td className="py-2 text-right">
                      <button onClick={() => removeGallery(gallery.galleryId)}
                        className="text-red-500 hover:text-red-700 text-sm">
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-black">No favorite galleries found.</p>
          )}
        </div>

        {/* ArtistFav's */}
        <div className="bg-gray-400 p-6 rounded-lg w-1/3   ">
          <h2 className="text-2xl font-bold mb-4">Artists</h2>
          {artistsFavorites.length > 0 ? (
            <table className="w-full text-left ">
              <thead>
                <tr className="border-b text-sm text-black">
                  <th className="pb-2">Artist Name</th>
                  <th className="pb-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {/* Using the map file to programmatically print out all the favorites */}
                {artistsFavorites.map((artist) => (
                  <tr key={artist.artistId} className="border bg-white">
                    <td className="py-2">{artist.artistName}</td>
                    <td className="py-2 text-right">
                      <button onClick={() => removeArtist(artist.artistId)} className="text-red-500 hover:text-red-700 text-sm" >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-black">No favorite artists found.</p>
          )}
        </div>

        {/* Paintongs Fav's */}
        <div className="bg-gray-400 p-6 rounded-lg  w-1/3 ">
          <h2 className="text-2xl font-bold mb-4">Paintings</h2>
          {paintingsFavorites.length > 0 ? (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b   text-sm text-black">
                  <th className="pb-2">Painting Title</th>
                  <th className="pb-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {/* Using the map file to programmatically print out all the favorites */}
                {paintingsFavorites.map((painting) => (
                  <tr key={painting.paintingId} className="border bg-white ">
                    <td className="py-2">{painting.title}</td>
                    <td className="py-2 text-right">
                      <button onClick={() => removePainting(painting.paintingId)} className="text-red-500 hover:text-red-700 text-sm" >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-black">No favorite paintings found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

// Exporting the FavoriteView component 
export default FavoriteView;