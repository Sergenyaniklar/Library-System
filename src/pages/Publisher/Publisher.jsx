import  { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "https://prime-trude-sergenyaniklar-020c25b9.koyeb.app/api/v1/publishers";

const Publisher = () => {
  const [publishers, setPublishers] = useState([]);
  const [newPublisher, setNewPublisher] = useState({ name: "", establishmentYear: "", address: "" });
  const [isEditing, setIsEditing] = useState(false);
  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => setPublishers(response.data))
      .catch((error) => console.error("Error fetching publishers:", error));
  }, []);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPublisher({ ...newPublisher, [name]: value });
  };
  const handleSavePublisher = () => {
    if (newPublisher.name && newPublisher.establishmentYear && newPublisher.address) {
      if (isEditing) {
        axios
          .put(`${API_URL}/${newPublisher.id}`, newPublisher)
          .then((response) => {
            setPublishers(
              publishers.map((publisher) =>
                publisher.id === newPublisher.id ? response.data : publisher
              )
            );
            toast.success("Publisher updated successfully!");
            setIsEditing(false);
          })
          .catch((error) => {
            toast.error("Error updating publisher!");
            console.error("Error updating publisher:", error);
          });
      } else {
        axios
          .post(API_URL, newPublisher)
          .then((response) => {
            setPublishers([...publishers, response.data]);
            toast.success("Publisher added successfully!");
          })
          .catch((error) => {
            toast.error("Error adding publisher!");
            console.error("Error adding publisher:", error);
          });
      }
      setNewPublisher({ name: "", establishmentYear: "", address: "" });
    } else {
      toast.error("Please fill in all fields.");
    }
  };
  const handleEdit = (publisher) => {
    setNewPublisher(publisher);
    setIsEditing(true);
  };
  const handleDelete = (id) => {
    axios
      .delete(`${API_URL}/${id}`)
      .then(() => {
        setPublishers(publishers.filter((publisher) => publisher.id !== id));
        toast.success("Publisher deleted successfully!");
      })
      .catch((error) => {
        toast.error("Error deleting publisher!");
        console.error("Error deleting publisher:", error);
      });
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <ToastContainer />
      <h2 style={{ textAlign: "center", color: "#333" }}>
        {isEditing ? "Edit Publisher" : "Add Publisher"}
      </h2>
      <div style={{ marginBottom: "20px" }}>
        <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
          Publisher Name
        </label>
        <input
          type="text"
          name="name"
          value={newPublisher.name}
          onChange={handleInputChange}
          placeholder="Publisher Name"
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
          Establishment Year
        </label>
        <input
          type="number"
          name="establishmentYear"
          value={newPublisher.establishmentYear}
          onChange={handleInputChange}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
          Address
        </label>
        <input
          type="text"
          name="address"
          value={newPublisher.address}
          onChange={handleInputChange}
          placeholder="Address"
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={handleSavePublisher}
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
          {isEditing ? "Update Publisher" : "Add Publisher"}
        </button>
      </div>
      <h3 style={{ textAlign: "center", color: "#333" }}>Publishers List:</h3>
      {publishers.length > 0 ? (
        <ul style={{ listStyle: "none", padding: "0" }}>
          {publishers.map((publisher) => (
            <li
              key={publisher.id}
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
                {publisher.id} - {publisher.name} - {publisher.establishmentYear} -{" "}
                {publisher.address}
              </span>
              <div>
                <button
                  onClick={() => handleEdit(publisher)}
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
                  onClick={() => handleDelete(publisher.id)}
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
        <p style={{ textAlign: "center", color: "#777" }}>No publishers found.</p>
      )}
    </div>
  );
};

export default Publisher;
