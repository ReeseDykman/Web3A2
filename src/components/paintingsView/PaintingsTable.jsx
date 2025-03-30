import PaintingsTableRow from "./PaintingsTableRow.jsx";
import SortButton from "./SortButton.jsx";

const PaintingsTable = (props) => {
    const getSort = (field) => {
        if (props.sort.field === field) {
            return (
                <SortButton field={field} handleSort={props.handleOrder} order={props.sort} />
            );
        }
    };

    return (
        <div className="h-full overflow-y-auto overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="p-5 text-center border border-gray-300">
                            <span>Thumbnail</span>
                        </th>
                        <th className="p-5 text-center border border-gray-300">
                            <div className="flex items-center justify-center gap-2">
                                <span>Title</span>
                                {getSort("Title")}
                            </div>
                        </th>
                        <th className="p-5 text-center border border-gray-300">
                            <div className="flex items-center justify-center gap-2">
                                <span>Artist</span>
                                {getSort("Artist")}
                            </div>
                        </th>
                        <th className="p-5 text-center border border-gray-300">
                            <div className="flex items-center justify-center gap-2">
                                <span>Gallery</span>
                                {getSort("Gallery")}
                            </div>
                        </th>
                        <th className="p-5 text-center border border-gray-300">
                            <div className="flex items-center justify-center gap-2">
                                <span>Year</span>
                                {getSort("Year")}
                            </div>
                        </th>
                        <th className="p-5 text-center border border-gray-300">Medium</th>
                        <th className="p-5 text-center border border-gray-300">Dimensions</th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {props.paintings.map((painting, index) => (
                        <PaintingsTableRow key={painting.id || index} painting={painting} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PaintingsTable;