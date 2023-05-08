import React, { useState } from 'react';
// Import react-bootstrap components
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

// Import a logo image
// import logo from './logo.png';

const Login = () => {
  // Use state hooks for username and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Define a function to handle form submission
  const handleSubmit = async (e) => {
    // Prevent default browser behavior
    e.preventDefault();

    try {
      // Send a POST request to the server with the username and password
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const { userId } = await response.json();
      localStorage.setItem('userId', userId);
      navigate('/');
    } catch (error) {
      // Handle any errors
      console.error(error);
    }
  };

  return (
    // Use a container component to center the content
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      <div className="w-100" style={{ maxWidth: "400px" }}>
        {/* Use a card component to wrap the form */}
        <Card>
          <Card.Body>
            {/* Use a row component to display the logo */}
            <Row className="text-center mb-4">
              <Col>
                {/* Use an image component to display the logo */}
                {/* <img src={logo} alt="Logo" /> */}
                <img src="https://via.placeholder.com/150?text=Logo" alt="Logo" />
              </Col>
            </Row>
            {/* Use a form component with react-bootstrap components */}
            <Form onSubmit={handleSubmit}>
              {/* Use a form group component for the username input */}
              <Form.Group id="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  // Update the username state when the input changes
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Form.Group>
              {/* Use a form group component for the password input */}
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  // Update the password state when the input changes
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              {/* Use a button component for the submit button */}
              <Button type="submit" className="w-100 mt-3">Login</Button>
            </Form>
            <div className="text-center mt-3">
              {/* Add a light text color to the link */}
              <a href="/signup">Don't have an account? Sign up here</a>
            </div>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default Login;