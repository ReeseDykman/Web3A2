import PaintingsTableRow from "./PaintingsTableRow.jsx";

const PaintingsTable = (props) => {

    const getOrder = (field) => {
        if(props.order.field === field && props.order.value === "asc") {
            return "↑"
        } else if (props.order.field === field && props.order.value === "desc") {
            return "↓"
        }
        return ""
    }

    return (
        <div className="h-full overflow-y-auto overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="p-5 text-center border border-gray-300">Thumbnail </th>
                        <th className="p-5 text-center border border-gray-300">Title {getOrder("Title")} </th>
                        <th className="p-5 text-center border border-gray-300">Artist {getOrder("Artist")} </th>
                        <th className="p-5 text-center border border-gray-300">Gallery {getOrder("Gallery")} </th>
                        <th className="p-5 text-center border border-gray-300">Year {getOrder("Year")} </th>
                        <th className="p-5 text-center border border-gray-300">Medium </th>
                        <th className="p-5 text-center border border-gray-300">Dimensions </th>
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