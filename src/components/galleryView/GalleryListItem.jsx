// Developer: Christopher Nottingham
// Description: This component is used to display the list of galleries in the Gallery View sidebar.
const GalleryListItem = (props) => {
    // If this list is clicked the function will be called and edit the galleryId that has been passed down.
    const handleClick = (e) => {
        // This will be used to update gallery id which will be processed in the gallery view and envoke the Gallery Info and Gallery Paintings.
        props.update(props.data.galleryId)
    }

    // Display the genre name and if clicked will send the genre id to the genre info for handling
    return (
        <li className="hover:text-white"> <a onClick={handleClick}>{props.data.galleryName}</a> </li>
    )
}

// Exporting the GalleryListItem component
export default GalleryListItem;