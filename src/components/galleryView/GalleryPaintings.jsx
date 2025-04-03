// Developer: Christopher Nottingham
// Description: This component is used to display the list of paintings in the Gallery View.
import { useState } from "react";

// Importing Reese's Painting Modal component
import PaintingsModal from "../paintingsView/PaintingsModal.jsx";

const GalleryPaintings = (props) => {

    // Saving the props painting to a variable to be used in the component
    const paintings = props.paintings;

    // Creating a state variable to a boolean to keep track of whether the modal is open or not
    const [modalOpen, setModalOpen] = useState(false);

    // Creating a state variable to keep track of the selected painting
    const [selectedPainting, setSelectedPainting] = useState(null);

    // Reese's function to close the modal and reset the selected painting
    const closeModal = () => {
        setModalOpen(false);
        setSelectedPainting(null);
    }

    // Reese's function to desplay the selected painting in the modal
    const handleRowClick = (painting) => {
        setModalOpen(true);
        setSelectedPainting(painting);
    }


    // Function to handle the sorting of the paintings based on the users choice
    const handleSortClick = (event) => {
        // Get the name of the button clicked
        const sortBy = event.target.name;

        // Create a copy of the data array to avoid mutating the original
        const sortedPaintings = [...paintings];

        if (sortBy === "artistSortButton") {
            sortedPaintings.sort((a, b) => {
                return a.Artists.firstName.localeCompare(b.Artists.firstName)
            });
        } else if (sortBy === "titleSortButton") {
            sortedPaintings.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortBy === "yearSortButton") {
            sortedPaintings.sort((a, b) => b.yearOfWork - a.yearOfWork);
        }
        // Store the new sorted array in state
        props.setGalleryPaintings(sortedPaintings);
    };

    return (
        // Overall container for the paintings section
        <div>

            {/* The container for the sorting buttons */}
            <div className="flex text-black items-center justify-center mb-4">

                <div className="flex gap-2 text-black text-sm">
                    <button type="button" name="artistSortButton" onClick={handleSortClick} className=" hover:text-white">Sort by Artist</button>
                    <button type="button" name="titleSortButton" onClick={handleSortClick} className="hover:text-white">Sort by Title</button>
                    <button type="button" name="yearSortButton" onClick={handleSortClick} className="hover:text-white">Sort by Year</button>
                </div>

            </div>

            <div className="p-4 border text-black rounded ">
                {/* Using the ternary operator to either show a simple message if nothing has no gallery has been clicked */}
                {props.paintings.length === 0 ? (
                    <p className="text-black">No paintings available.</p>
                ) : (
                    // If there are paintings available, then display them in a list
                    <ul className="space-y-4">
                        {/* Using the map function to create a the painting card */}
                        {props.paintings.map((p) => (
                            <li onClick={() => { handleRowClick(p) }} key={p.paintingId} className="flex gap-4  mb-3  p-2 ">
                                <div className="w-16 h-16 flex-shrink-0 flex rounded overflow-hidden">
                                    
                                    <img
                                        src={`src/assets/art-images/paintings/full/${p.imageFileName}.jpg`}
                                        alt={p.title}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png";
                                            e.target.className = "w-full h-50 object-cover";
                                            e.target.alt = "Image not available";
                                        }}
                                    />
                                </div>
                                <div className="flex-col flex text-black">
                                    <p className="font-medium">{p.title}</p>
                                    <p className="font-sm">{p.yearOfWork}</p>
                                    <p className="text-sm">By {p.Artists.firstName} {p.Artists.lastName}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Using Reese's Painting Modal to show the clicked painting  */}
            <PaintingsModal className="z-10" open={modalOpen} onClose={closeModal} painting={selectedPainting} />
        </div>
    )

}
// Exporting the GalleryPaintings component
export default GalleryPaintings;