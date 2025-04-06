// Developer: Christopher Nottingham
// Description: This component displays the genre information for the selected genre passed down with props in the Genre View.

const GenreInfo = (props) => {
    return (
        <div className="flex-3 bg-green-100 shadow-md rounded p-6 h-167 overflow-y-auto">
            {/* Conditional rendering for placeholder or genre details */}
            {!props.data ? (
                <div className="flex flex-col items-center gap-4 text-center">
                    <h1 className="text-2xl font-bold">A Genre Will Show Here</h1>
                    <p className="text-gray-500">Select a genre to get started!</p>
                </div>
            ) : (
                <div className="flex flex-col items-center gap-6 h-full">
                    {/* Genre name */}
                    <h1 className="text-3xl font-bold text-center">{props.data.genreName}</h1>

                    {/* Genre description */}
                    <p className="text-gray-600 text-center">{props.data.description}</p>
                </div>
            )}
        </div>
    );
};

// Exporting the GenreInfo component
export default GenreInfo;