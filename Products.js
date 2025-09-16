import React, { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col, Card, Button, Form, InputGroup, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../contexts/CartContext';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const { addToCart } = useCart();

  const categories = [
    'ELECTRONICS',
    'CLOTHING',
    'BOOKS',
    'HOME_GARDEN',
    'SPORTS',
    'BEAUTY',
    'AUTOMOTIVE',
    'TOYS',
    'FOOD',
    'OTHER'
  ];

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = useCallback(() => {
    let filtered = [...products];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Price range filter
    if (priceRange.min) {
      filtered = filtered.filter(product => product.price >= parseFloat(priceRange.min));
    }
    if (priceRange.max) {
      filtered = filtered.filter(product => product.price <= parseFloat(priceRange.max));
    }

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory, priceRange]);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [filterProducts]);

  const handleAddToCart = async (productId) => {
    await addToCart(productId, 1);
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <Container className="py-4">
      <h1 className="mb-4">Products</h1>

      {/* Filters */}
      <Row className="mb-4">
        <Col md={4}>
          <Form.Group className="search-bar">
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <InputGroup.Text>🔍</InputGroup.Text>
            </InputGroup>
          </Form.Group>
        </Col>
        
        <Col md={3}>
          <Form.Group className="category-filter">
            <Form.Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.replace('_', ' ')}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        
        <Col md={2}>
          <Form.Group className="price-range">
            <Form.Control
              type="number"
              placeholder="Min Price"
              value={priceRange.min}
              onChange={(e) => setPriceRange({...priceRange, min: e.target.value})}
            />
          </Form.Group>
        </Col>
        
        <Col md={2}>
          <Form.Group className="price-range">
            <Form.Control
              type="number"
              placeholder="Max Price"
              value={priceRange.max}
              onChange={(e) => setPriceRange({...priceRange, max: e.target.value})}
            />
          </Form.Group>
        </Col>
        
        <Col md={1}>
          <Button
            variant="outline-secondary"
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('');
              setPriceRange({ min: '', max: '' });
            }}
          >
            Clear
          </Button>
        </Col>
      </Row>

      {/* Products Grid */}
      <Row>
        {filteredProducts.length === 0 ? (
          <Col>
            <div className="text-center py-5">
              <h3>No products found</h3>
              <p>Try adjusting your search criteria.</p>
            </div>
          </Col>
        ) : (
          filteredProducts.map((product) => (
            <Col key={product.id} md={4} lg={3} className="mb-4">
              <Card className="product-card h-100">
                <Card.Img
                  variant="top"
                  src={product.imageUrl || 'https://via.placeholder.com/300x200?text=No+Image'}
                  alt={product.name}
                  className="product-image"
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="h6">{product.name}</Card.Title>
                  <Card.Text className="text-muted small">
                    {product.description?.substring(0, 80)}...
                  </Card.Text>
                  <div className="mt-auto">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="h6 text-primary">${product.price}</span>
                      <small className="text-muted">
                        Stock: {product.stock}
                      </small>
                    </div>
                    <div className="d-grid gap-2">
                      <Button
                        as={Link}
                        to={`/products/${product.id}`}
                        variant="outline-primary"
                        size="sm"
                      >
                        View Details
                      </Button>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleAddToCart(product.id)}
                        disabled={product.stock === 0}
                      >
                        {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default Products;
