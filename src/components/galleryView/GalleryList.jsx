// Developer: Christopher Nottingham
// Description: This component is used to display the list of galleries in the Gallery View sidebar.
import GalleryListItem from "./GalleryListItem.jsx";
import { useContext } from "react";
import { GalleriesContext } from "../../App.jsx";


const GalleryList = (props) => {
    
    // Using context to access the galleries
    const { galleries } = useContext(GalleriesContext);
    
    //Sorting the gallereies by name
    const sortedGalleries = [...galleries].sort((a, b) => {
        return a.galleryName.localeCompare(b.galleryName);
    });


    return (
        // Container for the galleries list section
        <div className="w-1/3  mt-6 p-4 bg-sky-500 rounded-lg ">
            <h2 className="text-xl font-semibold mb-4">List of Galleries</h2>
            <ul className="space-y-2">
                {sortedGalleries.map(g => <GalleryListItem data={g} id={g.galleryId} key={g.galleryId} update={props.update} />)}
            </ul>
        </div>

    )

   

}
export default GalleryList;