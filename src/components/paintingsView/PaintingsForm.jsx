import React, { useState } from 'react';

const PaintingsForm = () => {

    const [radioSelection, setRadioSelection] = useState("title");
    const [title, setTitle] = useState("");
    const [artist, setArtist] = useState("");
    const [gallery, setGallery] = useState("");
    const [yearMin, setYearMin] = useState(0);
    const [yearMax, setYearMax] = useState(0);

    const resetForm = () => {
        setRadioSelection("title");
        setTitle("");
        setArtist("");
        setGallery("");
        setYearMin(0);
        setYearMax(0);
    }

    const handleRadioChange = (event) => {
        resetForm();
        setRadioSelection(event.target.value);
    }

    const handleReset = (event) => {
        event.preventDefault();
        resetForm();
    }

    const handleTextChange = (event) => {
        const { id, value } = event.target;
        switch (id) {
            case "title":
                setTitle(value);
                break;
            case "artist":
                setArtist(value);
                break;
            case "gallery":
                setGallery(value);
                break;
            case "year-min":
                setYearMin(value);
                break;
            case "year-max":
                setYearMax(value);
                break;
            default:
                break;
        }
    }

    return (
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-2xl font-bold mb-4">Painting Filters</h2>
            <div className="grid grid-cols-4 gap-4 items-center">
    
                <div className="flex items-center col-span-1">
                    <input checked={radioSelection==='title'} type="radio" id="titleRadio" name="filter" value="title" onChange={handleRadioChange} className="h-4 w-4 mr-2" />
                    <label htmlFor="titleRadio" className="text-gray-700">Title</label>
                </div>
                <input value={title} disabled={radioSelection != "title"} onChange={handleTextChange} type="text" id="title" className="disabled:bg-gray-500 disabled:opacity-7 border border-gray-300 rounded p-2 w-full col-span-3 " />

                
                <div className="flex items-center col-span-1">
                    <input type="radio" id="artistRadio" name="filter" value="artist" onChange={handleRadioChange} className="h-4 w-4 mr-2" />
                    <label htmlFor="artistRadio" className="text-gray-700">Artist</label>
                </div>
                <input value={artist} disabled={radioSelection != "artist"} onChange={handleTextChange} type="text" id="artist" className="disabled:bg-gray-500 disabled:opacity-7 border border-gray-300 rounded p-2 w-full col-span-3" />

                
                <div className="flex items-center col-span-1">
                    <input type="radio" id="galleryRadio" name="filter" value="gallery" onChange={handleRadioChange} className="h-4 w-4 mr-2" />
                    <label htmlFor="galleryRadio" className="text-gray-700">Gallery</label>
                </div>
                <input value={gallery} disabled={radioSelection != "gallery"} onChange={handleTextChange} type="text" id="gallery" className="disabled:bg-gray-500 disabled:opacity-7 border border-gray-300 rounded p-2 w-full col-span-3" />

                
                <div className="flex items-center col-span-1">
                    <input type="radio" id="yearRadio" name="filter" value="year" onChange={handleRadioChange} className="h-4 w-4 mr-2" />
                    <label htmlFor="yearRadio" className="text-gray-700">Year</label>
                </div>
                <div className="col-span-3 flex gap-2">
                    <input value={yearMin} disabled={radioSelection != "year"} onChange={handleTextChange} type="number" id="year-min" placeholder="Min" className="disabled:bg-gray-500 disabled:opacity-7 border border-gray-300 rounded p-2 w-full" />
                    <input value={yearMax} disabled={radioSelection != "year"} onChange={handleTextChange} type="number" id="year-max" placeholder="Max" className="disabled:bg-gray-500 disabled:opacity-7 border border-gray-300 rounded p-2 w-full" />
                </div>
            </div>
            <div className="flex flex-col mt-4">
                <button type="submit" className="bg-blue-500 hover:bg-blue-300 text-white rounded p-2 mt-4">Submit</button>
                <button onClick={handleReset} className="bg-gray-500 hover:bg-gray-300 text-white rounded p-2 mt-4">Reset</button>
            </div>
        </form>
    );
};

export default PaintingsForm;