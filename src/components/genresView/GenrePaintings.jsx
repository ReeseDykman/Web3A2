import { useState } from "react";

const GenrePaintings = (props) => {
  const [sortedPaintings, setSortedPaintings] = useState(props.data);

  const handleSort = (event) => {
    const sortBy = event.target.name;
    const sortedArray = [...props.data];

    if (sortBy === "artistSortButton") {
      sortedArray.sort((a, b) =>
        a.Artists.firstName.localeCompare(b.Artists.firstName)
      );
    } else if (sortBy === "titleSortButton") {
      sortedArray.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "yearSortButton") {
      sortedArray.sort((a, b) => b.yearOfWork - a.yearOfWork);
    }

    setSortedPaintings(sortedArray);
  };

  return (
    <div className="flex flex-col h-105"> {/* or h-full if you want max screen height */}
    {/* Fixed Header with Sort Buttons */}
    <div className="flex justify-between items-center p-2 bg-gray-100  sticky top-0">
      <h2 className="text-xl font-semibold text-gray-800">Paintings</h2>
      <div className="flex gap-4 text-sm text-black">
        <button
          onClick={handleSort}
          name="artistSortButton"
          className="hover:text-blue-600"
        >
          Sort by Artist
        </button>
        <button
          onClick={handleSort}
          name="titleSortButton"
          className="hover:text-blue-600"
        >
          Sort by Title
        </button>
        <button
          onClick={handleSort}
          name="yearSortButton"
          className="hover:text-blue-600"
        >
          Sort by Year
        </button>
      </div>
    </div>
  
    {/* Scrollable Table */}
    <div className="overflow-y-auto flex-1 border rounded">
      <table className="w-full table-auto border-collapse">
        <thead className="sticky top-0 bg-white shadow">
          <tr>
            <th className="px-4 py-2 text-left">Thumbnail</th>
            <th className="px-4 py-2 text-left">Title</th>
            <th className="px-4 py-2 text-left">Year</th>
            <th className="px-4 py-2 text-left">Artist</th>
          </tr>
        </thead>
        <tbody>
          {sortedPaintings.map((p) => (
            <tr key={p.paintingId} className="border-t hover:bg-gray-100">
              <td className="px-4 py-2">
                <img
                  src={`https://res.cloudinary.com/funwebdev/image/upload/h_75/art/paintings/square/${p.imageFileName}`}
                  alt={p.title}
                  className="w-16 h-16 object-cover rounded"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png";
                    e.target.alt = "Image not available";
                  }}
                />
              </td>
              <td className="px-4 py-2">{p.title}</td>
              <td className="px-4 py-2">{p.yearOfWork}</td>
              <td className="px-4 py-2">
                {p.Artists.firstName} {p.Artists.lastName}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  );
};

export default GenrePaintings;