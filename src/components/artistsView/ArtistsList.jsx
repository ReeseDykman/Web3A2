import { useContext, useState } from "react";
import { ArtistsContext } from "../../App.jsx";
import ArtistListItem from "./ArtistListItem.jsx";

const ArtistsList = (props) => {

    const { artists } = useContext(ArtistsContext);
    const [artistSearch, setArtistSearch] = useState(artists);

    const handleSearch = (e) => {
        const searchTerm = e.target.value;
        if(searchTerm === ""){
            setArtistSearch(artists);
            return;
        }
        const filteredArtists = artists.filter((artist) => artist.firstName.toLowerCase().startsWith(searchTerm.toLowerCase()) || artist.lastName.toLowerCase().startsWith(searchTerm.toLowerCase()));
        setArtistSearch(filteredArtists);
    }

    return (
        <div className="flex-1 bg-gray-100 shadow-md rounded p-4 h-167 overflow-hidden">
            <input onChange={handleSearch} type="text" placeholder="Search for an artist..." className="w-full p-2 border border-gray-300 rounded mb-4" />
            <ul className="list-none space-y-2 overflow-y-auto h-full">
                {artistSearch.map((artist, index) => (
                    <ArtistListItem key={artist.artistId ? `${artist.artistId}Li` : `${index}Li`} artist={artist} index={index} handleArtistClick={props.handleArtistClick} />
                ))}
            </ul>
        </div>
    );

}

export default ArtistsList;