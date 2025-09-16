import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col md={4}>
            <h5>E-Commerce App</h5>
            <p>Your one-stop shop for all your needs. Quality products at great prices.</p>
          </Col>
          <Col md={4}>
            <h5>Quick Links</h5>
            <p><a href="/">Home</a></p>
            <p><a href="/products">Products</a></p>
            <p><a href="/cart">Cart</a></p>
          </Col>
          <Col md={4}>
            <h5>Contact Info</h5>
            <p>Email: support@ecommerce.com</p>
            <p>Phone: +1 (555) 123-4567</p>
            <p>Address: 123 Commerce St, City, State 12345</p>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col className="text-center">
            <p>&copy; 2024 E-Commerce App. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;

