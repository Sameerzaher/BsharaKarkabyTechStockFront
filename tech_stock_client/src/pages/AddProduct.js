import React, { useState, useEffect } from 'react';
import axios from '../axios';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    unit_in_stock: '',
    supplier_id: '',
    category_id: '',
    image: null
  });

  const [suppliers, setSuppliers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [supRes, catRes] = await Promise.all([
          axios.get('/suppliers'),
          axios.get('/categories')
        ]);
        setSuppliers(supRes.data);
        setCategories(catRes.data);
      } catch (err) {
        setError('Failed to load suppliers or categories');
      }
    };
    fetchOptions();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });

      await axios.post('/products', data);
      alert('Product added successfully!');
    } catch (err) {
      setError('Failed to add product');
    }
  };

  return (
    <div className="form-container">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />

        <label>Description:</label>
        <textarea name="description" value={formData.description} onChange={handleChange} required />

        <label>Price:</label>
        <input type="number" name="price" value={formData.price} onChange={handleChange} required />

        <label>In Stock:</label>
        <input type="number" name="unit_in_stock" value={formData.unit_in_stock} onChange={handleChange} required />

        <label>Supplier:</label>
        <select name="supplier_id" value={formData.supplier_id} onChange={handleChange} required>
          <option value="">Select supplier</option>
          {suppliers.map((s) => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>

        <label>Category:</label>
        <select name="category_id" value={formData.category_id} onChange={handleChange} required>
          <option value="">Select category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>

        <label>Image:</label>
        <input type="file" name="image" accept="image/*" onChange={handleChange} required />

        {error && <p className="error">{error}</p>}

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
