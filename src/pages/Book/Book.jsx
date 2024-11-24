import  { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [bookName, setBookName] = useState("");
  const [publicationYear, setPublicationYear] = useState("");
  const [stock, setStock] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [publisherId, setPublisherId] = useState("");
  const [categoryIds, setCategoryIds] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editingBook, setEditingBook] = useState(null);
  const API_URL = "https://prime-trude-sergenyaniklar-020c25b9.koyeb.app/api/v1/books";
  const AUTHOR_URL = "https://prime-trude-sergenyaniklar-020c25b9.koyeb.app/api/v1/authors";
  const PUBLISHER_URL = "https://prime-trude-sergenyaniklar-020c25b9.koyeb.app/api/v1/publishers";
  const CATEGORY_URL = "https://prime-trude-sergenyaniklar-020c25b9.koyeb.app/api/v1/categories";
  useEffect(() => {
    axios.get(API_URL).then((response) => setBooks(response.data));
    axios.get(AUTHOR_URL).then((response) => setAuthors(response.data));
    axios.get(PUBLISHER_URL).then((response) => setPublishers(response.data));
    axios.get(CATEGORY_URL).then((response) => setCategories(response.data));
  }, []);
  const handleAddBook = () => {
    if (!bookName || !publicationYear || !stock || !authorId || !publisherId || categoryIds.length === 0) {
      toast.error("Please fill in all fields before adding a book.");
      return;
    }
    const newBook = {
      name: bookName,
      publicationYear: Number(publicationYear),
      stock: Number(stock),
      author: { id: Number(authorId) },
      publisher: { id: Number(publisherId) },
      categories: categoryIds.map((id) => ({ id: Number(id) })),
    };

    axios
      .post(API_URL, newBook)
      .then((response) => {
        axios.get(`${API_URL}/${response.data.id}`).then((res) => {
          setBooks([...books, res.data]);
        });
        toast.success("Book added successfully!");
        resetForm();
      })
      .catch((error) => {
        toast.error("There was an error adding the book!");
        console.error(error);
      });
  };
  const handleEditBook = (book) => {
    setEditingBook(book);
    setBookName(book.name);
    setPublicationYear(book.publicationYear);
    setStock(book.stock);
    setAuthorId(book.author?.id || "");
    setPublisherId(book.publisher?.id || "");
    setCategoryIds(book.categories?.map((cat) => cat.id) || []);
  };
  const handleSaveEdit = () => {
    if (!bookName || !publicationYear || !stock || !authorId || !publisherId || categoryIds.length === 0) {
      toast.error("Please fill in all fields before saving changes.");
      return;
    }

    const updatedBook = {
      id: editingBook.id,
      name: bookName,
      publicationYear: Number(publicationYear),
      stock: Number(stock),
      author: { id: Number(authorId) },
      publisher: { id: Number(publisherId) },
      categories: categoryIds.map((id) => ({ id: Number(id) })),
    };

    axios
      .put(`${API_URL}/${editingBook.id}`, updatedBook)
      .then((response) => {
        setBooks(
          books.map((book) => (book.id === editingBook.id ? response.data : book))
        );
        toast.success("Book updated successfully!");
        resetForm();
      })
      .catch((error) => {
        toast.error("There was an error updating the book!");
        console.error(error);
      });
  };
  const handleDeleteBook = (id) => {
    axios
      .delete(`${API_URL}/${id}`)
      .then(() => {
        setBooks(books.filter((book) => book.id !== id));
        toast.success("Book deleted successfully!");
      })
      .catch((error) => {
        toast.error("There was an error deleting the book!");
        console.error(error);
      });
  };
  const resetForm = () => {
    setBookName("");
    setPublicationYear("");
    setStock("");
    setAuthorId("");
    setPublisherId("");
    setCategoryIds([]);
    setEditingBook(null);
  };

  return (
    <div className="books-container">
      <ToastContainer />
      <h2>Books Management</h2>
      <div className="book-form">
        <label>Book Name:</label>
        <input
          type="text"
          value={bookName}
          onChange={(e) => setBookName(e.target.value)}
          placeholder="Enter book name"
        />

        <label>Publication Year:</label>
        <input
          type="number"
          value={publicationYear}
          onChange={(e) => setPublicationYear(e.target.value)}
          placeholder="Enter publication year"
        />

        <label>Stock:</label>
        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          placeholder="Enter stock"
        />

        <label>Author:</label>
        <select value={authorId} onChange={(e) => setAuthorId(e.target.value)}>
          <option value="">Select an author</option>
          {authors.map((author) => (
            <option key={author.id} value={author.id}>
              {author.name}
            </option>
          ))}
        </select>

        <label>Publisher:</label>
        <select value={publisherId} onChange={(e) => setPublisherId(e.target.value)}>
          <option value="">Select a publisher</option>
          {publishers.map((publisher) => (
            <option key={publisher.id} value={publisher.id}>
              {publisher.name}
            </option>
          ))}
        </select>

        <label>Categories:</label>
        <select
          multiple
          value={categoryIds}
          onChange={(e) =>
            setCategoryIds([...e.target.selectedOptions].map((opt) => opt.value))
          }
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        {editingBook ? (
          <button onClick={handleSaveEdit}>Save Changes</button>
        ) : (
          <button onClick={handleAddBook}>Add Book</button>
        )}

        {editingBook && <button onClick={resetForm}>Cancel</button>}
      </div>

      {/* Kitaplar Listesi */}
      <h3>Books List:</h3>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <div className="book-info">
              <div>
                <strong>Name:</strong> {book.name}
              </div>
              <div>
                <strong>Publication Year:</strong> {book.publicationYear}
              </div>
              <div>
                <strong>Stock:</strong> {book.stock}
              </div>
              <div>
                <strong>Author:</strong> {book.author?.name}
              </div>
              <div>
                <strong>Publisher:</strong> {book.publisher?.name}
              </div>
              <div>
                <strong>Categories:</strong>{" "}
                {book.categories?.map((cat) => cat.name).join(", ")}
              </div>
            </div>
            <button onClick={() => handleEditBook(book)}>Edit</button>
            <button onClick={() => handleDeleteBook(book.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Books;
