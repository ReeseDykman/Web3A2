import PaintingsTable from "../paintingsView/PaintingsTable";
import ArtistsList from "./ArtistsList";
import ArtistCard from "./ArtistCard.jsx";
import { useContext, useState } from "react";
import { PaintingsContext } from "../../App";
import filter from "../../scripts/filterFactory";

const ArtistsView = () => {
    const { paintings } = useContext(PaintingsContext);
    const [artistPaintings, setArtistPaintings] = useState(paintings);
    const [selectedArtist, setSelectedArtist] = useState(null);
    const [sort, setSort] = useState(new filter("Title", "asc"));

    // Handles sorting of paintings based on the selected field and order
    const handleSort = ({ field, value }, paintings) => {
        setSort(new filter(field, value));

        // Maps fields to their corresponding values in the painting object
        const fieldMapping = {
            title: (painting) => painting.title,
            artist: (painting) => `${painting.Artists.firstName} ${painting.Artists.lastName}`,
            gallery: (painting) => painting.Galleries.galleryName,
            year: (painting) => painting.yearOfWork,
        };

        // Use current artistPaintings if no paintings are provided
        if (!paintings) {
            paintings = [...artistPaintings];
        }

        // Sort paintings based on the selected field and order
        const sortedPaintings = paintings.sort((a, b) => {
            let aValue, bValue;

            // Get the function for the field and pass the painting to it
            aValue = fieldMapping[field.toLowerCase()](a) || "";
            bValue = fieldMapping[field.toLowerCase()](b) || "";

            // Handle numeric comparison for years
            if (typeof aValue === "number" && typeof bValue === "number") {
                return value === "asc" ? bValue - aValue : aValue - bValue;
            }

            // Handle string comparison
            if (
                aValue.toLowerCase().trim().replace(/ /g, "") <
                bValue.toLowerCase().trim().replace(/ /g, "")
            ) {
                return value === "asc" ? -1 : 1;
            } else if (
                aValue.toLowerCase().trim().replace(/ /g, "") >
                bValue.toLowerCase().trim().replace(/ /g, "")
            ) {
                return value === "asc" ? 1 : -1;
            } else {
                return 0;
            }
        });

        setArtistPaintings(sortedPaintings);
    };

    // Filters paintings by the selected artist
    const handleArtistClick = (artist) => {
        setSelectedArtist(artist);
        const toFilter = [...paintings];
        const filteredPaintings = toFilter.filter(
            (painting) => painting.Artists.artistId === artist.artistId
        );
        handleSort(sort, filteredPaintings);
    };

    // Resets to the full list of paintings when back button is clicked
    const handleBackButton = () => {
        setSelectedArtist(null);
        handleSort(sort, [...paintings]);
    };

    return (
        <section className="w-full h-full mx-auto p-4 flex flex-col md:flex-row gap-4 justify-between">
            {/* List of artists */}
            <ArtistsList handleArtistClick={handleArtistClick} />

            {/* Card displaying selected artist details */}
            <ArtistCard
                selectedArtist={selectedArtist}
                handleBackButton={handleBackButton}
            />

            {/* Table displaying the selected artists paintings */}
            <div className="flex-5 bg-gray-100 shadow-md rounded p-4 h-167 overflow-hidden">
                <PaintingsTable
                    paintings={artistPaintings}
                    handleSort={handleSort}
                    sort={sort}
                />
            </div>
        </section>
    );
};

export default ArtistsView;