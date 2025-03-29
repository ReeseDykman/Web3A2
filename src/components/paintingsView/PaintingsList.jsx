const PaintingsList = (props) => {
    return (
        <div className="h-157 overflow-y-auto bg-gray-100 p-4 rounded">
            {props.paintings.map((painting) => (
                <div key={painting.id} className="bg-white shadow-md rounded p-4 mb-4">
                    <h2 className="text-xl font-bold">{painting.title}</h2>
                    <p className="text-gray-700">{painting.artist}</p>
                    <p className="text-gray-500">{painting.year}</p>
                </div>
            ))}
        </div>
    );
};

export default PaintingsList;