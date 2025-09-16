import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/orders/my-orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case 'PENDING':
        return 'warning';
      case 'CONFIRMED':
        return 'info';
      case 'SHIPPED':
        return 'primary';
      case 'DELIVERED':
        return 'success';
      case 'CANCELLED':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleCancelOrder = async (orderId) => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      try {
        await axios.put(`/api/orders/${orderId}/cancel`);
        toast.success('Order cancelled successfully');
        fetchOrders();
      } catch (error) {
        toast.error('Failed to cancel order');
      }
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

  if (orders.length === 0) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <h2>No Orders Found</h2>
          <p>You haven't placed any orders yet.</p>
          <Button variant="primary" onClick={() => navigate('/products')}>
            Start Shopping
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <h1 className="mb-4">My Orders</h1>
      
      {orders.map((order) => (
        <Card key={order.id} className="mb-4">
          <Card.Header>
            <Row className="align-items-center">
              <Col md={6}>
                <h5 className="mb-0">Order #{order.id}</h5>
                <small className="text-muted">
                  Placed on {formatDate(order.orderDate)}
                </small>
              </Col>
              <Col md={3}>
                <Badge bg={getStatusBadgeVariant(order.status)} className="fs-6">
                  {order.status}
                </Badge>
              </Col>
              <Col md={3} className="text-end">
                <h5 className="mb-0">${order.totalAmount.toFixed(2)}</h5>
              </Col>
            </Row>
          </Card.Header>
          
          <Card.Body>
            <Row>
              <Col md={8}>
                <h6>Order Items:</h6>
                {order.orderItems && order.orderItems.map((item) => (
                  <div key={item.id} className="order-item">
                    <Row className="align-items-center">
                      <Col md={6}>
                        <strong>{item.product.name}</strong>
                      </Col>
                      <Col md={2}>
                        <span>Qty: {item.quantity}</span>
                      </Col>
                      <Col md={2}>
                        <span>${item.price.toFixed(2)}</span>
                      </Col>
                      <Col md={2}>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </Col>
                    </Row>
                  </div>
                ))}
              </Col>
              
              <Col md={4}>
                <div className="mb-3">
                  <h6>Shipping Address:</h6>
                  <p className="text-muted small">{order.shippingAddress}</p>
                </div>
                
                <div className="mb-3">
                  <h6>Billing Address:</h6>
                  <p className="text-muted small">{order.billingAddress}</p>
                </div>
                
                {order.status === 'PENDING' && (
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleCancelOrder(order.id)}
                  >
                    Cancel Order
                  </Button>
                )}
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

export default Orders;
