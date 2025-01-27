import React from 'react';

// The UserList component receives a list of users, a toggleForm function, 
// and a handleDeleteUser function as props.
const UserList = ({ users, toggleForm, handleDeleteUser }) => {
  return (
    <div className="user-list">
      {/* Render a table to display user details */}
      <table className="user-table">
        <thead>
          <tr>
            {/* Table headers for user details */}
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Map through the list of users and render each user as a table row */}
          {users.map((user) => (
            <tr key={user.id}>
              {/* Display user details: ID, first name, last name, email, and website */}
              <td>{user.id}</td>
              <td>{user.name.split(' ')[0]}</td> {/* Extract the first name */}
              <td>{user.name.split(' ')[1]}</td> {/* Extract the last name */}
              <td>{user.email}</td>
              <td>{user.website}</td>
              <td>
                {/* Render an "Edit" button that triggers the toggleForm function with the selected user */}
                <button onClick={() => toggleForm(user)}>Edit</button>
                {/* Render a "Delete" button that triggers the handleDeleteUser function with the user's ID */}
                <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Export the UserList component for use in other parts of the application
export default UserList;











