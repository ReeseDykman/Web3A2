const PaintingsToast = (props) => {
    return (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
            <div className="bg-yellow-400 text-black px-6 py-3 rounded shadow-lg text-lg font-medium">
                <p>{props.message}</p>
            </div>
        </div>
    );
};

export default PaintingsToast;