// Developer: Christopher Nottingham
// Description: This component displays the genre information for the selected genre passeed down with props in the Genre View.
const GenreInfo = (props) => {
    return (
        // Using the ternary operator to check if there is a genre selected
        // If there is no genre selected then display nothing
        // If there is a genre selected then display the genre info
        props.data.length == 0 ? (
            <div> </div>
        ) : (
            // Displaying the genre info if there is a genre selected 
            <div className="flex text-white m-6 p-2 rounded bg-sky-500 flex-col border gap-4">
                <h1 className="text-2xl font-bold">{props.data.genreName}</h1>
                <p> Description: {props.data.description}</p>
            </div>
        )
    )
}
// Exporting the GenreInfo component
export default GenreInfo;