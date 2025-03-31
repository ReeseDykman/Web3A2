import React, { useState, useContext } from 'react';
import Filter from '../../scripts/filterFactory';
import { ArtistsContext } from '../../App';
import { GalleriesContext } from '../../App';

const PaintingsForm = (props) => {

    const {galleries} = useContext(GalleriesContext);
    const {artists} = useContext(ArtistsContext);
    const [radioSelection, setRadioSelection] = useState("title");
    const [title, setTitle] = useState("");
    const [artist, setArtist] = useState("");
    const [gallery, setGallery] = useState("");
    const [yearMin, setYearMin] = useState(0);
    const [yearMax, setYearMax] = useState(0);

    //reset is used for both changing the radio input and reset
    const resetForm = () => {
        setTitle("");
        setArtist("");
        setGallery("");
        setYearMin(0);
        setYearMax(0);
        props.handleReset();
    }

    const handleRadioChange = (event) => {
        const newSelection = event.target.value;
        setRadioSelection(newSelection); 
    }

    const handleReset = (event) => {
        event.preventDefault();
        resetForm("title");
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

    const handleSubmit = (event) => {
        event.preventDefault();
    
        let selectedValue;
    
        // Determine the value based on the selected radio button
        switch (radioSelection) {
            case "title":
                selectedValue = title;
                break;
            case "artist":
                selectedValue = artist;
                break;
            case "gallery":
                selectedValue = gallery;
                break;
            case "year":
                selectedValue = [yearMin, yearMax]; // Use an array for range values
                break;
            default:
                selectedValue = null;
                break;
        }
    
        const filter = new Filter(radioSelection, selectedValue);
    
        // Pass the filter to the parent component
        props.handleFilter(filter);
    
        console.log("Filters submitted:", filter);
    };

    return (
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
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
                <select value={artist} disabled={radioSelection != "artist"} onChange={handleTextChange} type="text" id="artist" className="disabled:bg-gray-500 disabled:opacity-7 border border-gray-300 rounded p-2 w-full col-span-3">
                    <option disabled={artist != ""}>Select an artist</option>
                    {artists.map((artist) => (
                        <option key={`${artist.artistId}Select`} value={`${artist.firstName} ${artist.lastName}`}>
                            {`${artist.firstName} ${artist.lastName}`}
                        </option>
                    ))}
                </select>

                
                <div className="flex items-center col-span-1">
                    <input type="radio" id="galleryRadio" name="filter" value="gallery" onChange={handleRadioChange} className="h-4 w-4 mr-2" />
                    <label htmlFor="galleryRadio" className="text-gray-700">Gallery</label>
                </div>
                <select value={gallery} disabled={radioSelection != "gallery"} onChange={handleTextChange} type="text" id="gallery" className="disabled:bg-gray-500 disabled:opacity-7 border border-gray-300 rounded p-2 w-full col-span-3" >
                    <option disabled={gallery != ""}>Select a gallery</option>
                    {galleries.map((gallery) => (
                        <option key={`${gallery.galleryId}Select`} value={gallery.galleryName}>
                            {gallery.galleryName}
                        </option>
                    ))}
                </select>

                
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