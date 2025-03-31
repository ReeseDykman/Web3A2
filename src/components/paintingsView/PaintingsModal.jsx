
const PaintingsModal = (props) => {

    if(props.painting){
        return(
            // MODAL STYLING AND HELP FROM "YOUR CODE LAB" YOUTUBE: https://www.youtube.com/watch?v=dEGbXY-8YtU&ab_channel=YourCodeLab
            <div onClick={props.onClose} className={`flex justify-center items-center fixed inset-0 justify-center items-center transition-colors ${props.open ? "visible bg-black/20" : "invisible"}`}>
                <div onClick={(e) => e.stopPropagation} className={`container bg-white rounded-xl shadow p-6 transition-all ${props.open ? "scale-100 opacity-100" : "scale-235 opacity-0"}`}>
                    <div className="flex flex-row gap-4">
                        <img
                            src={`https://res.cloudinary.com/funwebdev/image/upload/h_100/art/paintings/${props.painting.imageFileName}.jpg`}
                            alt={props.painting.title}
                            className="w-32 h-32 object-cover"
                        />
                        <div className="flex flex-col gap-4">
                            <h1 className="text-2xl font-bold">{props.painting.title}</h1>
                            <p>{props.painting.description}</p>
                            <p>{props.painting.medium}</p>
                            <p>{`${props.painting.width} x ${props.painting.height}`}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    

}

export default PaintingsModal;