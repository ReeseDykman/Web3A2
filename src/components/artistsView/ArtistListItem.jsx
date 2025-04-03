
const ArtistListItem = (props) => {

    const artist = props.artist;
    const index = props.index;
    
    return(
        <li
            key={artist.artistId ? `${artist.artistId}Li` : `${index}Li`}
            className="cursor-pointer p-3 bg-white rounded shadow hover:bg-gray-100 hover:shadow-md transition-all"
            onClick={() => {
                props.handleArtistClick(artist);
            }}>

            <span key={artist.artistId ? `${artist.artistId}Span` : `${index}Span`} className="text-lg font-medium text-gray-800">
                {`${artist.firstName} ${artist.lastName}`}
            </span>
        </li>
    );
}

export default ArtistListItem;