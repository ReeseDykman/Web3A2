const GenreListItem = (props) => {

    const handleClick = (e) => {

        props.update(props.data.genreId)

    }

    return(
        <a onClick={handleClick}>{props.data.genreName}</a>
    )






}
export default GenreListItem;
