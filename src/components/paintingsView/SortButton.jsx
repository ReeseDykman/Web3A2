import sortDownSelected from "../../assets/sort-down-selected.svg";
import sortDown from "../../assets/sort-down-solid.svg";
import sortUpSelected from "../../assets/sort-up-selected.svg";

const SortButton = (props) => {
    const handleClick = () => {
        // Flips from ascending to descending and vice versa
        const newValue = props.sort.value === "asc" ? "desc" : "asc";
        props.handleSort({ field: props.row, value: newValue });
    };

    let imageSrc;
    let altText;

    if (props.sort.field === props.row) {
        // If the field is selected
        if (props.sort.value === "asc") {
            imageSrc = sortUpSelected;
            altText = "Sort Ascending (Selected)";
        } else {
            imageSrc = sortDownSelected;
            altText = "Sort Descending (Selected)";
        }
    } else {
        // If the field is not selected
        imageSrc = sortDown;
        altText = "Sort";
    }

    return (
        <img
            src={imageSrc}
            alt={altText}
            className="w-4 h-4 cursor-pointer"
            onClick={handleClick}
        />
    );
};

export default SortButton;