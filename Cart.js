import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Cart = () => {
  const { cartItems, cartTotal, updateCartItem, removeFromCart, clearCart, loading } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [shippingAddress, setShippingAddress] = useState('');
  const [billingAddress, setBillingAddress] = useState('');

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      updateCartItem(productId, newQuantity);
    }
  };

  const handleCheckout = async () => {
    if (!shippingAddress || !billingAddress) {
      toast.error('Please fill in both shipping and billing addresses');
      return;
    }

    try {
      setCheckoutLoading(true);
      await axios.post('/api/orders/create', {
        shippingAddress,
        billingAddress
      });
      
      toast.success('Order placed successfully!');
      clearCart();
      navigate('/orders');
    } catch (error) {
      toast.error('Failed to place order. Please try again.');
    } finally {
      setCheckoutLoading(false);
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

  if (!user) {
    return (
      <Container className="py-5">
        <Alert variant="warning">
          <Alert.Heading>Please Login</Alert.Heading>
          <p>You need to be logged in to view your cart.</p>
          <Button variant="outline-warning" onClick={() => navigate('/login')}>
            Go to Login
          </Button>
        </Alert>
      </Container>
    );
  }

  if (cartItems.length === 0) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <h2>Your Cart is Empty</h2>
          <p>Add some products to your cart to get started!</p>
          <Button variant="primary" onClick={() => navigate('/products')}>
            Continue Shopping
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <h1 className="mb-4">Shopping Cart</h1>
      
      <Row>
        <Col md={8}>
          {cartItems.map((item) => (
            <Card key={item.id} className="mb-3">
              <Card.Body>
                <Row className="align-items-center">
                  <Col md={2}>
                    <img
                      src={item.product.imageUrl || 'https://via.placeholder.com/100x100?text=No+Image'}
                      alt={item.product.name}
                      style={{ width: '100%', height: '100px', objectFit: 'cover' }}
                    />
                  </Col>
                  
                  <Col md={4}>
                    <h5>{item.product.name}</h5>
                    <p className="text-muted mb-0">${item.product.price}</p>
                  </Col>
                  
                  <Col md={3}>
                    <div className="d-flex align-items-center">
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                      >
                        -
                      </Button>
                      <span className="mx-3">{item.quantity}</span>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                        disabled={item.quantity >= item.product.stock}
                      >
                        +
                      </Button>
                    </div>
                  </Col>
                  
                  <Col md={2}>
                    <h6>${(item.product.price * item.quantity).toFixed(2)}</h6>
                  </Col>
                  
                  <Col md={1}>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => removeFromCart(item.product.id)}
                    >
                      ×
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}
          
          <div className="text-end mb-3">
            <Button variant="outline-danger" onClick={clearCart}>
              Clear Cart
            </Button>
          </div>
        </Col>
        
        <Col md={4}>
          <Card>
            <Card.Header>
              <h5>Order Summary</h5>
            </Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal:</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-3">
                <strong>Total:</strong>
                <strong>${cartTotal.toFixed(2)}</strong>
              </div>
              
              <Form className="mb-3">
                <Form.Group className="mb-3">
                  <Form.Label>Shipping Address</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    placeholder="Enter your shipping address"
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Billing Address</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={billingAddress}
                    onChange={(e) => setBillingAddress(e.target.value)}
                    placeholder="Enter your billing address"
                  />
                </Form.Group>
              </Form>
              
              <Button
                variant="success"
                size="lg"
                className="w-100"
                onClick={handleCheckout}
                disabled={checkoutLoading}
              >
                {checkoutLoading ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    Processing...
                  </>
                ) : (
                  'Proceed to Checkout'
                )}
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;
