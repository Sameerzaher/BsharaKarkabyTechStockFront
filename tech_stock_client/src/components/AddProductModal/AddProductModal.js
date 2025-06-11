import React, { useState } from 'react';
import './AddProductModal.css';

const AddProductModal = ({
  showModal,
  setShowModal,
  handleAddProduct,
  handleChange,
  categories,
  suppliers
}) => {
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      handleChange(e);
    }
  };

  const handleClose = () => {
    setImagePreview(null);
    setShowModal(false);
  };

  if (!showModal) return null;

  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>📦 Add New Product</h3>
          <button 
            type="button" 
            className="close-button"
            onClick={handleClose}
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleAddProduct} className="product-form">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="name">📝 Product Name</label>
              <input 
                id="name"
                name="name" 
                onChange={handleChange} 
                placeholder="Enter product name" 
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">📄 Description</label>
              <textarea 
                id="description"
                name="description" 
                onChange={handleChange} 
                placeholder="Enter product description" 
                rows="3"
                required 
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="price">💰 Price ($)</label>
                <input 
                  id="price"
                  name="price" 
                  type="number" 
                  step="0.01"
                  min="0"
                  onChange={handleChange} 
                  placeholder="0.00" 
                  required 
                />
              </div>

              <div className="form-group">
                <label htmlFor="unit_in_stock">📊 Stock Quantity</label>
                <input 
                  id="unit_in_stock"
                  name="unit_in_stock" 
                  type="number" 
                  min="0"
                  onChange={handleChange} 
                  placeholder="0" 
                  required 
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="category_id">🏷️ Category</label>
                <select id="category_id" name="category_id" onChange={handleChange} required>
                  <option value="">Choose a category</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="supplier_id">🤝 Supplier</label>
                <select id="supplier_id" name="supplier_id" onChange={handleChange} required>
                  <option value="">Choose a supplier</option>
                  {suppliers.map((s) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group image-upload-group">
              <label htmlFor="image">📸 Product Image</label>
              <div className="image-upload-container">
                <input 
                  id="image"
                  name="image" 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageChange}
                  className="file-input"
                />
                <label htmlFor="image" className="file-input-label">
                  <span className="upload-icon">📁</span>
                  <span>Choose Image</span>
                </label>
              </div>
              
              {imagePreview && (
                <div className="image-preview">
                  <img src={imagePreview} alt="Product Preview" />
                  <button 
                    type="button" 
                    className="remove-image"
                    onClick={() => setImagePreview(null)}
                    aria-label="Remove image"
                  >
                    🗑️
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="modal-buttons">
            <button type="submit" className="submit-button">
              <span>✓</span>
              Add Product
            </button>
            <button type="button" className="cancel-button" onClick={handleClose}>
              <span>✕</span>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal; 