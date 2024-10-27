const pool = require("./db");

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "Uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});
const documentFileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Invalid file type. Please upload  PDF, Word, or Excel document."
      ),
      false
    );
  }
};

const uploadDocument = multer({
  storage: storage,
  fileFilter: documentFileFilter,
}).single("file");

exports.uploadDocument = (req, res) => {
  uploadDocument(req, res, function (err) {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: err.message });
    }
    if (!req.file) {
      return res
        .status(400)
        .json({ error: "Please provide a document to upload." });
    }
    const filePath = req.file.path;
    res.status(200).json({
      message: "Document uploaded successfully",
      filePath: filePath,
    });
  });
};

exports.addBook = async (req, res) => {
  const { bookname, category, book_url } = req.body;

  if (!bookname || !category || !book_url) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const query = `
        INSERT INTO public.library (bookname, category, book_url)
        VALUES ($1, $2, $3) RETURNING *;
      `;
    const values = [bookname, category, book_url];
    const result = await pool.query(query, values);

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getBooks = async (req, res) => {
  try {
    const query = "SELECT * FROM public.library";
    const result = await pool.query(query);

    if (result.rows.length > 0) {
      res.status(200).json(result.rows);
    } else {
      res.status(404).json({ message: "No books found" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

exports.deleteBook = async (req, res) => {
    const { book_id } = req.body; 
    console.log("delete",req.body);
    
    try {
      const query = "DELETE FROM public.library WHERE book_id = $1"; 
      const result = await pool.query(query, [book_id]);
  
      if (result.rowCount > 0) {
        res.status(200).json({ message: "Book deleted successfully." });
      } else {
        res.status(404).json({ message: "Book not found." });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: "Server error" });
    }
  };
  
