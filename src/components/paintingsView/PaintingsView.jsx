import PaintingsForm from "./PaintingsForm";
import PaintingsList from "./PaintingsList";
import { PaintingsContext } from "../../App";
import { useContext, useState } from "react";

const PaintingsView = () => {
    const { paintings } = useContext(PaintingsContext);
    const [filteredPaintings, setFilteredPaintings] = useState(paintings);

    const handleFilter = (filter) => {
        // Filtering logic here
    };

    return (
        <section className="h-full mx-auto p-4 flex flex-col md:flex-row gap-4">
            {/* Paintings Form */}
            <div className="w-full md:w-1/4 bg-gray-100 shadow-md rounded p-4 h-full">
                <PaintingsForm handleFilter={handleFilter} />
            </div>

            {/* Paintings List */}
            <div className="flex-1 bg-gray-100 shadow-md rounded p-4 h-full">
                <PaintingsList paintings={filteredPaintings} />
            </div>
        </section>
    );
};

export default PaintingsView;