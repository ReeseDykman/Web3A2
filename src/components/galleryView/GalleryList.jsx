import GalleryListItem from "./GalleryListItem.jsx";

import { useContext } from "react";
import { GalleriesContext } from "../../App.jsx";



const GalleryList = (props) => {
    const { galleries } = useContext(GalleriesContext);

    //Sort the gallereies by name

    galleries.sort((a, b) => {
        if (a.galleryName > b.galleryName) {
            return 1;
        }
        if (b.galleryName > a.galleryName) {
            return -1;
        }
        return 0;
    });


    return (

        <div className="w-1/3 border mt-6 p-4 bg-sky-500 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">List of Galleries</h2>
            <ul className="space-y-2">
                {galleries.map(g => <GalleryListItem data={g} id={g.galleryId} key={g.galleryId} update={props.update} />)}
            </ul>
        </div>

    )

   

}
export default GalleryList;