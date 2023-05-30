import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css';
import { getAllProducts, getOneProductOrDefault, createProduct, updateProduct, deleteProduct } from '../../services/Controller';

axios.defaults.baseURL = 'https://ecommerce-react-api.herokuapp.com/';

function Home() {
  const [products, setProducts] = useState([]);
  const [searchProductId, setSearchProductId] = useState('');
  const [searchedProduct, setSearchedProduct] = useState(null);

  const [updateProductData, setUpdateProductData] = useState({});
  const [newProductData, setNewProductData] = useState({
    title: '',
    image: '',
    price: '',
    description: '',
    category: '',
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const data = await getAllProducts();
    setProducts(data.products);
  };

  const handleLoadProducts = async () => {
    await loadProducts();
  };

  const handleGetOneProduct = async () => {
    if (searchProductId.trim() !== '') {
      const data = await getOneProductOrDefault(searchProductId);
      setSearchedProduct(data.product);
    }
  };

  const handleCreateProduct = async () => {
    await createProduct(newProductData);
    setNewProductData({
      title: '',
      image: '',
      price: '',
      description: '',
      category: '',
    });
    loadProducts();
  };

  const handleUpdateProduct = async (product, id) => {
    await updateProduct(updateProductData[id], id);
    setUpdateProductData((prevState) => ({
      ...prevState,
      [id]: { title: '', price: '' },
    }));
    setSearchedProduct(null); // Clear searchedProduct
    loadProducts();
  };

  const handleDeleteProduct = async (id) => {
    await deleteProduct(id);
    setUpdateProductData((prevState) => ({
      ...prevState,
      [id]: undefined, // Clear updateProductData for deleted product
    }));
    setSearchedProduct(null); // Clear searchedProduct
    loadProducts();
  };

  const handleInputChange = (e, id) => {
    const { name, value } = e.target;
    setUpdateProductData((prevState) => ({
      ...prevState,
      [id]: {
        ...prevState[id],
        [name]: value,
      },
    }));
  };

  const handleNewProductChange = (e) => {
    const { name, value } = e.target;
    setNewProductData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div id="home">
      <div className="button-container">
        <button onClick={() => {
          setSearchedProduct(null);
          setSearchProductId('');
          handleLoadProducts();
        }}>Get All Products</button>
        <div className="search-container">
          <input
            type="text"
            placeholder="Enter Product ID"
            value={searchProductId}
            onChange={(e) => setSearchProductId(e.target.value)}
          />
          <button onClick={handleGetOneProduct}>Search Product</button>
        </div>
      </div>
      {searchedProduct && (
        <div className="product" key={searchedProduct.id}>
          <div className="product-image">
            <img src={searchedProduct.image} alt="product" />
          </div>
          <div className="product-name">
            <a href="product.html">{searchedProduct.title}</a>
          </div>
          <div className="product-brand">{searchedProduct.brand}</div>
          <div className="product-price">${searchedProduct.price}</div>
          <div className="product-rating">
            {searchedProduct.rating} Stars ({searchedProduct.numReviews} Reviews)
          </div>
          <div className="product-actions">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdateProduct(searchedProduct, searchedProduct.id);
              }}
            >
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={updateProductData[searchedProduct.id]?.title || ''}
                onChange={(e) => handleInputChange(e, searchedProduct.id)}
              />
              <input
                type="text"
                name="price"
                placeholder="Price"
                value={updateProductData[searchedProduct.id]?.price || ''}
                onChange={(e) => handleInputChange(e, searchedProduct.id)}
              />
              <button type="submit">Update</button>
            </form>
            <button onClick={() => handleDeleteProduct(searchedProduct.id)}>Delete</button>
          </div>
        </div>
      )}
      {!searchedProduct && (
        <div>
          <h2>Create New Product</h2>
          <form onSubmit={handleCreateProduct}>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={newProductData.title}
              onChange={handleNewProductChange}
            />
            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={newProductData.image}
              onChange={handleNewProductChange}
            />
            <input
              type="text"
              name="price"
              placeholder="Price"
              value={newProductData.price}
              onChange={handleNewProductChange}
            />
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={newProductData.description}
              onChange={handleNewProductChange}
            />
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={newProductData.category}
              onChange={handleNewProductChange}
            />
            <button type="submit">Create</button>
          </form>
        </div>
      )}
      {products.map((product) => (
        <div className="product" key={product.id}>
          <div className="product-image">
            <img src={product.image} alt="product" />
          </div>
          <div className="product-name">
            <a href="product.html">{product.title}</a>
          </div>
          <div className="product-brand">{product.brand}</div>
          <div className="product-price">${product.price}</div>
          <div className="product-rating">
            {product.rating} Stars ({product.numReviews} Reviews)
          </div>
          <div className="product-actions">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdateProduct(product, product.id);
              }}
            >
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={updateProductData[product.id]?.title || ''}
                onChange={(e) => handleInputChange(e, product.id)}
              />
              <input
                type="text"
                name="price"
                placeholder="Price"
                value={updateProductData[product.id]?.price || ''}
                onChange={(e) => handleInputChange(e, product.id)}
              />
              <button type="submit">Update</button>
            </form>
            <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
