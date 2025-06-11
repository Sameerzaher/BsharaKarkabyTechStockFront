import React, { useState, useEffect } from 'react';
import './EditProductModal.css';

const EditProductModal = ({
  showModal,
  setShowModal,
  handleEditProduct,
  categories,
  suppliers,
  productToEdit
}) => {
  const [editProduct, setEditProduct] = useState({
    name: '',
    description: '',
    price: '',
    unit_in_stock: '',
    category_id: '',
    supplier_id: '',
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);

  useEffect(() => {
    if (productToEdit) {
      setEditProduct({
        name: productToEdit.name || '',
        description: productToEdit.description || '',
        price: productToEdit.price || '',
        unit_in_stock: productToEdit.unit_in_stock || '',
        category_id: productToEdit.category_id || '',
        supplier_id: productToEdit.supplier_id || '',
        image: null,
      });
      
      // Set current image if exists
      if (productToEdit.image) {
        setCurrentImage(`http://localhost:5000/${productToEdit.image}`);
      }
    }
  }, [productToEdit]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setEditProduct((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setCurrentImage(null); // Clear current image when new one is selected
      handleChange(e);
    }
  };

  const handleClose = () => {
    setImagePreview(null);
    setCurrentImage(null);
    setEditProduct({
      name: '',
      description: '',
      price: '',
      unit_in_stock: '',
      category_id: '',
      supplier_id: '',
      image: null,
    });
    setShowModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEditProduct(e, editProduct);
    handleClose();
  };

  if (!showModal || !productToEdit) return null;

  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>✏️ Edit Product</h3>
          <button 
            type="button" 
            className="close-button"
            onClick={handleClose}
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="edit-name">📝 Product Name</label>
              <input 
                id="edit-name"
                name="name" 
                value={editProduct.name}
                onChange={handleChange} 
                placeholder="Enter product name" 
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="edit-description">📄 Description</label>
              <textarea 
                id="edit-description"
                name="description" 
                value={editProduct.description}
                onChange={handleChange} 
                placeholder="Enter product description" 
                rows="3"
                required 
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="edit-price">💰 Price ($)</label>
                <input 
                  id="edit-price"
                  name="price" 
                  type="number" 
                  step="0.01"
                  min="0"
                  value={editProduct.price}
                  onChange={handleChange} 
                  placeholder="0.00" 
                  required 
                />
              </div>

              <div className="form-group">
                <label htmlFor="edit-stock">📊 Stock Quantity</label>
                <input 
                  id="edit-stock"
                  name="unit_in_stock" 
                  type="number" 
                  min="0"
                  value={editProduct.unit_in_stock}
                  onChange={handleChange} 
                  placeholder="0" 
                  required 
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="edit-category">🏷️ Category</label>
                <select 
                  id="edit-category" 
                  name="category_id" 
                  value={editProduct.category_id}
                  onChange={handleChange} 
                  required
                >
                  <option value="">Choose a category</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="edit-supplier">🤝 Supplier</label>
                <select 
                  id="edit-supplier" 
                  name="supplier_id" 
                  value={editProduct.supplier_id}
                  onChange={handleChange} 
                  required
                >
                  <option value="">Choose a supplier</option>
                  {suppliers.map((s) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group image-upload-group">
              <label htmlFor="edit-image">📸 Product Image</label>
              
              {/* Show current image if exists and no new image preview */}
              {currentImage && !imagePreview && (
                <div className="current-image">
                  <p className="current-image-label">Current Image:</p>
                  <img src={currentImage} alt="Current Product" />
                </div>
              )}
              
              <div className="image-upload-container">
                <input 
                  id="edit-image"
                  name="image" 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageChange}
                  className="file-input"
                />
                <label htmlFor="edit-image" className="file-input-label">
                  <span className="upload-icon">📁</span>
                  <span>{currentImage && !imagePreview ? 'Change Image' : 'Choose Image'}</span>
                </label>
              </div>
              
              {/* Show new image preview */}
              {imagePreview && (
                <div className="image-preview">
                  <p className="preview-label">New Image:</p>
                  <img src={imagePreview} alt="Product Preview" />
                  <button 
                    type="button" 
                    className="remove-image"
                    onClick={() => {
                      setImagePreview(null);
                      // Reset to current image if it exists
                      if (productToEdit.image) {
                        setCurrentImage(`http://localhost:5000/${productToEdit.image}`);
                      }
                      setEditProduct(prev => ({ ...prev, image: null }));
                    }}
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
              Save Changes
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

export default EditProductModal; 