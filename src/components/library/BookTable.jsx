import React, { useEffect, useState } from "react";
import "../attandance/attandance.css"
const BookTable = ({books,deleteBook}) => {
 




  const handleDelete = (index) => {
    deleteBook(index);
  };


  const tableContainerStyle = {
    maxHeight: "300px", // Set the maximum height
    overflowY: "auto",  // Enable vertical scrolling
    border: "1px solid #ccc", // Optional: Add a border to the container
    padding: "10px",    // Optional: Add some padding
    marginTop: "20px",  // Optional: Add some margin to separate from other elements
  };

  return (
    <div style={tableContainerStyle}>
      <table  className="attendance-table">
        <thead>
          <tr>
            <th>Book Name</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={index}>
              <td>
                <a href={`http://localhost:5000/${book.book_url}`} target="_blank" rel="noopener noreferrer">
                  {book.bookname}
                </a>
              </td>
              <td>{book.category}</td>
              <td>
                <button className="btn btn-danger" onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookTable;
