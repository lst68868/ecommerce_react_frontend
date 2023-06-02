import React, { useState, useEffect } from "react";
import axios from "axios";

function CreateUser() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "https://ecommerce-react-api.herokuapp.com/users"
      );
      setUsers(response.data);
    } catch (error) {
      console.error(error);
      setErrorMessage("Error fetching users. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://ecommerce-react-api.herokuapp.com/user",
        {
          firstName,
          lastName,
          email,
          password,
        }
      );

      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setSuccessMessage(`New user ${response.data.firstName} created.`);
      setErrorMessage("");
      fetchUsers();
    } catch (error) {
      console.error(error);
      setErrorMessage("Error creating user. Please try again.");
      setSuccessMessage("");
    }
  };

  const handleDeleteUser = async (email) => {
    try {
      await axios.delete(
        `https://ecommerce-react-api.herokuapp.com/users/${email}`
      );
      setSuccessMessage(`User with email ${email} deleted.`);
      setErrorMessage("");
      fetchUsers();
    } catch (error) {
      console.error(error);
      setErrorMessage("Error deleting user. Please try again.");
      setSuccessMessage("");
    }
  };

  return (
    <div>
      <h1>Create User</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Create User</button>
      </form>
      {successMessage && <p>{successMessage}</p>}
      {errorMessage && <p>{errorMessage}</p>}

      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.email}>
            {user.firstName} {user.lastName} - {user.email}
            <button onClick={() => handleDeleteUser(user.email)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CreateUser;
