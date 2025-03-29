import PaintingsForm from "./PaintingsForm";
import PaintingsList from "./PaintingsList";

const PaintingsView = () => {
    return (
        <section className="mx-auto p-4 flex flex-col md:flex-row gap-4 h-full w-full">
            {/* Paintings Form */}
            <div className="w-full md:w-1/4 bg-gray-100 shadow-md rounded p-4">
                <PaintingsForm />
            </div>

            {/* Paintings List */}
            <div className="flex-1 bg-gray-100 shadow-md rounded p-4 ">
                <PaintingsList />
            </div>
        </section>
    );
};

export default PaintingsView;