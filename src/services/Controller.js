import axios from "axios";

// Set the base URL for axios requests
axios.defaults.baseURL = "https://ecommerce-react-api.herokuapp.com/";

/**
 * Get all products from the API
 * @returns {Promise} A promise that resolves to an object containing the products data
 */
export const getAllProducts = async () => {
  const data = {};
  try {
    const response = await axios.get("/products");
    data.products = response.data;
    console.log(data);
  } catch (error) {
    console.log(error);
  }
  return data;
};

/**
 * Get a single product from the API by ID
 * @param {string} id - The ID of the product to fetch
 * @returns {Promise} A promise that resolves to an object containing the product data
 */
export const getOneProductOrDefault = async (id) => {
  const data = {};
  try {
    const response = await axios.get(`/products/${id}`);
    data.product = response.data;
    console.log(data);
  } catch (error) {
    console.log(error);
  }
  return data;
};

/**
 * Create a new product
 * @param {object} product - The product object containing title, image, price, description, and category
 */
export const createProduct = async (product) => {
  const Product = {
    title: product.title,
    image: product.image,
    price: product.price,
    description: product.description,
    category: product.category,
  };
  try {
    const response = await axios.post("/products", Product);
    console.log(response.status);
  } catch (error) {
    console.log(error);
  }
};

/**
 * Delete a product by ID
 * @param {string} id - The ID of the product to delete
 */
export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`/products/${id}`);
    console.log(response.status);
  } catch (error) {
    console.log(error);
  }
};

/**
 * Update an existing product by ID
 * @param {object} product - The product object containing title and price to update
 * @param {string} id - The ID of the product to update
 */
export const updateProduct = async (product, id) => {
  const Product = {
    title: product.title,
    price: product.price,
  };
  try {
    const response = await axios.put(`/products/${id}`, Product);
    console.log(response.status);
  } catch (error) {
    console.log(error);
  }
};

export const login = async (user) => {
  const User = {
    email: user.email,
    password: user.password,
  };
  try {
    const response = await axios.post("/login", User);
    return response;
  } catch (error) {
    return error;
  }
};

export const newUser = async (user) => {
  const User = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: user.password,
  };
  try {
    const response = await axios.post("/user", User);
    console.log(response.status);
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (email) => {
  try {
    const response = await axios.delete(`/user/${email}`);
    console.log(response.status);
  } catch (error) {
    console.log(error);
  }
};
