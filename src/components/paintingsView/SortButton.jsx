import sortDown from "../../assets/sort-down-solid.svg";
import sortUp from "../../assets/sort-up-solid.svg";

const SortButton = (props) => {
    const handleClick = () => {
        const newValue = props.value === "asc" ? "desc" : "asc";
        props.handleSort({ field: props.field, value: newValue });
    };

    return (
        <img
            src={props.order.value === "asc" ? sortUp : sortDown}
            alt={props.order.value === "asc" ? "Sort Ascending" : "Sort Descending"}
            className="w-4 h-4 cursor-pointer"
            onClick={handleClick}
        />
    );

}

export default SortButton;