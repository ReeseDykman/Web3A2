// Developer: Christopher Nottingham
// Description: This component is used to display the list of genres in the Genre View sidebar.
const GenreListItem = (props) => {
    // Using the props passed down from the GenreList component to update the selected genre
    // which will be brought up to the GenreView component
    const handleClick = () => {
        props.update(props.data.genreId)
    }
    return (
        // using the ordered list to display the genres
        <li className="hover:text-white">
           {/* Tag displays the genre name and if clicked will send the genre id to the genre info for handling */}
            <a onClick={handleClick}>{props.data.genreName}</a>
        </li>
    )
}
// Exporting the GenreListItem component
export default GenreListItem;
