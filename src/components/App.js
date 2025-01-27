import React, { Component } from 'react';
import axios from 'axios';
import UserList from './UserList';
import UserForm from './UserForm';
import ErrorBoundary from './ErrorBoundary';
import '../App.css';

class App extends Component {
  // Initial state setup
  state = {
    users: [], // List of users
    currentPage: 1, // Current page for pagination
    usersPerPage: 5, // Number of users displayed per page
    error: null, // Error message (if any)
    isFormVisible: false, // Toggle visibility of the user form
    currentUser: null, // User currently being edited (if any)
  };

  // Fetch users from the API when the component is mounted
  componentDidMount() {
    this.fetchUsers();
  }

  // Fetch users data from the API
  fetchUsers = () => {
    axios
      .get(`https://jsonplaceholder.typicode.com/users`)
      .then((response) => {
        // Map through the response data and update user IDs to ensure uniqueness
        const users = response.data.map((user, index) => ({
          ...user,
          id: index + 1, // Generate sequential IDs starting from 1
        }));
        this.setState({ users }); // Update state with the fetched users
      })
      .catch((error) => {
        // Set an error message if the API request fails
        this.setState({ error: 'Failed to fetch users' });
      });
  };

  // Toggle the visibility of the user form
  toggleForm = (user = null) => {
    this.setState({ isFormVisible: !this.state.isFormVisible, currentUser: user });
  };

  // Add a new user to the list
  handleAddUser = (newUser) => {
    this.setState((prevState) => ({
      users: [...prevState.users, { ...newUser, id: prevState.users.length + 1 }], // Assign a unique ID
    }));
  };

  // Update an existing user's details
  handleUpdateUser = (updatedUser) => {
    const updatedUsers = this.state.users.map((user) =>
      user.id === updatedUser.id ? updatedUser : user // Replace the matching user
    );
    this.setState({ users: updatedUsers });
  };

  // Delete a user from the list
  handleDeleteUser = (id) => {
    this.setState((prevState) => ({
      users: prevState.users.filter((user) => user.id !== id), // Remove the user with the matching ID
    }));
  };

  // Handle pagination by updating the current page
  handlePagination = (pageNumber) => {
    this.setState({ currentPage: pageNumber });
  };

  render() {
    const { users, error, isFormVisible, currentUser, currentPage, usersPerPage } = this.state;

    // Calculate the indices for the users to display on the current page
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser); // Get the users for the current page

    // Generate page numbers for pagination
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(users.length / usersPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="App">
        {/* App Header */}
        <h1>User Management</h1>

        {/* Add User Button */}
        <button className="add-user-button" onClick={() => this.toggleForm()}>
          Add User
        </button>

        {/* Display error message if an error occurred */}
        {error && <div className="error">{error}</div>}

        {/* Wrap components in an error boundary to catch and handle errors */}
        <ErrorBoundary>
          {/* User Form - Displayed when isFormVisible is true */}
          {isFormVisible && (
            <UserForm
              toggleForm={this.toggleForm} // Function to toggle the form
              currentUser={currentUser} // User to edit (if any)
              handleAddUser={this.handleAddUser} // Function to add a user
              handleUpdateUser={this.handleUpdateUser} // Function to update a user
            />
          )}

          {/* User List - Displays the list of current users */}
          <UserList
            users={currentUsers} // Users to display on the current page
            toggleForm={this.toggleForm} // Function to toggle the form for editing
            handleDeleteUser={this.handleDeleteUser} // Function to delete a user
          />

          {/* Pagination Controls */}
          <div className="pagination">
            {pageNumbers.map((number) => (
              <button
                key={number} // Unique key for each page number
                onClick={() => this.handlePagination(number)} // Function to handle page changes
                className={currentPage === number ? 'active' : ''} // Highlight the current page
              >
                {number}
              </button>
            ))}
          </div>
        </ErrorBoundary>
      </div>
    );
  }
}

export default App; // Export the App component for use in other parts of the application












