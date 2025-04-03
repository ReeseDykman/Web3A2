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

    const handleSort = ({ field, value }, paintings) => {
        setSort(new filter(field, value));

        // Returns the proper field in the JSON
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

            // Get the function for the field and pass the painting to it
            aValue = fieldMapping[field.toLowerCase()](a) || "";
            bValue = fieldMapping[field.toLowerCase()](b) || "";

            // Years are numbers, so we need to handle them differently but we can compare them directly
            if (typeof aValue === "number" && typeof bValue === "number") {
                return value === "asc" ? bValue - aValue : aValue - bValue;
            }

            // Compare strings
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

    const handleArtistClick = (artist) => {
        setSelectedArtist(artist);
        const toFilter = [...paintings];
        const filteredPaintings = toFilter.filter(
            (painting) => painting.Artists.artistId === artist.artistId
        );
        handleSort(sort, filteredPaintings);
    };

    const handleBackButton = () => {
        setSelectedArtist(null);
        handleSort(sort, [...paintings]);
    };

    return (
        <section className="w-full h-full mx-auto p-4 flex flex-col md:flex-row gap-4 justify-between">
            <ArtistsList handleArtistClick={handleArtistClick} />

            <ArtistCard
                selectedArtist={selectedArtist}
                handleBackButton={handleBackButton}
            />

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