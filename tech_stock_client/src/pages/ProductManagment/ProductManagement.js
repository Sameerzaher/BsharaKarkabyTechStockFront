import React, { useEffect, useState } from 'react';
import axios from '../../axios';
import { useNavigate } from 'react-router-dom';
import AddProductModal from '../../components/AddProductModal/AddProductModal';
import EditProductModal from '../../components/EditProductModal/EditProductModal';
import './ProductManagement.css';
const ProductManagement = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    unit_in_stock: '',
    category_id: '',
    supplier_id: '',
    image: null,
  });
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
    } else {
      fetchProducts();
      fetchOptions();
    }
  }, [navigate]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('/products');
      setProducts(res.data);
    } catch (err) {
      console.error('Failed to load products', err);
    }
  };

  const fetchOptions = async () => {
    try {
      const [catRes, supRes] = await Promise.all([
        axios.get('/categories'),
        axios.get('/suppliers'),
      ]);
      setCategories(catRes.data);
      setSuppliers(supRes.data);
    } catch (err) {
      console.error('Failed to load categories/suppliers', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await axios.delete(`/products/${id}`);
      setProducts(products.filter((p) => p.id !== id));
    } catch (err) {
      console.error('Failed to delete product', err);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let key in newProduct) {
      formData.append(key, newProduct[key]);
    }

    try {
      const res = await axios.post('/products', formData);
      setProducts([...products, { id: res.data.id, ...newProduct }]);
      setShowModal(false);
      setNewProduct({
        name: '',
        description: '',
        price: '',
        unit_in_stock: '',
        category_id: '',
        supplier_id: '',
        image: null,
      });
    } catch (err) {
      console.error('Failed to add product', err);
    }
  };

  const handleEditClick = (product) => {
    setProductToEdit(product);
    setShowEditModal(true);
  };

  const handleEditProduct = async (e, editedProduct) => {
    e.preventDefault();
    const formData = new FormData();
    
    // Add all fields to formData
    for (let key in editedProduct) {
      if (editedProduct[key] !== null && editedProduct[key] !== '') {
        formData.append(key, editedProduct[key]);
      }
    }

    try {
      await axios.put(`/products/${productToEdit.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      // Refresh products list
      fetchProducts();
      setShowEditModal(false);
      setProductToEdit(null);
    } catch (err) {
      console.error('Failed to update product', err);
    }
  };

  return (
    <div className="product-management">
      <h2>Product Management</h2>
      <button onClick={() => setShowModal(true)}>➕ Add Product</button>

      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <table className="product-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>
                  {p.image ? (
                    <img
                      src={`http://localhost:5000/${p.image}`}
                      alt={p.name}
                      style={{ height: '60px', width: '60px', objectFit: 'cover', borderRadius: '4px' }}
                    />
                  ) : 'No Image'}
                </td>
                <td>{p.name}</td>
                <td>{p.description}</td>
                <td>${p.price}</td>
                <td>{p.unit_in_stock}</td>
                <td>
                  <button onClick={() => handleDelete(p.id)}>🗑️ Delete</button>
                  <button onClick={() => handleEditClick(p)}>✏️ Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <AddProductModal
        showModal={showModal}
        setShowModal={setShowModal}
        handleAddProduct={handleAddProduct}
        handleChange={handleChange}
        categories={categories}
        suppliers={suppliers}
      />

      <EditProductModal
        showModal={showEditModal}
        setShowModal={setShowEditModal}
        handleEditProduct={handleEditProduct}
        categories={categories}
        suppliers={suppliers}
        productToEdit={productToEdit}
      />
    </div>
  );
};

export default ProductManagement;
