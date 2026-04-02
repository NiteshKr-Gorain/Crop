import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { Card, Button, Input, Loader, Badge, Modal } from '../components/UI';
import { apiService } from '../utils/apiService';
import '../styles/pages/marketplace.css';

export const Marketplace = () => {
  const { isDarkMode } = useTheme();
  const { t } = useLanguage();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchListings = async () => {
      const response = await apiService.getMarketplaceListings();
      if (response.success) {
        setListings(response.data);
      }
      setLoading(false);
    };
    fetchListings();
  }, []);

  const handleAddToCart = (listing) => {
    const existingItem = cart.find(item => item.id === listing.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === listing.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...listing, quantity: 1 }]);
    }
  };

  const handleRemoveFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const filteredListings = listings.filter(listing =>
    listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    listing.seller.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalCartValue = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (loading) return <Loader message={t('loading')} />;

  return (
    <div className={`marketplace ${isDarkMode ? 'dark' : ''}`}>
      <h1>🛒 {t('farmerMarketplace')}</h1>
      <p>{t('buyAndSell')}</p>

      <div className="marketplace-container">
        <div className="marketplace-main">
          <Card className="search-card">
            <Input
              type="text"
              placeholder={t('search')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Card>

          <Card className="listings-card">
            <h2>Available Products</h2>
            <div className="listings-grid">
              {filteredListings.map(listing => (
                <div key={listing.id} className="listing-card">
                  <div className="listing-image">
                    📦
                  </div>
                  <h3>{listing.title}</h3>
                  <p className="seller-info">👤 {listing.seller}</p>
                  <p className="location-info">📍 {listing.location}</p>
                  
                  <div className="rating">
                    {'⭐'.repeat(Math.floor(listing.rating))}
                    <span>({listing.rating})</span>
                  </div>

                  <div className="price">
                    <strong>₹{listing.price.toLocaleString()}</strong>
                  </div>

                  <Button
                    variant="primary"
                    onClick={() => {
                      setSelectedListing(listing);
                      setShowModal(true);
                    }}
                    className="view-btn"
                  >
                    View Details
                  </Button>

                  <Button
                    variant="secondary"
                    onClick={() => handleAddToCart(listing)}
                    className="cart-btn"
                  >
                    Add to Cart
                  </Button>
                </div>
              ))}
            </div>

            {filteredListings.length === 0 && (
              <p className="no-results">No products found matching your search</p>
            )}
          </Card>

          <Card className="tips">
            <h2>💡 Marketplace Tips</h2>
            <ul>
              <li>Check seller ratings before purchasing</li>
              <li>Verify product quality and quantity</li>
              <li>Compare prices across sellers</li>
              <li>Communicate with sellers for bulk orders</li>
              <li>List your own products to reach more buyers</li>
            </ul>
          </Card>
        </div>

        <Card className="cart-sidebar">
          <h2>🛍️ Shopping Cart</h2>
          
          {cart.length > 0 ? (
            <>
              <div className="cart-items">
                {cart.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="item-info">
                      <p className="item-title">{item.title}</p>
                      <p className="item-seller">{item.seller}</p>
                      <p className="item-price">₹{item.price.toLocaleString()}</p>
                    </div>
                    <div className="item-quantity">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => {
                          const newQuantity = parseInt(e.target.value) || 1;
                          setCart(cart.map(i =>
                            i.id === item.id
                              ? { ...i, quantity: newQuantity }
                              : i
                          ));
                        }}
                      />
                    </div>
                    <button
                      className="remove-btn"
                      onClick={() => handleRemoveFromCart(item.id)}
                      title="Remove"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              <div className="cart-summary">
                <div className="summary-item">
                  <span>Items</span>
                  <strong>{cart.length}</strong>
                </div>
                <div className="summary-item">
                  <span>Total Value</span>
                  <strong className="total">₹{totalCartValue.toLocaleString()}</strong>
                </div>
              </div>

              <Button variant="primary" className="checkout-btn">
                Proceed to Checkout
              </Button>

              <Button
                variant="secondary"
                onClick={() => setCart([])}
                className="clear-btn"
              >
                Clear Cart
              </Button>
            </>
          ) : (
            <p className="empty-cart">Cart is empty. Start shopping!</p>
          )}
        </Card>
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={selectedListing?.title}
      >
        {selectedListing && (
          <div className="modal-content">
            <div className="product-details">
              <p><strong>Seller:</strong> {selectedListing.seller}</p>
              <p><strong>Location:</strong> {selectedListing.location}</p>
              <p><strong>Price:</strong> ₹{selectedListing.price.toLocaleString()}</p>
              <p><strong>Rating:</strong> {'⭐'.repeat(Math.floor(selectedListing.rating))} ({selectedListing.rating})</p>
            </div>
            <div className="modal-actions">
              <Button
                variant="primary"
                onClick={() => {
                  handleAddToCart(selectedListing);
                  setShowModal(false);
                }}
              >
                Add to Cart
              </Button>
              <Button
                variant="secondary"
                onClick={() => setShowModal(false)}
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
