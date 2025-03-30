import PaintingsForm from "./PaintingsForm";
import PaintingsTable from "./PaintingsTable";
import filter from "../../scripts/filterFactory";
import { PaintingsContext } from "../../App";
import { useContext, useState } from "react";

const PaintingsView = () => {
    const { paintings } = useContext(PaintingsContext);
    const [filteredPaintings, setFilteredPaintings] = useState(paintings);
    const [sort, setSort] = useState(new filter("Title", "asc"));

    const handleFilter = (filter) => {
        // Filtering logic here
    };

    const handleSort = ({field, value}) => {
        setSort(new filter(field, value));
        const sortedPaintings = [...filteredPaintings].sort((a, b) => {
            const aValue = a[field] || 0;
            const bValue = b[field] || 0;
            if (aValue < bValue) return value === "asc" ? -1 : 1;
            if (aValue > bValue) return value === "asc" ? 1 : -1;
            return 0;
        });
        setFilteredPaintings(sortedPaintings);
    }

    return (
        <section className="w-full h-full mx-auto p-4 flex flex-col md:flex-row gap-4">
            {/* Paintings Form */}
            <div className="w-full h-120 md:w-1/4 bg-gray-100 shadow-md rounded p-4">
                <PaintingsForm handleFilter={handleFilter} />
            </div>

            {/* Paintings List */}
            <div className="flex-1 bg-gray-100 shadow-md rounded p-4 h-165 overflow-hidden">
                <PaintingsTable paintings={filteredPaintings} handleOrder={handleSort} sort={sort}/>
            </div>
        </section>
    );
};

export default PaintingsView;