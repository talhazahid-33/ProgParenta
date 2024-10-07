import React, { useState } from "react";
import "./library.css";

const Library = () => {
  const [bookName, setBookName] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);

  const handleAdd = () => {
    // Handle Add functionality
    console.log("Added:", { bookName, category, file });
  };

  const handleEdit = () => {
    // Handle Edit functionality
    console.log("Edited:", { bookName, category, file });
  };

  const handleDelete = () => {
    // Handle Delete functionality
    console.log("Deleted");
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="library-container">
      <h2>Library</h2>
      <div className="form-group">
        <label>Book Name:</label>
        <input
          type="text"
          value={bookName}
          onChange={(e) => setBookName(e.target.value)}
          placeholder="Enter book name"
        />
      </div>
      <div className="form-group">
        <label>Category:</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Enter category"
        />
      </div>
      <div className="form-group">
        <label>Book file:</label>
        <input type="file" onChange={handleFileChange} />
      </div>
      <div className="button-group">
        <button onClick={handleAdd}>Add</button>
        <button onClick={handleEdit}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default Library;
