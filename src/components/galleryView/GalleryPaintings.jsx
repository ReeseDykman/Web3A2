
import { useState} from "react";

import PaintingsModal from "../paintingsView/PaintingsModal.jsx";

const GalleryPaintings = (props) => {
    console.log(props);

   const paintings = props.paintings;

   
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedPainting, setSelectedPainting] = useState(null);
    
    const closeModal = () => {
        setModalOpen(false);
        setSelectedPainting(null);
    }
    

    const handleRowClick = (painting) => {
        setModalOpen(true);
        setSelectedPainting(painting);
    }



    const handleSortClick = (event) => {

        const sortBy = event.target.name;
        const sortedPaintings = [...paintings];

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
                    <button type="button" name="artistSortButton"  onClick={handleSortClick} className=" hover:text-white">Sort by Artist</button>
                    <button type="button" name="titleSortButton" onClick={handleSortClick} className="hover:text-white">Sort by Title</button>
                    <button type="button" name="yearSortButton"  onClick={handleSortClick} className="hover:text-white">Sort by Year</button>
                </div>

            </div>

            <div className="p-4 border text-black rounded ">
                {props.paintings.length === 0 ? (
                    <p className="text-black">No paintings available.</p>
                ) : (
                    <ul className="space-y-4">
                        {props.paintings.map((p) => (
                            <li onClick={() => {handleRowClick(p)}} key={p.paintingId} className="flex gap-4  mb-3  p-2 ">
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
            <PaintingsModal className="z-10" open={modalOpen} onClose={closeModal} painting={selectedPainting} />
        </div>
    )

}

export default GalleryPaintings;

// 
// import { useContext, useState } from "react";
// import { ArtistsContext } from "../../App.jsx";
// import PaintingsModal from "../paintingsView/PaintingsModal.jsx";
// import GenreList from "../genresView/GenreList.jsx";
// const GalleryPaintings = (props) => {

//     console.log(props);


//     const paintings = props.paintings;



//     const [modalOpen, setModalOpen] = useState(false);
//     const [selectedPainting, setSelectedPainting] = useState(null);

//     const closeModal = () => {
//         setModalOpen(false);
//         setSelectedPainting(null);
//     }

//     const handleRowClick = (painting) => {
//         setModalOpen(true);
//         setSelectedPainting(painting);
//     }



//     const handleSortClick = (event) => {

//         const sortBy = event.target.name;
//         const sortedPaintings = [...paintings];

//         if (sortBy === "artistSortButton") {
//             sortedPaintings.sort((a, b) => {
//                 return a.Artists.firstName.localeCompare(b.Artists.firstName)
//             });
//         } else if (sortBy === "titleSortButton") {
//             sortedPaintings.sort((a, b) => a.title.localeCompare(b.title));
//         } else if (sortBy === "yearSortButton") {
//             sortedPaintings.sort((a, b) => b.yearOfWork - a.yearOfWork);
//         }

//         props.setGalleryPaintings(sortedPaintings);
//     };

//     return (
//         // Stuggling to fix the poitioning when the error image is used
//         <div>
//             <div className="flex h-screen overflow-hidden bg-sky-100">
//                 <div className="flex w-full max-w-screen-xl mx-auto gap-4 p-4">
//                     {/* Left Column - GenreList */}
//                     <div className="w-1/4">
//                         <GenreList update={props.clickedGenre} data={props.genres} />
//                     </div>

//                     {/* Middle + Right Column */}
//                     <div className="flex-1 flex flex-col gap-4">
//                         {/* Top Section - Genre Info */}
//                         <div className="bg-sky-200 rounded-lg p-4 shadow">
//                             {props.displayPaintings.length === 0 ? (
//                                 <div>
//                                     <h2 className="text-xl font-bold">No gallery selected.</h2>
//                                     <p>Please select a gallery to view its details.</p>
//                                     <p className="italic text-gray-600 mt-1">No map available.</p>
//                                 </div>
//                             ) : (
//                                 <GenreInfo data={displayGenre} />
//                             )}
//                         </div>

//                         {/* Bottom Section - Paintings */}
//                         <div className="bg-sky-200 rounded-lg p-4 shadow overflow-y-auto">
//                             <div className="flex justify-end gap-2 mb-2 text-sm">
//                                 <button name="artistSortButton" className="hover:text-blue-700">Sort by Artist</button>
//                                 <button name="titleSortButton" className="hover:text-blue-700">Sort by Title</button>
//                                 <button name="yearSortButton" className="hover:text-blue-700">Sort by Year</button>
//                             </div>
//                             <GenrePaintings data={displayPaintings} />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <PaintingsModal className="z-0" open={modalOpen} onClose={closeModal} painting={selectedPainting} />
//         </div>
//     )

// }

// export default GalleryPaintings;