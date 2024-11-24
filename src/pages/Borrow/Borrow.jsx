import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL= "https://prime-trude-sergenyaniklar-020c25b9.koyeb.app";
const Borrow = () => {
  const [yourName, setYourName] = useState("");
  const [email, setEmail] = useState("");
  const [borrowDate, setBorrowDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [selectedBook, setSelectedBook] = useState("");
  const [books, setBooks] = useState([]);
  const [borrowId, setBorrowId] = useState(null);
  const [borrowings, setBorrowings] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    axios
      .get(`${API_URL}/api/v1/books`)
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.error("Error loading books:", error);
        setErrorMessage("There was an error loading the books.");
      });

    axios
      .get(`${API_URL}/api/v1/borrows`)
      .then((response) => {
        setBorrowings(response.data);
      })
      .catch((error) => {
        console.error("Error loading borrowings:", error);
        setErrorMessage("An error occurred while loading borrowing records.");
      });
  }, []);
  const handleSaveBorrow = () => {
    if (!yourName || !email || !borrowDate || !returnDate || !selectedBook) {
      setErrorMessage("All fields are required.");
      return;
    }

    const data = {
      borrowerName: yourName,
      borrowerMail: email,
      borrowingDate: borrowDate,
      returnDate: returnDate,
      bookForBorrowingRequest: {
        id: selectedBook,
        name: "", 
        publicationYear: "",
        stock: "",
      },
    };

    const request = borrowId
      ? axios.put(`${API_URL}/api/v1/borrows/${borrowId}`, data)
      : axios.post(`${API_URL}/api/v1/borrows`, data);
    request
      .then((response) => {
        const updatedBorrowings = borrowId
          ? borrowings.map((borrowing) =>
              borrowing.id === borrowId ? response.data : borrowing
            )
          : [...borrowings, response.data];

        setBorrowings(updatedBorrowings);
        setYourName("");
        setEmail("");
        setBorrowDate("");
        setReturnDate("");
        setSelectedBook("");
        setBorrowId(null);

        toast.success(
          borrowId ? "Borrowing updated successfully!" : "Borrowing added successfully!"
        );
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage("An error occurred during the borrowing process.");
      });
  };
  const handleEditBorrow = (borrow) => {
    setYourName(borrow.borrowerName);
    setEmail(borrow.borrowerMail);
    setBorrowDate(borrow.borrowingDate);
    setReturnDate(borrow.returnDate);
    setSelectedBook(borrow.book.id);
    setBorrowId(borrow.id);
  };
  const handleDeleteBorrow = (id) => {
    axios
      .delete(`${API_URL}/api/v1/borrows/${id}`)
      .then(() => {
        setBorrowings(borrowings.filter((borrow) => borrow.id !== id));
        toast.success("Borrowing deleted successfully!");
      })
      .catch(() => {
        setErrorMessage("An error occurred while deleting the borrowing record.");
      });
  };
  const resetForm = () => {
    setYourName("");
    setEmail("");
    setBorrowDate("");
    setReturnDate("");
    setSelectedBook("");
    setBorrowId(null);
  };
  const renderedBorrowers = borrowings.map((borrow) => (
    <tr key={borrow.id}>
      <td>{borrow.borrowerName}</td>
      <td>{borrow.borrowerMail}</td>
      <td>{borrow.borrowingDate}</td>
      <td>{borrow.returnDate}</td>
      <td>{borrow.book ? borrow.book.name : "No book"}</td>
      <td>
        <button onClick={() => handleEditBorrow(borrow)}>Edit</button>
        <button onClick={() => handleDeleteBorrow(borrow.id)}>Delete</button>
      </td>
    </tr>
  ));

  return (
    <div className="borrow-container">
      <h2>Borrowing</h2>

      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <div className="borrow-form">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSaveBorrow();
          }}
        >
          <label>Your Name:</label>
          <input
            type="text"
            value={yourName}
            onChange={(e) => setYourName(e.target.value)}
          />

          <label>E-mail:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Borrow Date:</label>
          <input
            type="date"
            value={borrowDate}
            onChange={(e) => setBorrowDate(e.target.value)}
          />

          <label>Return Date:</label>
          <input
            type="date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
          />

          <label>Choose Book:</label>
          <select
            value={selectedBook}
            onChange={(e) => setSelectedBook(e.target.value)}
          >
            <option value="">-- Select Book --</option>
            {books.map((book) => (
              <option key={book.id} value={book.id}>
                {book.name}
              </option>
            ))}
          </select>

          <button type="submit">{borrowId ? "Update" : "Add"}</button>
          {borrowId && <button onClick={resetForm}>Cancel</button>}
        </form>
      </div>

      <h3>Borrow List:</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>E-mail</th>
            <th>Borrow Date</th>
            <th>Return Date</th>
            <th>Book</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{renderedBorrowers}</tbody>
      </table>

      <ToastContainer />
    </div>
  );
};

export default Borrow;
