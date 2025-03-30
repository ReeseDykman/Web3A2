const GalleryListItem = (props) => {
    const handleClick = (e) => {
        props.update(props.data.galleryId)
    }

    return (
       <li className="hover:text-white"> <a onClick={handleClick}>{props.data.galleryName}</a> </li>
    )
}
export default GalleryListItem;