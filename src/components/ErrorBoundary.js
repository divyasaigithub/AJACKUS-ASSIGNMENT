import React from 'react';

class ErrorBoundary extends React.Component {
  // Initial state to track whether an error has occurred
  state = { hasError: false };

  // Lifecycle method to update state if an error occurs in a child component
  static getDerivedStateFromError(error) {
    // Set hasError to true when an error is caught
    return { hasError: true };
  }

  // Lifecycle method to log error details for debugging
  componentDidCatch(error, info) {
    console.log(error, info); // Log the error and component stack trace to the console
  }

  // Render method to conditionally display fallback UI or children
  render() {
    if (this.state.hasError) {
      // Display fallback UI if an error occurred
      return <h1>Something went wrong. Please try again later.</h1>;
    }
    // Render the child components if no error occurred
    return this.props.children;
  }
}

export default ErrorBoundary; // Export the ErrorBoundary component for use in other parts of the application








