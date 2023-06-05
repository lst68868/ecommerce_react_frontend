# Welcome to Our E-Commerce Admin Portal Project

Backend GitHub Repository: [https://github.com/lst68868/ecommerce_react_API](https://github.com/lst68868/ecommerce_react_API)

Netlify Deployment: [https://develop--astounding-alfajores-dbc634.netlify.app/](https://develop--astounding-alfajores-dbc634.netlify.app/)

Heroku Deployment: [https://ecommerce-react-api.herokuapp.com/](https://ecommerce-react-api.herokuapp.com/)

API Documentation: [FakeStoreAPI Documentation](https://fakestoreapi.com/docs)

Greetings! We're excited to present our e-commerce admin portal project. This project is a deep dive into modern web development, designed to give a business owner complete control over their online store. The project showcases the interplay of several cutting-edge technologies including React.js, Express.js, and MongoDB.

## Overview

Our application is neatly split into front and back ends (see repo linked above for server/API code), each with its own responsibilities. On the front end, we use React.js to handle the user interface and user interactions. This communicates with the back end through API calls, turning user inputs into actions. The back end, built with Express.js, handles processing requests, managing data in MongoDB, and sending responses back to the front end. This part might be less visible, but it's crucial to the overall functioning of our app.

## Backend: Express.js and MongoDB

The backbone of our data management is MongoDB, a NoSQL database known for its high performance and scalability. We use the Mongoose library to shape our data and perform database operations. If you're interested in how NoSQL databases work or how to work with Mongoose, this application could offer some valuable insights.

Our backend revolves around two primary data entities: Users and Products. For each of these entities, we've defined Mongoose schemas, structuring the data in MongoDB.

### Mongoose Schemas

Here are our Product and User schemas:

**Product Schema:**

```javascript
import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
```

**User Schema:**

```javascript
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

export default User;
```

### Seeding Products: External API Integration

An exciting feature we've built into our project is the ability to seed our MongoDB database with products from `fakestoreapi.com`. This feature not only serves as a great demonstration of integrating external APIs into your own project but also presents a practical solution to the initial data setup for the application.

### RESTful API Endpoints

We've set up several RESTful API endpoints on our Express server to perform CRUD (Create, Read, Update, Delete) operations on both `User` and `Product` data. These endpoints are a great way to understand how to structure and implement a REST API and how it can facilitate the communication between the front end and the database.

## Frontend: React.js

On the front end, we've divided our interface into several components, each responsible for a specific part of the user

interface. If you're looking to understand how to structure a React app, check these out!

To manage shared state across components, we use React's Context API. For instance, our `AuthContext` tracks the authenticated user's state and provides a function to update this state. It's a neat example of how to handle global state in a React app.

## Guiding Principles and Choices

The guiding principle in this project is the separation of concerns. Each component, function, and module has a clear, distinct role. This approach helps to keep our code clean, easy to test, and maintainable.

Our choice of MongoDB and Mongoose offers flexibility and scalability, accommodating the app's growth and complex queries. Express.js, on the other hand, is a workhorse that efficiently handles requests and responses, offering middleware features for extra functionality.

On the front end, React.js shines with its fast and dynamic user interface. Leveraging features like the virtual DOM and hooks, we've created an app that is not just user-friendly but also developer-friendly.

All in all, this project is a testament to the power of these technologies and their ability to interact to build something robust and meaningful. So feel free to explore, dig in, and hopefully, learn something new!

---

# File Structure

The file structure of our project is organized as follows:

- `backend/`: All server-side code is kept in this directory.

  - `models/`: This directory contains the Mongoose data schemas.
  - `controllers/`: Here, we define the functions that handle API requests.
  - `routes/`: This directory maps our API endpoints to the appropriate controller functions.

- `frontend/`: All client-side code resides here.
  - `src/`: This is the main directory for React.js source code.
    - `components/`: Here, you can find individual React components.
    - `contexts/`: This directory houses our React contexts for state management.

## Components

We have several components in our React application. Let's take a look at a few of them:

### NavBar

- Path: `frontend/src/components/NavBar.js`
- Description: This component is responsible for rendering the navigation bar, which includes links to the various pages of our application.

### CreateUser

- Path: `frontend/src/components/CreateUser.js`
- Description: This component provides a form to create a new user.

### UserLogin

- Path: `frontend/src/components/UserLogin.js`
- Description: This component provides a form for existing users to log in.

## API Endpoints

Our Express server has the following RESTful API endpoints for performing CRUD operations on User and Product data:

### User API

- `GET /api/users`: Fetches all users.
- `POST /api/users`: Creates a new user.
- `GET /api/users/:id`: Fetches a single user by ID.
- `PUT /api/users/:id`: Updates a user by ID.
- `DELETE /api/users/:id`: Deletes a user by ID.

### Product API

- `GET /api/products`: Fetches all products.
- `POST /api/products`: Creates a new product.
- `GET /api/products/:id`: Fetches a single product by ID.
- `PUT /api/products/:id`: Updates a product by ID.
- `DELETE /api/products/:id`: Deletes a product by ID.

## Seeding the Database

To seed the database, you can make a GET request to the `/api/seed` endpoint. This will fetch product data from [fakestoreapi.com](https://fakestoreapi.com/docs) and insert it into the MongoDB database.

## User Authentication

User authentication in our application is handled through a combination of the `bcrypt` library and React's `use

Context` hook. We ensure security by hashing user passwords and storing only the hashed version in our MongoDB database.

### Bcrypt and Salt

- Path: `backend/controllers/userController.js`
- Description: When creating a new user (`POST /api/users`), we use the `bcrypt` library to hash the user's password. Bcrypt automatically handles the creation of a salt (random data used as an additional input to a one-way function that hashes data) and combines it with the hash. This process, known as "salting," adds an extra layer of security by protecting against rainbow table attacks. Here's a simplified example:

```javascript
const bcrypt = require("bcrypt");

// ...inside user creation function
const saltRounds = 10;
const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

const user = new User({
  username: req.body.username,
  password: hashedPassword,
  // other fields...
});

await user.save();
```

When a user attempts to log in (`POST /api/users/login`), we use `bcrypt` again to compare the entered password with the hashed password stored in the database:

```javascript
const user = await User.findOne({ username: req.body.username });
const validPassword = await bcrypt.compare(req.body.password, user.password);

if (!validPassword) {
  // Handle invalid password...
}

// Continue with user login...
```

### useContext for User State

- Path: `frontend/src/contexts/AuthContext.js`
- Description: On the frontend, we use React's `useContext` hook to manage the authentication state across multiple components. The `AuthContext` keeps track of the authenticated user's details and provides functions to update this state. For instance:

  ```javascript
  import { createContext, useState } from "react";

  export const AuthContext = createContext();

  export const AuthProvider = (props) => {
    const [user, setUser] = useState(null);

    const login = (userData) => {
      setUser(userData);
      // You might want to set a cookie or localStorage here for persisting user login
    };

    const logout = () => {
      setUser(null);
      // Clear the cookie or localStorage here
    };

    return (
      <AuthContext.Provider value={{ user, login, logout }}>
        {props.children}
      </AuthContext.Provider>
    );
  };
  ```

  Components that need to access the logged-in user's state can use the `useContext` hook:

  ```javascript
  import { useContext } from "react";
  import { AuthContext } from "../contexts/AuthContext";

  // Inside a component...
  const { user, login, logout } = useContext(AuthContext);

  // You can now use the user state and call login() or logout() as needed
  ```

This approach to user authentication provides a secure and flexible way to handle user logins. It also creates a smooth user experience as the user's login state is remembered across different components without having to constantly check with the server.

## Deployment

The application is deployed and can be accessed via the following links:

- Frontend: [Netlify Deployment](https://develop--astounding-alfajores-dbc634.netlify.app/)
- Backend: [Heroku Deployment](https://ecommerce-react-api.herokuapp.com/)

# We hope you find this project insightful and inspiring! If you have any questions or need further clarification, please don't hesitate to reach out.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
