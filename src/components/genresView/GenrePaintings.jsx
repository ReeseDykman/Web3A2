// Developer: Christopher Nottingham
// Description: This component displays the paintings for the selected genre passed down with props in the Genre View.
import { useState, useEffect } from "react";
import PaintingsModal from "../paintingsView/PaintingsModal.jsx";

const GenrePaintings = (props) => {

  // Creating a state variable to a boolean to keep track of whether the modal is open or not
  const [modalOpen, setModalOpen] = useState(false);

   // Creating a state variable to keep track of the selected painting
   const [selectedPainting, setSelectedPainting] = useState(null);

  // Reese's function to close the modal and reset the selected painting
  const closeModal = () => {
    setModalOpen(false);
    setSelectedPainting(null);
  }

  // State to hold the sorted paintings
  const [sortedPaintings, setSortedPaintings] = useState([]);

  // Reese's function to desplay the selected painting in the modal
  const handleRowClick = (painting) => {
    setModalOpen(true);
    setSelectedPainting(painting);
  }
  // Ensuring the sorted paintings are updated when the props change
  useEffect(() => {
    setSortedPaintings(props.data);
  }, [props.data]);


  // Function to handle sorting based on the button clicked
  const handleSort = (event) => {
    // Get the name of the button clicked
    const sortBy = event.target.name;

    // Create a copy of the data array to avoid mutating the original
    const sortedArray = [...props.data];

    // Sort the array based on the button clicked
    if (sortBy === "artistSortButton") {
      sortedArray.sort((a, b) =>
        a.Artists.firstName.localeCompare(b.Artists.firstName)
      );
    } else if (sortBy === "titleSortButton") {
      sortedArray.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "yearSortButton") {
      sortedArray.sort((a, b) => b.yearOfWork - a.yearOfWork);
    }
    // Store the new sorted array in state
    setSortedPaintings(sortedArray);
  };

  return (
    // The overall container for the paintings section
    <div className="flex flex-col h-105">

      {/* Header for sorting that make sure it the sorting buttons are visable while the user is scrolling through the paintings  */}
      <div className="flex justify-between items-center p-2 bg-gray-100  sticky top-0">


        <h2 className="text-xl font-semibold text-gray-800">Paintings</h2>

        {/* Container for buttons */}
        <div className="flex gap-4 text-sm text-black">
          <button onClick={handleSort} name="artistSortButton" className="hover:text-blue-600" >
            Sort by Artist
          </button>
          <button onClick={handleSort} name="titleSortButton" className="hover:text-blue-600" >
            Sort by Title
          </button>
          <button onClick={handleSort} name="yearSortButton" className="hover:text-blue-600" >
            Sort by Year
          </button>
        </div>
      </div>

      {/* Overall container for the table */}
      <div className="overflow-y-auto flex-1 border rounded">
        <table className="w-full table-auto border-collapse">
          {/* Header for the table class name sticky is used to keep it in fixed whilst the user scrolls*/}
          <thead className="sticky top-0 bg-white shadow">
            <tr>
              <th className="px-4 py-2 text-left">Thumbnail</th>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Year</th>
              <th className="px-4 py-2 text-left">Artist</th>
            </tr>
          </thead>
          {/* Body of the table */}
          <tbody>
            {/* Mapping through the sorted paintings array to display each painting */}
            {sortedPaintings.map((p) => (
              <tr onClick={() => {handleRowClick(p)}} key={p.paintingId} className="border-t hover:bg-gray-100">
                <td className="px-4 py-2">
                  <img
                    src={`src/assets/art-images/paintings/square/${p.imageFileName}.jpg`}
                    alt={p.title} className="w-16 h-16 object-cover rounded" />
                </td>
                {/* Displaying the painting title, year of work, and artist name */}
                <td className="px-4 py-2">{p.title}</td>
                <td className="px-4 py-2">{p.yearOfWork}</td>
                <td className="px-4 py-2">
                  {p.Artists.firstName} {p.Artists.lastName}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Using Reese's Painting Modal to show the clicked painting  */}
      <PaintingsModal className="z-10" open={modalOpen} onClose={closeModal} painting={selectedPainting} />

    </div>
  );
};

// Exporting the GenrePaintings component to be used in other parts of the application
export default GenrePaintings;