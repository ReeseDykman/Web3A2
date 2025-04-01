


const GenreInfo = (props) => {
    console.log(props);


    return (
        props.data.length == 0 ? (
            <div>

            </div>

        ) : (
            <div className="flex text-white m-6  p-2 rounded bg-sky-500 flex-col border gap-4">
                <h1 className="text-2xl font-bold">{props.data.genreName}</h1>
                <p> Description: {props.data.description}</p>
            </div>

        )

    )



}
export default GenreInfo;