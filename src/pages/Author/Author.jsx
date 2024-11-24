import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "https://prime-trude-sergenyaniklar-020c25b9.koyeb.app/api/v1/authors";

const Author = () => {
  const [authors, setAuthors] = useState([]);
  const [newAuthor, setNewAuthor] = useState({ name: "", birthDate: "", country: "" });
  const [editingAuthorId, setEditingAuthorId] = useState(null);

  // Sayfa yüklendiğinde yazarları al
  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        // Eğer response.data bir array ise yazarları ayarla
        if (Array.isArray(response.data)) {
          setAuthors(response.data);
        } else {
          console.error("Invalid authors data:", response.data);
        }
      })
      .catch((error) => {
        toast.error("Error fetching authors!");
        console.error("Error fetching authors:", error);
      });
  }, []);

  // Input alanındaki değişiklikleri yönetir
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAuthor({ ...newAuthor, [name]: value });
  };

  // Yazar ekle veya düzenle
  const handleAddOrEditAuthor = () => {
    if (newAuthor.name && newAuthor.birthDate && newAuthor.country) {
      if (editingAuthorId) {
        // Yazarı düzenle
        axios
          .put(`${API_URL}/${editingAuthorId}`, newAuthor)
          .then((response) => {
            setAuthors(authors.map((author) => (author.id === editingAuthorId ? response.data : author)));
            setNewAuthor({ name: "", birthDate: "", country: "" });
            setEditingAuthorId(null); // Düzenleme sonrası id sıfırlama
            toast.success("Author updated successfully!");
          })
          .catch((error) => {
            toast.error("Error updating author!");
            console.error("Error updating author:", error);
          });
      } else {
        // Yeni yazar ekle
        axios
          .post(API_URL, newAuthor)
          .then((response) => {
            setAuthors([...authors, response.data]);
            setNewAuthor({ name: "", birthDate: "", country: "" });
            toast.success("Author added successfully!");
          })
          .catch((error) => {
            toast.error("Error adding author!");
            console.error("Error adding author:", error);
          });
      }
    } else {
      toast.error("Please fill in all fields.");
    }
  };

  // Yazarı sil
  const handleDelete = (id) => {
    axios
      .delete(`${API_URL}/${id}`)
      .then(() => {
        setAuthors(authors.filter((author) => author.id !== id));
        toast.success("Author deleted successfully!");
      })
      .catch((error) => {
        toast.error("Error deleting author!");
        console.error("Error deleting author:", error);
      });
  };

  // Yazarı düzenlemeye başla
  const handleEdit = (id) => {
    const authorToEdit = authors.find((author) => author.id === id);
    if (authorToEdit) {
      setNewAuthor({
        name: authorToEdit.name,
        birthDate: authorToEdit.birthDate,
        country: authorToEdit.country,
      });
      setEditingAuthorId(id);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <ToastContainer />
      <h2 style={{ textAlign: "center", color: "#333" }}>
        {editingAuthorId ? "Edit Author" : "Add Author"}
      </h2>
      <div style={{ marginBottom: "20px" }}>
        <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Author Name</label>
        <input
          type="text"
          name="name"
          value={newAuthor.name}
          onChange={handleInputChange}
          placeholder="Author Name"
          style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Birth Date</label>
        <input
          type="date"
          name="birthDate"
          value={newAuthor.birthDate}
          onChange={handleInputChange}
          style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Country</label>
        <input
          type="text"
          name="country"
          value={newAuthor.country}
          onChange={handleInputChange}
          placeholder="Country"
          style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <button
          onClick={handleAddOrEditAuthor}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {editingAuthorId ? "Update Author" : "Add Author"}
        </button>
      </div>
      <h3 style={{ textAlign: "center", color: "#333" }}>Authors List:</h3>
      {authors.length > 0 ? (
        <ul style={{ listStyle: "none", padding: "0" }}>
          {authors.map((author) => (
            <li
              key={author.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#f8f9fa",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "5px",
                border: "1px solid #ddd",
              }}
            >
              <span>
                {author.id} - {author.name} - {author.birthDate} - {author.country}
              </span>
              <div>
                <button
                  onClick={() => handleEdit(author.id)}
                  style={{
                    marginRight: "10px",
                    padding: "5px 10px",
                    backgroundColor: "#ffc107",
                    border: "none",
                    borderRadius: "5px",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(author.id)}
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "#dc3545",
                    border: "none",
                    borderRadius: "5px",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ textAlign: "center", color: "#777" }}>No authors found.</p>
      )}
    </div>
  );
};

export default Author;
