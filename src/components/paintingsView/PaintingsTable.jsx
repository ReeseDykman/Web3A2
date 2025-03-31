import PaintingsTableRow from "./PaintingsTableRow.jsx";
import SortButton from "./SortButton.jsx";

const PaintingsTable = (props) => {

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
                                <SortButton row="Title" handleSort={props.handleSort} sort={props.sort} />
                            </div>
                        </th>
                        <th className="p-5 text-center border border-gray-300">
                            <div className="flex items-center justify-center gap-2">
                                <span>Artist</span>
                                <SortButton row="Artist" handleSort={props.handleSort} sort={props.sort} />
                            </div>
                        </th>
                        <th className="p-5 text-center border border-gray-300">
                            <div className="flex items-center justify-center gap-2">
                                <span>Year</span>
                                <SortButton row="Year" handleSort={props.handleSort} sort={props.sort} />
                            </div>
                        </th>
                        <th className="p-5 text-center border border-gray-300">
                            <div className="flex items-center justify-center gap-2">
                                <span>Gallery</span>
                                <SortButton row="Gallery" handleSort={props.handleSort} sort={props.sort} />
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