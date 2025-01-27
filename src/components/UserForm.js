import React, { Component } from 'react';
import axios from 'axios';

class UserForm extends Component {
  // Initialize state to hold form data
  state = {
    id: '', // User ID (auto-generated or pre-filled for editing)
    firstName: '', // First name input
    lastName: '', // Last name input
    email: '', // Email input
    department: '', // Department (using "website" for simplicity)
  };

  // Populate form fields if editing an existing user
  componentDidMount() {
    const { currentUser } = this.props; // Destructure currentUser prop
    if (currentUser) {
      this.setState({
        id: currentUser.id, // Set user ID
        firstName: currentUser.name.split(' ')[0], // Extract and set first name
        lastName: currentUser.name.split(' ')[1], // Extract and set last name
        email: currentUser.email, // Set email
        department: currentUser.website, // Set department (website for simplicity)
      });
    }
  }

  // Handle form input changes and update state
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // Handle form submission for adding or updating a user
  handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const { id, firstName, lastName, email, department } = this.state;

    if (id) {
      // Update existing user
      const updatedUser = {
        id, // Retain the same ID
        name: `${firstName} ${lastName}`, // Combine first and last name
        email, // Retain updated email
        website: department, // Retain updated department
      };
      this.props.handleUpdateUser(updatedUser); // Call update user handler
      this.props.toggleForm(); // Close the form
    } else {
      // Add a new user
      try {
        const response = await axios.post('https://jsonplaceholder.typicode.com/users', {
          name: `${firstName} ${lastName}`, // Combine first and last name
          email, // Add email
          website: department, // Add department
        });
        this.props.handleAddUser(response.data); // Call add user handler with response
        this.props.toggleForm(); // Close the form
      } catch (error) {
        alert('Failed to add user'); // Show error if request fails
      }
    }
  };

  render() {
    const { firstName, lastName, email, department, id } = this.state; // Destructure state
    return (
      <div className="form-container">
        <form onSubmit={this.handleSubmit}>
          {/* ID input field (disabled, auto-generated) */}
          <input
            type="text"
            name="id"
            value={id}
            disabled
            placeholder="ID (Auto-generated)"
          />

          {/* First Name input field */}
          <input
            type="text"
            name="firstName"
            value={firstName}
            onChange={this.handleChange}
            placeholder="First Name"
            required
          />

          {/* Last Name input field */}
          <input
            type="text"
            name="lastName"
            value={lastName}
            onChange={this.handleChange}
            placeholder="Last Name"
            required
          />

          {/* Email input field */}
          <input
            type="email"
            name="email"
            value={email}
            onChange={this.handleChange}
            placeholder="Email"
            required
          />

          {/* Department input field */}
          <input
            type="text"
            name="department"
            value={department}
            onChange={this.handleChange}
            placeholder="Department"
            required
          />

          {/* Submit button for form submission */}
          <button type="submit">Submit</button>

          {/* Cancel button to close the form */}
          <button type="button" onClick={() => this.props.toggleForm()}>
            Cancel
          </button>
        </form>
      </div>
    );
  }
}

export default UserForm; // Export the UserForm component for reuse












