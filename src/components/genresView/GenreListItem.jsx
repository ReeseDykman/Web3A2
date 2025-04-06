// Developer: Christopher Nottingham
// Description: This component is used to display the list of genres in the Genre View sidebar.
const GenreListItem = (props) => {
    // Using the props passed down from the GenreList component to update the selected genre
    const handleClick = () => {
        props.update(props.data.genreId);
    };

    return (
        <li
            className="cursor-pointer p-3 bg-green-100 text-gray-800 shadow hover:bg-green-700 hover:text-white hover:shadow-md transition-all rounded-md"
            onClick={handleClick}
        >
            <span className="text-lg font-medium">{props.data.genreName}</span>
        </li>
    );
};

// Exporting the GenreListItem component
export default GenreListItem;