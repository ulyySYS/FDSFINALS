import { useState } from 'react';

const AdminMaintenanceRequestForm = ({ currentUser, onRequestSubmitted }) => {
  const [RequestDetails, setRequestDetails] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!RequestDetails.trim()) {
      setError('Please describe the issue');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);
    
    try {
      const response = await fetch('http://localhost:3000/users/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          RequestDetails,
          UserID: currentUser.UserID, 
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit maintenance request');
      }
      
      const data = await response.json();
      setSuccess(data.message || 'Request Sent and logged');
      setRequestDetails(''); // Clear form
      
      if (onRequestSubmitted) {
        onRequestSubmitted();
      }
    } catch (err) {
      setError('Error submitting request: ' + err.message);
      console.error('Error submitting maintenance request:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="maintenance-request-form-container">
      <h4>Submit Maintenance Request</h4>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      
      <form className="maintenance-request-form" onSubmit={handleSubmit}>
        <div className="request-form-group">
          <label htmlFor="userId">User ID:</label>
          <input 
            type="text" 
            id="userId" 
            value={currentUser?.UserID || ''} 
            readOnly 
            className="request-form-control"
          />
        </div>
        <div className="request-form-group">
          <label htmlFor="issue">Describe Issue:</label>
          <textarea 
            id="issue" 
            className="request-form-control issue-textarea textarea"
            rows="6"
            value={RequestDetails}
            onChange={(e) => setRequestDetails(e.target.value)}
            placeholder="Please describe the maintenance issue in detail"
            required
          ></textarea>
        </div>
        <button 
          type="submit" 
          className="submit-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Request'}
        </button>
      </form>
    </div>
  );
};

export default AdminMaintenanceRequestForm;