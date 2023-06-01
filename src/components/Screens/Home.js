import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "./Home.css";
import { AuthContext } from "../../hooks/AuthContext";
import { useNavigate } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState([]);
  const [searchProductId, setSearchProductId] = useState("");
  const [searchedProduct, setSearchedProduct] = useState(null);
  const [updateProductData, setUpdateProductData] = useState({});
  const { loggedInUser, handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedInUser) {
      navigate("/login");
    } else {
      loadProducts();
    }
  }, [loggedInUser, navigate]);

  const loadProducts = async () => {
    try {
      const response = await axios.get("/products");
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLoadProducts = async () => {
    setSearchedProduct(null);
    await loadProducts();
  };

  const handleGetOneProduct = async () => {
    if (searchProductId.trim() !== "") {
      try {
        const response = await axios.get(`/products/${searchProductId}`);
        console.log(response.data);
        setSearchedProduct(response.data);
      } catch (error) {
        console.error(error);
      }
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

    try {
      await axios.post("/products", product);
      loadProducts();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateProduct = async (product, id) => {
    try {
      await axios.put(`/products/${id}`, updateProductData[id]);
      setUpdateProductData((prevState) => ({
        ...prevState,
        [id]: { title: "", price: "" },
      }));
      // setSearchedProduct(null);
      loadProducts();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`/products/${id}`);
      setUpdateProductData((prevState) => ({
        ...prevState,
        [id]: undefined,
      }));
      // setSearchedProduct(null);
      loadProducts();
    } catch (error) {
      console.error(error);
    }
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

  useEffect(() => {
    if (searchProductId) {
      console.log(searchProductId);
    }
  }, [searchProductId]);

  useEffect(() => {
    if (searchedProduct) {
      console.log("searched prod");
      console.log(searchedProduct);
    }
  }, [searchedProduct]);

  return (
    <div id="home">
      <div className="button-container">
        <button onClick={handleLoadProducts}>Get All Products</button>
        <div className="search-container">
          <input
            type="text"
            placeholder="Enter Product ID"
            value={searchProductId}
            onChange={(e) => setSearchProductId(e.target.value)}
          />
          <button onClick={handleGetOneProduct}>Search Product</button>
        </div>
        <div id="create-product-container">
          <form onSubmit={handleCreateProduct}>
            <input type="text" name="title" placeholder="Title" />
            <input type="text" name="image" placeholder="Image URL" />
            <input type="text" name="price" placeholder="Price" />
            <input type="text" name="description" placeholder="Description" />
            <input type="text" name="category" placeholder="Category" />
            <button type="submit">Create Product</button>
          </form>
        </div>
      </div>
      <div className="products-container">
        {searchedProduct ? (
          <>
            <div className="product-card">
              <img src={searchedProduct.image} alt={searchedProduct.title} />
              <h4>{searchedProduct.title}</h4>
              <p>${searchedProduct.price}</p>
            </div>
          </>
        ) : (
          <>
            {products.map((product) => (
              <div className="product-card" key={product._id}>
                <img src={product.image} alt={product.title} />
                <h4>{product.title}</h4>
                <p>${product.price}</p>
                <div className="button-container">
                  <button
                    onClick={() =>
                      setUpdateProductData((prevState) => ({
                        ...prevState,
                        [product._id]: product,
                      }))
                    }
                  >
                    Edit
                  </button>
                  <button onClick={() => handleDeleteProduct(product._id)}>
                    Delete
                  </button>
                </div>
                {updateProductData[product._id] && (
                  <div className="update-form-container">
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
                        value={updateProductData[product._id].title}
                        onChange={(e) => handleInputChange(e, product._id)}
                      />
                      <input
                        type="text"
                        name="price"
                        placeholder="Price"
                        value={updateProductData[product._id].price}
                        onChange={(e) => handleInputChange(e, product._id)}
                      />
                      <button type="submit">Update Product</button>
                    </form>
                  </div>
                )}
              </div>
            ))}
          </>
        )}
      </div>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Home;
