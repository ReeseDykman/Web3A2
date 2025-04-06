import { useState, useContext, useEffect } from "react";
import { PaintingsFavoritesContext } from "../../App.jsx";
import PaintingsToast from "./PaintingsToast.jsx";

const PaintingsModal = (props) => {
    const [isLoading, setIsLoading] = useState(true); // Track loading state
    const { paintingsFavorites, setPaintingsFavorites } = useContext(PaintingsFavoritesContext); // Access favorites context
    const [toastMessage, setToastMessage] = useState(""); // Toast message state

    // Reset isLoading on painting change
    useEffect(() => {
        setIsLoading(true);
    }, [props.painting]);

    // Handle adding/removing painting to/from favorites
    const handleFavoriteClick = (e) => {
        e.stopPropagation();
        const favoritePainting = paintingsFavorites.find((fav) => fav.paintingId === props.painting.paintingId);
        const isFavorite = favoritePainting !== undefined;

        if (!isFavorite) {
            setPaintingsFavorites([...paintingsFavorites, props.painting]);
            localStorage.setItem("paintingFavorites", JSON.stringify([...paintingsFavorites, props.painting]));
            console.log("Added to favorites:", props.painting.title);

            setToastMessage(`${props.painting.title} added to favorites!`);
            setTimeout(() => setToastMessage(""), 3000); // Clear toast after 3 seconds
        } else {
            setToastMessage("This painting is already in your favorites!");
            setTimeout(() => setToastMessage(""), 3000); // Clear toast after 3 seconds
        }
    };

    if (props.painting) {
        // Parse jsonAnnotations to extract dominant colors
        let dominantColors = [];
        try {
            const parsedAnnotations = JSON.parse(props.painting.jsonAnnotations);
            dominantColors = parsedAnnotations.dominantColors || [];
        } catch (error) {
            console.error("Error parsing jsonAnnotations:", error);
        }

        return (
            <div
                onClick={props.onClose}
                className={`flex justify-center items-center fixed inset-0 transition-colors ${
                    props.open ? "visible bg-black/20" : "invisible"
                }`}
            >
                {/* Toast message appears when add to favorites is clicked */}
                {toastMessage && <PaintingsToast message={toastMessage} />}
                {/* Modal Content */}
                <div
                    onClick={(e) => e.stopPropagation()}
                    className={`container w-1/2 bg-green-200 rounded-xl shadow p-6 transition-all overflow-y-auto relative ${
                        props.open ? "scale-100 opacity-100" : "scale-235 opacity-0"
                    }`}
                >
                    <div className="flex flex-row gap-4 items-center justify-between">
                        {/* Left section: Image and buttons */}
                        <div className="flex flex-col gap-4 mr-5 flex-shrink-0 w-40 items-center justify-center">
                            {isLoading && (
                                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                            )}
                            <img
                                src={`art-images/paintings/square/${props.painting.imageFileName}.jpg`}
                                alt={props.painting.title}
                                className={`object-cover ${isLoading ? "hidden" : "block"}`}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src =
                                        "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png";
                                    e.target.className = "w-full h-50 object-cover";
                                    e.target.alt = "Image not available";
                                    setIsLoading(false);
                                }}
                                onLoad={() => setIsLoading(false)}
                            />
                            <button
                                onClick={handleFavoriteClick}
                                className="w-full text-center bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
                            >
                                Add to Favorites
                            </button>
                            <a
                                href={props.painting.museumLink}
                                target="_blank"
                                className="w-full text-center bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                            >
                                Visit Museum
                            </a>
                            {/* Wiki link only if available */}
                            {props.painting.wikiLink && (
                                <a
                                    href={props.painting.wikiLink}
                                    target="_blank"
                                    className="w-full text-center bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                                >
                                    Visit Wiki Page
                                </a>
                            )}
                        </div>

                        {/* Right section: Painting details */}
                        <div className="flex flex-col gap-4 flex-grow relative pb-16">
                            <h1 className="text-2xl font-bold">{props.painting.title}</h1>
                            <h2 className="text-lg font-semibold">{`${props.painting.Artists.firstName} ${props.painting.Artists.lastName}`}</h2>
                            <h3 className="text-lg font-semibold">{props.painting.yearOfWork}</h3>
                            <p className="text-md text-gray-700">
                                <span className="font-semibold">Gallery: </span>
                                {props.painting.Galleries.galleryName}, {props.painting.Galleries.galleryCity}
                            </p>
                            <p>
                                {props.painting.description === ""
                                    ? "No description available."
                                    : props.painting.description}
                            </p>
                            <p>{props.painting.medium}</p>
                            <p>{`${props.painting.width} x ${props.painting.height}`}</p>

                            {/* Dominant Colors Section */}
                            <div className="mt-4">
                                <h4 className="text-lg font-semibold">Dominant Colors</h4>
                                <div className="flex flex-row gap-2 mt-2">
                                    {dominantColors.length > 0 ? (
                                        dominantColors.map((annotation, index) => (
                                            <div
                                                key={index}
                                                className="w-8 h-8 rounded"
                                                style={{
                                                    backgroundColor: `rgb(${annotation.color.red}, ${annotation.color.green}, ${annotation.color.blue})`,
                                                }}
                                            ></div>
                                        ))
                                    ) : (
                                        <p className="text-sm text-gray-500">No dominant colors available.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer Section */}
                    <div className="absolute bottom-0 left-0 right-0 flex justify-between items-center p-4 bg-green-200">
                        <p className="text-xs text-gray-400">{props.painting.copyrightText}</p>
                        <button
                            onClick={props.onClose}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        );
    }
};

export default PaintingsModal;