# Welcome to Our E-Commerce Admin Portal Project

Backend GitHub Repository [here: ](https://github.com/lst68868/ecommerce_react_API)

Netlify Deployment: [https://develop--astounding-alfajores-dbc634.netlify.app/](https://develop--astounding-alfajores-dbc634.netlify.app/)

Heroku Deployment: [https://ecommerce-react-api.herokuapp.com/](https://ecommerce-react-api.herokuapp.com/)

API Documentation: [FakeStoreAPI Documentation](https://fakestoreapi.com/docs)

Greetings! We're excited to present our e-commerce admin portal project. This project is a deep dive into modern web development, designed to give a business owner complete control over their online store. The project showcases the interplay of several cutting-edge technologies including React.js, Express.js, and MongoDB.

## Overview

Our application is neatly split into front and back ends. The back end, which handles server-side operations and API interactions, can be found in a separate GitHub repository. The front end, built with React.js, focuses on the user interface and user interactions. It communicates with the back end through API calls, turning user inputs into actions. In this document, we will exclusively discuss the frontend part of the project.

## Frontend: React.js

On the frontend, we've divided our interface into several components, each responsible for a specific part of the user interface. React.js provides a powerful and efficient way to build user interfaces, enabling us to create dynamic and responsive web applications.

To manage shared state across components, we use React's Context API. For instance, our `AuthContext` tracks the authenticated user's state and provides a function to update this state. It's a neat example of how to handle global state in a React app.

## File Structure

The file structure of our frontend project is organized as follows:

- `frontend/`: All client-side code resides here.
  - `src/`: This is the main directory for React.js source code.
    - `components/`: Here, you can find individual React components.
    - `contexts/`: This directory houses our React contexts for state management.

### Components

We have several components in our React application. Let's take a look at a few of them:

#### NavBar

- Path: `frontend/src/components/NavBar.js`
- Description: This component is responsible for rendering the navigation bar, which includes links to the various pages of our application.

#### CreateUser

- Path: `frontend/src/components/CreateUser.js`
- Description: This component provides a form to create a new user.

#### UserLogin

- Path: `frontend/src/components/UserLogin.js`
- Description: This component provides a form for existing users to log in.

## Guiding Principles and Choices

The guiding principle in this project is the separation of concerns. Each component, function, and module has a clear, distinct role. This approach helps to keep our code clean, easy to test, and maintainable.

All in all, this project is a testament to the power of React.js and its ability to create robust and interactive user interfaces.

## Deployment

The frontend of our application is deployed and can be accessed via the following link:

- Frontend: [Netlify Deployment](https://develop--astounding-alfajores-dbc634.netlify.app/)

Please note that the backend code, including the server-side logic and API endpoints, can be found in a separate GitHub repository: [Backend Repo](https://github.com/lst68868/ecommerce_react_API). The backend is deployed separately on Heroku: [https://ecommerce

-react-api.herokuapp.com/](https://ecommerce-react-api.herokuapp.com/).

We hope you find this project insightful and inspiring! If you have any questions or need further clarification, please don't hesitate to reach out.
