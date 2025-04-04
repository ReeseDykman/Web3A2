const PaintingsTableRow = (props) => {
    const painting = props.painting;

    // Handle row click event
    const handleRowClick = () => {
        props.rowClick(painting);
    };

    return (
        <tr
            className="bg-green-200 w-full h-full hover:bg-green-800 hover:text-white hover:shadow-md transition duration-200"
            onClick={handleRowClick}
        >
            {/* Painting image */}
            <td className="p-5 text-center">
                <img
                    src={`art-images/paintings/square/${painting.imageFileName}.jpg`}
                    alt={painting.title}
                    onError={(e) => {
                        // Fallback for missing image
                        e.target.onerror = null;
                        e.target.src = "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png";
                        e.target.className = "w-16 h-16 object-cover";
                        e.target.alt = "Image not available";
                    }}
                    className="w-16 h-16 object-cover"
                />
            </td>
            {/* Title, name, YoW, gallery, medium, dimesions */}
            <td className="p-5 text-center">{painting.title}</td>
            <td className="p-5 text-center">
                {painting.Artists.firstName + " " + painting.Artists.lastName}
            </td>
            <td className="p-5 text-center">{painting.yearOfWork}</td>
            <td className="p-5 text-center">{painting.Galleries.galleryName}</td>
            <td className="p-5 text-center">{painting.medium}</td>
            <td className="p-5 text-center">
                {painting.width + " x " + painting.height}
            </td>
        </tr>
    );
};

export default PaintingsTableRow;