const GalleryListItem = (props) => {
    const handleClick = (e) => {
        
        props.update(props.data.galleryId)
        

    }

    return (
        <a onClick={handleClick}>{props.data.galleryName}</a>
    )
}
export default GalleryListItem;