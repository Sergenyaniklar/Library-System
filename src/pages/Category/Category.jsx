import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [editCategoryId, setEditCategoryId] = useState(null);
  const API_URL = "https://prime-trude-sergenyaniklar-020c25b9.koyeb.app/api/v1/categories"; 
  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => setCategories(response.data))
      .catch((error) =>
        console.error("There was an error fetching the categories!", error)
      );
  }, []);
  const handleAddCategory = () => {
    if (!categoryName || !description) {
      toast.error("Please fill in all fields before adding a category.");
      return;
    }

    const newCategory = { name: categoryName, description: description };

    axios
      .post(API_URL, newCategory)
      .then((response) => {
        setCategories([...categories, response.data]);
        setCategoryName("");
        setDescription("");
        toast.success("Category added successfully!");
      })
      .catch((error) => {
        toast.error("There was an error adding the category!");
        console.error("There was an error adding the category!", error);
      });
  };
  const handleDeleteCategory = (id) => {
    axios
      .delete(`${API_URL}/${id}`)
      .then(() => {
        setCategories(categories.filter((category) => category.id !== id));
        toast.success("Category deleted successfully!");
      })
      .catch((error) => {
        toast.error("There was an error deleting the category!");
        console.error("There was an error deleting the category!", error);
      });
  };
  const handleEditCategory = () => {
    if (!categoryName || !description) {
      toast.error("Both fields are required for editing a category.");
      return;
    }
    const updatedCategory = { name: categoryName, description: description };
    axios
      .put(`${API_URL}/${editCategoryId}`, updatedCategory)
      .then(() => {
        setCategories(
          categories.map((category) =>
            category.id === editCategoryId
              ? { ...category, name: categoryName, description: description }
              : category
          )
        );
        setCategoryName("");
        setDescription("");
        setEditCategoryId(null);
        toast.success("Category updated successfully!");
      })
      .catch((error) => {
        toast.error("There was an error updating the category!");
        console.error("There was an error updating the category!", error);
      });
  };
  const handleStartEdit = (category) => {
    setCategoryName(category.name);
    setDescription(category.description);
    setEditCategoryId(category.id);
  };

  return (
    <div className="category-container">
      <ToastContainer />
      <h2>Category Management</h2>
      <div className="category-form">
        <label>Category Name:</label>
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="Enter category name"
        />
        <label>Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter category description"
        />
        <button onClick={editCategoryId ? handleEditCategory : handleAddCategory}>
          {editCategoryId ? "Update Category" : "Add Category"}
        </button>
      </div>
      <h3>Categories List:</h3>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            <div className="category-item">
              <span>
                <strong>{category.name}</strong> - {category.description}
              </span>
              <button
                className="edit-btn"
                onClick={() => handleStartEdit(category)}
              >
                Edit
              </button>
              <button
                className="delete-btn"
                onClick={() => handleDeleteCategory(category.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Category;
