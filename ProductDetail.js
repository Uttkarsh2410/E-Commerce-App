import React, { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../contexts/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  const fetchProduct = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      setError('Product not found');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const handleAddToCart = async () => {
    if (quantity > product.stock) {
      alert('Quantity exceeds available stock');
      return;
    }
    
    const success = await addToCart(product.id, quantity);
    if (success) {
      navigate('/cart');
    }
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

  if (error || !product) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          <Alert.Heading>Product Not Found</Alert.Heading>
          <p>The product you're looking for doesn't exist or has been removed.</p>
          <Button variant="outline-danger" onClick={() => navigate('/products')}>
            Back to Products
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Row>
        <Col md={6}>
          <Card>
            <Card.Img
              variant="top"
              src={product.imageUrl || 'https://via.placeholder.com/500x400?text=No+Image'}
              alt={product.name}
              style={{ height: '400px', objectFit: 'cover' }}
            />
          </Card>
        </Col>
        
        <Col md={6}>
          <div>
            <h1>{product.name}</h1>
            <p className="text-muted mb-3">
              Category: {product.category.replace('_', ' ')}
            </p>
            
            <div className="mb-4">
              <h2 className="text-primary">${product.price}</h2>
              <p className={product.stock > 0 ? 'text-success' : 'text-danger'}>
                {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
              </p>
            </div>
            
            <div className="mb-4">
              <h5>Description</h5>
              <p>{product.description}</p>
            </div>
            
            {product.stock > 0 && (
              <div className="mb-4">
                <label htmlFor="quantity" className="form-label">Quantity:</label>
                <div className="d-flex align-items-center">
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    -
                  </Button>
                  <span className="mx-3">{quantity}</span>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    disabled={quantity >= product.stock}
                  >
                    +
                  </Button>
                </div>
              </div>
            )}
            
            <div className="d-grid gap-2">
              <Button
                variant="primary"
                size="lg"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </Button>
              
              <Button
                variant="outline-primary"
                size="lg"
                onClick={() => navigate('/products')}
              >
                Back to Products
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;
