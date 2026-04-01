import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { user, isAuthenticated, loading } = useAuth();
  const [dishes, setDishes] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    category: '',
    price: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const fetchDishes = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/api/v1/dish/getall`);
      setDishes(data.dishes);
    } catch (error) {
      toast.error('Failed to fetch dishes');
    }
  };

  useEffect(() => {
    fetchDishes();
  }, []);

  if (loading) return null;
  if (!isAuthenticated || user.role !== 'admin') {
    return <Navigate to="/login" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        const { data } = await axios.put(
          `${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/api/v1/dish/update/${editId}`,
          formData,
          { withCredentials: true }
        );
        toast.success(data.message);
      } else {
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/api/v1/dish/add`,
          formData,
          { withCredentials: true }
        );
        toast.success(data.message);
      }
      setFormData({
        title: '',
        description: '',
        image: '',
        category: '',
        price: '',
      });
      setIsEditing(false);
      fetchDishes();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleEdit = (dish) => {
    setFormData({
      title: dish.title,
      description: dish.description,
      image: dish.image,
      category: dish.category,
      price: dish.price,
    });
    setIsEditing(true);
    setEditId(dish._id);
    window.scrollTo(0, 0);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this dish?')) {
      try {
        const { data } = await axios.delete(
          `${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/api/v1/dish/delete/${id}`,
          { withCredentials: true }
        );
        toast.success(data.message);
        fetchDishes();
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <section className="dashboard">
      <div className="container">
        <h1>Admin Dashboard</h1>
        <div className="form_section">
          <h2>{isEditing ? 'Edit Dish' : 'Add New Dish'}</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Price (e.g. ₹499)"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Image URL"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              required
            />
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            ></textarea>
            <button type="submit">{isEditing ? 'Update Dish' : 'Add Dish'}</button>
            {isEditing && (
              <button
                type="button"
                className="cancel_btn"
                onClick={() => {
                  setIsEditing(false);
                  setFormData({ title: '', description: '', image: '', category: '', price: '' });
                }}
              >
                Cancel
              </button>
            )}
          </form>
        </div>

        <div className="dishes_section">
          <h2>Manage Menu</h2>
          <div className="dashboard_grid">
            {dishes.map((dish) => (
              <div key={dish._id} className="dashboard_card">
                <img src={dish.image} alt={dish.title} />
                <div className="info">
                  <h3>{dish.title}</h3>
                  <p>{dish.price}</p>
                  <p className="category">{dish.category}</p>
                </div>
                <div className="actions">
                  <button onClick={() => handleEdit(dish)} className="edit_btn">Edit</button>
                  <button onClick={() => handleDelete(dish._id)} className="delete_btn">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
