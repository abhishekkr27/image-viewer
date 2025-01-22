import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SearchPage.css";
import "./loader";
const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const navigate = useNavigate();
  const API_KEY = "9NivgvXgBDe9L5cNBRQwcBOhWSbq3fgToaCu0DAlwcT4vRUdHWLQhGnL";
  const BASE_URL = "https://api.pexels.com/v1/search";

  const handleSearch = async () => {
    if (!query.trim()) {
      alert("Please enter a valid search query.");
      return;
    }
    try {
      const response = await axios.get(BASE_URL, {
        headers: { Authorization: API_KEY },
        params: { query, per_page: 12 },
      });
      setImages(response.data.photos);
    } catch (error) {
      console.error("Error fetching images:", error);
      alert("Failed to fetch images. Please try again later.");
    }
  };

  const handleEdit = (image) => {
    if (!image) {
      alert("Unable to edit image. Please try again.");
      return;
    }
    navigate("/edit", { state: { image } });
  };

  return (
    <div className="search-page">
      <div className="info">
      <h1>Name: Abhishek Kumar</h1>
      <h1>Email: abhishekrauniyar92@gmail.com</h1>
      </div>
      <h1 className="heading">Image Search App</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for images..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="results">
        {images.map((image) => (
          <div key={image.id} className="image-card">
            <img src={image.src.medium} alt={image.alt} />
            {/* I used the 'Edit Image' button instead of the 'Add Caption' button. When I click 'Edit', it takes me to the edit page where I intended to use the 'Add Caption' feature. */}
            <button onClick={() => handleEdit(image)}>Edit Image</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
