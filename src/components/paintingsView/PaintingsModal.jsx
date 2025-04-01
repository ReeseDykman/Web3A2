import { useState, useContext, useEffect } from "react";
import { PaintingsFavoritesContext } from "../../App.jsx";


const PaintingsModal = (props) => {

    const [isLoading, setIsLoading] = useState(true);
    const { paintingsFavorites, setPaintingsFavorites } = useContext(PaintingsFavoritesContext);

    //isLoading needs to reset every render
    useEffect(() => {
        setIsLoading(true);
    }, [props.painting]);

    const handleFavoriteClick = (e) => {
        e.stopPropagation();
        const favoritePainting = paintingsFavorites.find((fav) => fav.paintingId === props.painting.paintingId);
        const isFavorite = favoritePainting !== undefined;

        if(!isFavorite) {
            setPaintingsFavorites([...paintingsFavorites, props.painting]);
            localStorage.setItem("paintingFavorites", JSON.stringify([...paintingsFavorites, props.painting]));
            console.log("Added to favorites:", props.painting.title);
        }
        else {
            console.log("This painting is already a favorite.");
        }
    }

    if(props.painting){
        return(
            // MODAL STYLING AND HELP FROM "YOUR CODE LAB" YOUTUBE: https://www.youtube.com/watch?v=dEGbXY-8YtU&ab_channel=YourCodeLab
            <div onClick={props.onClose} className={`flex justify-center items-center fixed inset-0 justify-center items-center transition-colors ${props.open ? "visible bg-black/20" : "invisible"}`}>
                <div onClick={(e) => e.stopPropagation} className={`container w-1/2 bg-white rounded-xl shadow p-6 transition-all ${props.open ? "scale-100 opacity-100" : "scale-235 opacity-0"}`}>
                    <div className="flex flex-row gap-4 items-center justify-between">
                        <div className="flex flex-col gap-4 mr-5 flex-shrink-0 w-40 items-center justofy-center">
                            {isLoading && (
                                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                            )}
                            <img
                                src={`https://res.cloudinary.com/funwebdev/image/upload/h_500/art/paintings/square/${props.painting.imageFileName}.jpg`}
                                alt={props.painting.title}
                                className={`object-cover ${isLoading ? "hidden" : "block"}`}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png";
                                    e.target.className = "w-full h-50 object-cover";
                                    e.target.alt = "Image not available";
                                    setIsLoading(false);
                                }}
                                onLoad={() => setIsLoading(false)}
                            />
                            <button onClick={handleFavoriteClick} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Add to Favorites</button>
                        </div>
                        <div className="flex flex-col gap-4 flex-grow">
                            <h1 className="text-2xl font-bold">{props.painting.title}</h1>
                            <h2 className="text-lg font-semibold">{`${props.painting.Artists.firstName} ${props.painting.Artists.lastName}`}</h2>
                            <p>{props.painting.description == "" ? "No description available." : props.painting.description}</p>
                            <p>{props.painting.medium}</p>
                            <div className="flex flex-row gap-4 items-center justify-between">
                                <p>{`${props.painting.width} x ${props.painting.height}`}</p>
                                <button onClick={props.onClose} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    

}

export default PaintingsModal;