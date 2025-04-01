import PaintingsTable from "../paintingsView/PaintingsTable";
import { useContext } from "react";
import { PaintingsContext } from "../../App";
import filter from "../../scripts/filterFactory";
import { useState } from "react";

const ArtistsView = () => {

    const { paintings } = useContext(PaintingsContext);
    const [artistPaintings, setArtistPaintings] = useState(paintings);
    const [sort, setSort] = useState(new filter("Title", "asc"));

    const handleSort = ({ field, value }, paintings) => {
        setSort(new filter(field, value));

        //Returns the proper field in the json
        const fieldMapping = {
            title: (painting) => painting.title,
            artist: (painting) => `${painting.Artists.firstName} ${painting.Artists.lastName}`,
            gallery: (painting) => painting.Galleries.galleryName,
            year: (painting) => painting.yearOfWork,
        };

        if (!paintings) {
            paintings = [...artistPaintings];
        }

        const sortedPaintings = paintings.sort((a, b) => {
            let aValue, bValue;

            //get the function for the field and pass the painting to it
            aValue = fieldMapping[field.toLowerCase()](a) || "";
            bValue = fieldMapping[field.toLowerCase()](b) || "";

            // Years are numbers, so we need to handle them differently but we can compare them directly
            //if ascending, subtract a from b, if descending, subtract b from a
            if (typeof aValue === "number" && typeof bValue === "number") {
                return value === "asc" ? bValue - aValue : aValue - bValue;
            }

            //if a is greater than b, return 1, if a is less than b, return -1, else return 0
            //the return value is inverted if descending
            if (aValue.toLowerCase().trim().replace(/ /g, "") < bValue.toLowerCase().trim().replace(/ /g, "")) {
                return value === "asc" ? -1 : 1;
            } else if (aValue.toLowerCase().replace(/ /g, "") > bValue.toLowerCase().trim().replace(/ /g, "")) {
                return value === "asc" ? 1 : -1;
            } else {
                return 0;
            }
        });

        setArtistPaintings(sortedPaintings);
    };

    return (
        <section className="w-full h-full mx-auto p-4 flex flex-col md:flex-row gap-4 justify-between">

            <div className="flex-1 bg-gray-100 shadow-md rounded p-4">
                <h1 className="text-2xl font-bold">Artists</h1>
                <p className="text-gray-500">List of artists and their paintings</p>
            </div>

            <div className="flex-3 bg-gray-100 shadow-md rounded p-4">
                <h1 className="text-2xl font-bold">Artists</h1>
                <p className="text-gray-500">List of artists and their paintings</p>
            </div>

            <div className="flex-5 bg-gray-100 shadow-md rounded p-4 h-176 overflow-hidden">
                <PaintingsTable paintings={artistPaintings} handleSort={handleSort} sort={sort} />
            </div>
        </section>
    );
}

export default ArtistsView;