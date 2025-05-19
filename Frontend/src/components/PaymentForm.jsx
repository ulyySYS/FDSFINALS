
import React, { useState, useEffect } from 'react';

const PaymentForm = ({ currentUser, selectedRegistration, onPaymentSubmitted }) => {
  const [formData, setFormData] = useState({
    registrationID: '',
    adminID: '',
    amount: '',
    paymentDate: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Update form when registration is selected
  useEffect(() => {
    if (selectedRegistration) {
      setFormData(prev => ({
        ...prev,
        registrationID: selectedRegistration.RegistrationID,
        adminID: currentUser?.UserID || ''
      }));
    }
  }, [selectedRegistration, currentUser]);

  // Set default payment date to today
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setFormData(prev => ({
      ...prev,
      paymentDate: today
    }));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
 
    if (submitError) setSubmitError(null);
    if (submitSuccess) setSubmitSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('http://localhost:3000/admin/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          registrationID: parseInt(formData.registrationID),
          adminID: parseInt(formData.adminID),
          amount: parseFloat(formData.amount),
          paymentDate: formData.paymentDate
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create payment');
      }

      await response.json();
      
      setSubmitSuccess(true);
      // Reset form except for adminID and paymentDate
      setFormData(prev => ({
        registrationID: '',
        adminID: prev.adminID,
        amount: '',
        paymentDate: prev.paymentDate
      }));

      // Call the callback to notify parent component
      onPaymentSubmitted();

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);

    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="payment-form-wrapper">
      <div className="payment-form-card">
        <h4 className="payment-form-title">Create Payment</h4>
        
        {selectedRegistration && (
          <div className="payment-selected-info">
            <p className="payment-info-text">
              Selected Registration: <strong>{selectedRegistration.UserName}</strong> 
              (ID: {selectedRegistration.RegistrationID})
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="payment-form">
          <div className="payment-form-group">
            <label htmlFor="registrationID" className="payment-form-label">
              Registration ID *
            </label>
            <input
              type="number"
              id="registrationID"
              name="registrationID"
              value={formData.registrationID}
              onChange={handleInputChange}
              className="payment-form-input "
              required
              placeholder="Select a registration from the list"
            />
          </div>

          <div className="payment-form-group">
            <label htmlFor="adminID" className="payment-form-label">
              Admin ID
            </label>
            <input
              type="number"
              id="adminID"
              name="adminID"
              value={formData.adminID}
              onChange={handleInputChange}
              className="payment-form-input admin-id-payment"
              readOnly
              placeholder="Admin ID will be set automatically"
            />
          </div>

          <div className="payment-form-group">
            <label htmlFor="amount" className="payment-form-label">
              Amount *
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
              className="payment-form-input"
              step="0.01"
              min="0"
              required
              placeholder="Enter payment amount"
            />
          </div>

          <div className="payment-form-group">
            <label htmlFor="paymentDate" className="payment-form-label">
              Payment Date *
            </label>
            <input
              type="date"
              id="paymentDate"
              name="paymentDate"
              value={formData.paymentDate}
              onChange={handleInputChange}
              className="payment-form-input"
              required
            />
          </div>

          {submitError && (
            <div className="payment-error-message">
              {submitError}
            </div>
          )}

          {submitSuccess && (
            <div className="payment-success-message">
              Payment created successfully!
            </div>
          )}

          <button 
            type="submit" 
            className="payment-submit-btn"
            disabled={isSubmitting || !formData.registrationID || !formData.amount}
          >
            {isSubmitting ? 'Creating Payment...' : 'Create Payment'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;