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
        const fieldMapping = {
            title: (painting) => painting.title,
            artist: (painting) => `${painting.Artists.firstName} ${painting.Artists.lastName}`,
            gallery: (painting) => painting.Galleries.galleryName,
            year: (painting) => painting.yearOfWork,
        };
    
        const toFilter = [...paintings];
        let filtered;
    
        // Handle range filtering (e.g., year range)
        if (Array.isArray(filter.value)) {
            filtered = toFilter.filter((painting) => {
                const fieldValue = fieldMapping[filter.field](painting);
                return fieldValue >= filter.value[0] && fieldValue <= filter.value[1];
            });
        } else {
            // Handle text-based filtering (e.g., title, artist, gallery)
            filtered = toFilter.filter((painting) => {
                const fieldValue = fieldMapping[filter.field](painting);
                return fieldValue
                    .toLowerCase()
                    .startsWith(filter.value.toLowerCase());
            });
        }
    
        setFilteredPaintings(filtered);
    };

    const handleSort = ({ field, value }) => {
        setSort(new filter(field, value));

        //Returns the proper field in the json
        const fieldMapping = {
            title: (painting) => painting.title,
            artist: (painting) => `${painting.Artists.firstName} ${painting.Artists.lastName}`,
            gallery: (painting) => painting.Galleries.galleryName,
            year: (painting) => painting.yearOfWork,
        };

        const sortedPaintings = [...filteredPaintings].sort((a, b) => {
            let aValue, bValue;

            //get the function for the field and pass the painting to it
            aValue = fieldMapping[field.toLowerCase()](a) || "";
            bValue = fieldMapping[field.toLowerCase()](b) || "";

            // Years are numbers, so we need to handle them differently but we can compare them directly
            //if ascending, subtract a from b, if descending, subtract b from a
            if (typeof aValue === "number" && typeof bValue === "number") {
                return value === "asc" ? aValue - bValue : bValue - aValue;
            }
            //if a is greater than b, return 1, if a is less than b, return -1, else return 0
            //the return value is inverted if descending
            if (aValue.toLowerCase() < bValue.toLowerCase()) {
                return value === "asc" ? -1 : 1;
            } else if (aValue.toLowerCase() > bValue.toLowerCase()) {
                return value === "asc" ? 1 : -1;
            } else {
                return 0;
            }
        });

        setFilteredPaintings(sortedPaintings);
    };

    const handleReset = () => {
        setFilteredPaintings(paintings);
    }

    return (
        <section className="w-full h-full mx-auto p-4 flex flex-col md:flex-row gap-4">
            {/* Paintings Form */}
            <div className="w-full h-120 md:w-1/4 bg-gray-100 shadow-md rounded p-4">
                <PaintingsForm handleReset={handleReset} paintings={paintings} handleFilter={handleFilter} />
            </div>

            {/* Paintings List */}
            <div className="flex-1 bg-gray-100 shadow-md rounded p-4 h-165 overflow-hidden">
                <PaintingsTable paintings={filteredPaintings} handleSort={handleSort} sort={sort} />
            </div>
        </section>
    );
};

export default PaintingsView;