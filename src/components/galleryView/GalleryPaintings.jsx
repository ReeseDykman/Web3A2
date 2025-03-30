
import { useContext } from "react";
import { ArtistsContext } from "../../App.jsx";

const GalleryPaintings = (props) => {
    console.log(props);

   const paintings = props.paintings;

    const { artists } = useContext(ArtistsContext);
    // const { galleries } = useContext(GalleriesContext);

   

    
    const handleClick = (event) => {
        
        const sortBy = event.target.name;
        const sortedPaintings = [...paintings]; // Copy current paintings array
    
        if (sortBy === "artistSortButton") {
            sortedPaintings.sort((a, b) => {
                return a.Artists.firstName.localeCompare(b.Artists.firstName)
                
            });
        } else if (sortBy === "titleSortButton") {
            sortedPaintings.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortBy === "yearSortButton") {
            sortedPaintings.sort((a, b) => b.yearOfWork - a.yearOfWork); 
        }
    
        props.setGalleryPaintings(sortedPaintings); 
    };

    return (
        // Stuggling to fix the poitioning when the error image is used
        <div>
            <div className="flex text-black items-center justify-center mb-4">
                
                <div className="flex gap-2 text-black text-sm">
                    <button type="button" name="artistSortButton"  onClick={handleClick} className=" hover:text-white">Sort by Artist</button>
                    <button type="button" name="titleSortButton" onClick={handleClick} className="hover:text-white">Sort by Title</button>
                    <button type="button" name="yearSortButton"  onClick={handleClick} className="hover:text-white">Sort by Year</button>
                </div>

            </div>

            <div className="p-4 border text-black rounded ">
                {props.paintings.length === 0 ? (
                    <p className="text-black">No paintings available.</p>
                ) : (
                    <ul className="space-y-4">
                        {props.paintings.map((p) => (
                            <li key={p.paintingId} className="flex gap-4  mb-3  p-2 ">
                            <div className="w-16 h-16 flex-shrink-0 flex rounded overflow-hidden">
                              <img
                                src={`https://res.cloudinary.com/funwebdev/image/upload/h_75/art/paintings/square/${p.imageFileName}`}
                                alt={p.title}
                                className="w-full h-full object-cover"
                                // if the image is not available, use the default image
                                // ----have problems though when it as it messes up the layout after until a future painting is found in the 
                                // gallery list----
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png";
                                  e.target.className = "object-cover w-full h-full";
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
        </div>
    )

}

export default GalleryPaintings;