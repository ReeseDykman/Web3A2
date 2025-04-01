const GenreListItem = (props) => {

    const handleClick = (e) => {

        props.update(props.data.genreId)
        

    }

    return (
        <li className="hover:text-white"><a onClick={handleClick}>{props.data.genreName}</a></li>
    )






}
export default GenreListItem;
