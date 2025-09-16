import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await axios.get('/api/products');
      // Get first 6 products as featured
      setFeaturedProducts(response.data.slice(0, 6));
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-primary text-white py-5 mb-5">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <h1 className="display-4 fw-bold">Welcome to E-Commerce App</h1>
              <p className="lead">
                Discover amazing products at unbeatable prices. Shop with confidence and enjoy fast delivery.
              </p>
              <Button as={Link} to="/products" variant="light" size="lg">
                Shop Now
              </Button>
            </Col>
            <Col md={6}>
              <div className="text-center">
                <div className="display-1">🛒</div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Featured Products */}
      <Container>
        <h2 className="text-center mb-5">Featured Products</h2>
        <Row>
          {featuredProducts.map((product) => (
            <Col key={product.id} md={4} className="mb-4">
              <Card className="product-card h-100">
                <Card.Img
                  variant="top"
                  src={product.imageUrl || 'https://via.placeholder.com/300x200?text=No+Image'}
                  alt={product.name}
                  className="product-image"
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text className="text-muted">
                    {product.description?.substring(0, 100)}...
                  </Card.Text>
                  <div className="mt-auto">
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="h5 text-primary">${product.price}</span>
                      <Button
                        as={Link}
                        to={`/products/${product.id}`}
                        variant="outline-primary"
                        size="sm"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        
        <div className="text-center mt-5">
          <Button as={Link} to="/products" variant="primary" size="lg">
            View All Products
          </Button>
        </div>
      </Container>

      {/* Features Section */}
      <div className="bg-light py-5 mt-5">
        <Container>
          <Row>
            <Col md={4} className="text-center mb-4">
              <div className="display-4 mb-3">🚚</div>
              <h4>Fast Delivery</h4>
              <p>Get your orders delivered quickly and safely to your doorstep.</p>
            </Col>
            <Col md={4} className="text-center mb-4">
              <div className="display-4 mb-3">💳</div>
              <h4>Secure Payment</h4>
              <p>Shop with confidence using our secure payment methods.</p>
            </Col>
            <Col md={4} className="text-center mb-4">
              <div className="display-4 mb-3">🛡️</div>
              <h4>Quality Guarantee</h4>
              <p>All our products come with a quality guarantee and easy returns.</p>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Home;

