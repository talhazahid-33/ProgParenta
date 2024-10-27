import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./library.css";
import BookTable from "./BookTable";

const Library = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("auth") !== "true") {
      navigate("/Login");
    } else {
      localStorage.setItem("intendedPage", "/Library");
    }
  }, []);

  const [books, setBooks] = useState([]);
  const [bookName, setBookName] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);

  const getBooks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/getBooks"); 
      if (response.status === 200) {
        //console.log("Books:", response.data);
        setBooks(response.data);
      } else {
        console.log("No books found");
      }
    } catch (err) {
      console.error("Error fetching books:", err);
    }
  };

  useEffect(() => {
    getBooks();
  }, []); 

  const handleEdit = () => {
    console.log("Edited:", { bookName, category, file });
  };

  const handleDelete = (index) => {
    console.log("Deleted");
    const updatedBooks = books.filter((_, i) => i !== index);
    setBooks(updatedBooks);
    deleteBook(books[index].book_id);
  };

  const deleteBook = async (book_id) => {
    try {
      const response = await axios.post(`http://localhost:5000/deleteBook`,{book_id:book_id});
      if (response.status === 200) {
        console.log("Book deleted:", response.data.message);
      } else {
        console.log("Failed to delete book.");
      }
    } catch (err) {
      console.error("Error deleting book:", err);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await axios.post(
        "http://localhost:5000/uploadBook",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data.filePath;
    } catch (error) {
      console.log("Error uploading file: " + error.message);
    }
  };

  const addBook = async () => {
    if(bookName ==="" || category===""||file==null){
      alert("Fill All Data ");
      return;
    }
    const path = await uploadFile(file);
    try {
      const response = await axios.post("http://localhost:5000/addBook", {
        bookname: bookName,
        category: category,
        book_url: path,
      });

      if (response.status === 201) {
        console.log("Book added successfully:", response.data);
        setBooks((prevBooks) => [...prevBooks, response.data]);

        alert("Book Added Successfully");
        setCategory("");
        setBookName("");
        setFile(null);
      } else {
        console.log("Failed to add the book.");
      }
    } catch (error) {
      console.error("Error adding the book:", error);
    }
  };

  return (
    <div>
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
          <button onClick={addBook}>Add</button>
        </div>
      </div>
      <BookTable books={books} deleteBook={handleDelete} />
    </div>
  );
};

export default Library;
