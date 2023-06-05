import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../hooks/AuthContext";
import axios from "axios";
import "./Home.css";
import {
  getAllProducts,
  getOneProductOrDefault,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../services/Controller";

axios.defaults.baseURL = "https://ecommerce-react-api.herokuapp.com/";

function Home() {
  const { loggedInUser, isUserLoggedIn } = useContext(AuthContext);
  console.log(loggedInUser);

  const [products, setProducts] = useState([]);
  const [searchProductId, setSearchProductId] = useState("");
  const [searchedProduct, setSearchedProduct] = useState(null);
  const [updateProductData, setUpdateProductData] = useState({});

  useEffect(() => {
    loadProducts();
  }, [loggedInUser]);

  const loadProducts = async () => {
    const data = await getAllProducts();
    setProducts(data.products);
  };

  const handleLoadProducts = async () => {
    await loadProducts();
  };

  const handleGetOneProduct = async () => {
    if (searchProductId.trim() !== "") {
      const data = await getOneProductOrDefault(searchProductId);
      setSearchedProduct(data.product);
    }
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    const product = {
      title: e.target[0].value,
      image: e.target[1].value,
      price: e.target[2].value,
      description: e.target[3].value,
      category: e.target[4].value,
    };
    await createProduct(product);
    loadProducts();
  };

  const handleUpdateProduct = async (product, id) => {
    await updateProduct(updateProductData[id], id);
    setUpdateProductData((prevState) => ({
      ...prevState,
      [id]: { title: "", price: "" },
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

  if (!isUserLoggedIn) {
    return (
      <div id="home">
        <h1>User Not Logged In</h1>
      </div>
    );
  } else {
    return (
      <div id="home">
        <div className="button-container">
          <button
            onClick={() => {
              setSearchedProduct(null);
              setSearchProductId("");
              handleLoadProducts();
            }}
          >
            Get All Products
          </button>
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
          <div className="product" key={searchedProduct._id}>
            <div className="product-image">
              <img src={searchedProduct.image} alt="product" />
            </div>
            <div className="product-name">
              <a href="product.html">{searchedProduct.title}</a>
            </div>
            <div className="product-brand">{searchedProduct.brand}</div>
            <div className="product-price">${searchedProduct.price}</div>
            <div className="product-rating">
              {searchedProduct.rating} Stars ({searchedProduct.numReviews}{" "}
              Reviews)
            </div>
            <div className="product-actions">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleUpdateProduct(searchedProduct, searchedProduct._id);
                }}
              >
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  value={updateProductData[searchedProduct._id]?.title || ""}
                  onChange={(e) => handleInputChange(e, searchedProduct._id)}
                />
                <input
                  type="text"
                  name="price"
                  placeholder="Price"
                  value={updateProductData[searchedProduct._id]?.price || ""}
                  onChange={(e) => handleInputChange(e, searchedProduct._id)}
                />
                <button type="submit">Update</button>
              </form>
              <button onClick={() => handleDeleteProduct(searchedProduct._id)}>
                Delete
              </button>
            </div>
          </div>
        )}

        {!searchedProduct && (
          <div className="products-container">
            {products.map((product) => (
              <div className="product" key={product._id}>
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
                      handleUpdateProduct(product, product._id);
                    }}
                  >
                    <input
                      type="text"
                      name="title"
                      placeholder="Title"
                      value={updateProductData[product._id]?.title || ""}
                      onChange={(e) => handleInputChange(e, product._id)}
                    />
                    <input
                      type="text"
                      name="price"
                      placeholder="Price"
                      value={updateProductData[product._id]?.price || ""}
                      onChange={(e) => handleInputChange(e, product._id)}
                    />
                    <button type="submit">Update</button>
                  </form>
                  <button onClick={() => handleDeleteProduct(product._id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div id="create-product-container">
          <form onSubmit={handleCreateProduct}>
            <input type="text" name="title" placeholder="Title" />
            <input type="text" name="image" placeholder="Image URL" />
            <input type="number" name="price" placeholder="Price" />
            <input type="text" name="description" placeholder="Description" />
            <input type="text" name="category" placeholder="Category" />
            <button type="submit">Add New Product</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Home;
