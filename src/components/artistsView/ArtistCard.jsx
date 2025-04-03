
const ArtistCard = (props) => {
    const selectedArtist = props.selectedArtist;

    return(
        <div className="flex-3 bg-gray-100 shadow-md rounded p-4">
            {!selectedArtist && (
                <div className="flex flex-col gap-4">
                    <h1 className="text-2xl font-bold">An Artist Will Show Here</h1>
                    <p className="text-gray-500">Select an artist to get started!</p>
                </div>
            )}
            {selectedArtist && (
                <div className="flex flex-col gap-4">
                    <h1 className="text-2xl font-bold">{`${selectedArtist.firstName} ${selectedArtist.lastName}`}</h1>
                    <p className="text-gray-500">{selectedArtist.details}</p>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={ () => props.handleBackButton() }>Back</button>
                </div>
            )}
            
        </div>
    )
} 

export default ArtistCard;