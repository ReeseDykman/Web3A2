const PaintingsTableRow = (props) => {
    return(
        <tr className="bg-white w-full h-full hover:bg-gray-100 hover:shadow-md transition duration-200">
            <td className="p-5 text-center">{props.painting.imageFileName}</td>
            <td className="p-5 text-center">{props.painting.title}</td>
            <td className="p-5 text-center">{props.painting.Artists.firstName + " " + props.painting.Artists.lastName}</td>
            <td className="p-5 text-center">{props.painting.yearOfWork}</td>
            <td className="p-5 text-center">{props.painting.Galleries.galleryName}</td>
            <td className="p-5 text-center">{props.painting.medium}</td>
            <td className="p-5 text-center">{props.painting.width + " x " + props.painting.height }</td>
        </tr>
    );
}

export default PaintingsTableRow;