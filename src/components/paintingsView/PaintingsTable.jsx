import PaintingsTableRow from "./PaintingsTableRow.jsx";

const PaintingsTable = (props) => {
    return (
        <div className="h-full overflow-y-auto overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="p-5 text-center border border-gray-300">Thumbnail</th>
                        <th className="p-5 text-center border border-gray-300">Title</th>
                        <th className="p-5 text-center border border-gray-300">Artist</th>
                        <th className="p-5 text-center border border-gray-300">Year</th>
                        <th className="p-5 text-center border border-gray-300">Gallery</th>
                        <th className="p-5 text-center border border-gray-300">Medium</th>
                        <th className="p-5 text-center border border-gray-300">Dimensions</th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {props.paintings.map((painting) => (
                        <PaintingsTableRow key={painting.id} painting={painting} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PaintingsTable;