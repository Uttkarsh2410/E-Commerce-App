import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { toast } from 'react-toastify';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const { user, token } = useAuth();

  useEffect(() => {
    if (user && token) {
      fetchCartItems();
    } else {
      setCartItems([]);
      setCartTotal(0);
    }
  }, [user, token]);

  const fetchCartItems = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/cart');
      setCartItems(response.data);
      
      // Calculate total
      const total = response.data.reduce((sum, item) => {
        return sum + (item.product.price * item.quantity);
      }, 0);
      setCartTotal(total);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    if (!user) {
      toast.error('Please login to add items to cart');
      return false;
    }

    try {
      await axios.post('/api/cart/add', {
        productId,
        quantity
      });
      
      await fetchCartItems();
      toast.success('Product added to cart!');
      return true;
    } catch (error) {
      toast.error('Failed to add product to cart');
      return false;
    }
  };

  const updateCartItem = async (productId, quantity) => {
    try {
      await axios.put('/api/cart/update', {
        productId,
        quantity
      });
      
      await fetchCartItems();
      toast.success('Cart updated!');
    } catch (error) {
      toast.error('Failed to update cart');
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await axios.delete(`/api/cart/remove/${productId}`);
      
      await fetchCartItems();
      toast.success('Product removed from cart!');
    } catch (error) {
      toast.error('Failed to remove product from cart');
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete('/api/cart/clear');
      
      setCartItems([]);
      setCartTotal(0);
      toast.success('Cart cleared!');
    } catch (error) {
      toast.error('Failed to clear cart');
    }
  };

  const getCartItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const value = {
    cartItems,
    cartTotal,
    loading,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    getCartItemCount,
    fetchCartItems
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

