import PaintingsTableRow from "./PaintingsTableRow.jsx";
import SortButton from "./SortButton.jsx";
import PaintingsModal from "./PaintingsModal.jsx";
import { useState } from "react";

const PaintingsTable = (props) => {
    // State to manage modal visibility
    const [modalOpen, setModalOpen] = useState(false);
    // State to store the selected painting details
    const [selectedPainting, setSelectedPainting] = useState(null);

    // Function to close the modal
    const closeModal = () => {
        setModalOpen(false);
        setSelectedPainting(null);
    };

    // Function to handle row click and open the modal
    const handleRowClick = (painting) => {
        setModalOpen(true);
        setSelectedPainting(painting);
    };

    return (
        <div className="h-full overflow-y-auto overflow-x-auto">
            <table className="w-full border-collapse">
                <thead className="bg-green-100">
                    <tr>
                        {/* Header for Thumbnail */}
                        <th className="p-5 text-center">
                            <span>Thumbnail</span>
                        </th>
                        {/* Header for Title */}
                        <th className="p-5 text-center">
                            <div className="flex items-center justify-center gap-2">
                                <span>Title</span>
                                <SortButton row="Title" handleSort={props.handleSort} sort={props.sort} />
                            </div>
                        </th>
                        {/* Header for Artist */}
                        <th className="p-5 text-center">
                            <div className="flex items-center justify-center gap-2">
                                <span>Artist</span>
                                <SortButton row="Artist" handleSort={props.handleSort} sort={props.sort} />
                            </div>
                        </th>
                        {/* Header for Year */}
                        <th className="p-5 text-center">
                            <div className="flex items-center justify-center gap-2">
                                <span>Year</span>
                                <SortButton row="Year" handleSort={props.handleSort} sort={props.sort} />
                            </div>
                        </th>
                        {/* Header for Gallery */}
                        <th className="p-5 text-center">
                            <div className="flex items-center justify-center gap-2">
                                <span>Gallery</span>
                                <SortButton row="Gallery" handleSort={props.handleSort} sort={props.sort} />
                            </div>
                        </th>
                        {/* Header for Medium */}
                        <th className="p-5 text-center">Medium</th>
                        {/* Header for Dimensions */}
                        <th className="p-5 text-center">Dimensions</th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {/* Loop through paintings to create rows */}
                    {props.paintings.map((painting, index) => (
                        <PaintingsTableRow
                            key={painting.paintingId ? `${painting.paintingId}Row` : `${index}Row`}
                            painting={painting}
                            rowClick={handleRowClick}
                        />
                    ))}
                </tbody>
            </table>
            {/* Modal to display painting details when a row is clicked*/}
            <PaintingsModal open={modalOpen} onClose={closeModal} painting={selectedPainting} />
        </div>
    );
};

export default PaintingsTable;