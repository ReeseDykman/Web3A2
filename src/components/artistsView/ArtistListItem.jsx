const ArtistListItem = (props) => {
    const artist = props.artist;
    const index = props.index;

    return (
        <li
            key={artist.artistId ? `${artist.artistId}Li` : `${index}Li`}
            className="cursor-pointer p-3 bg-green-100 w-full text-gray-800 shadow hover:bg-green-700 hover:text-white hover:shadow-md transition-all"
            onClick={() => {
                props.handleArtistClick(artist);
            }}
        >
            <span
                key={artist.artistId ? `${artist.artistId}Span` : `${index}Span`}
                className="text-lg font-medium"
            >
                {`${artist.firstName} ${artist.lastName}`}
            </span>
        </li>
    );
};

export default ArtistListItem;