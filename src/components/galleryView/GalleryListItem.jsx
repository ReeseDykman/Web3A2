const GalleryListItem = (props) => {
    const gallery = props.data;
    const index = props.index;

    return (
        <li
            key={gallery.galleryId ? `${gallery.galleryId}Li` : `${index}Li`}
            className="cursor-pointer p-3 bg-green-100 w-full text-gray-800 shadow hover:bg-green-700 hover:text-white hover:shadow-md transition-all"
            onClick={() => {
                props.update(gallery.galleryId);
            }}
        >
            <span
                key={gallery.galleryId ? `${gallery.galleryId}Span` : `${index}Span`}
                className="text-lg font-medium"
            >
                {gallery.galleryName}
            </span>
        </li>
    );
};

// Exporting the GalleryListItem component
export default GalleryListItem;