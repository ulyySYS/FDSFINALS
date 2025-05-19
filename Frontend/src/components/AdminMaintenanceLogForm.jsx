import { useState, useEffect } from 'react';

const MaintenanceLogForm = ({ selectedRequest, onLogSubmitted, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isFixed, setIsFixed] = useState(false);
  
  // Check if request is already fixed when component mounts or selectedRequest changes
  useEffect(() => {

    if (selectedRequest && (
      selectedRequest.Status === 'Fixed' || 
      selectedRequest.IsFixed === true ||
      selectedRequest.Status === 'Completed'
    )) {
      setIsFixed(true);
      setError('This maintenance request is already fixed.');
    } else {
      setIsFixed(false);
      setError(null);
    }
  }, [selectedRequest]);

  const handleSubmit = async (e) => {
    console.log('Submitting log for request:', selectedRequest);
    e.preventDefault();
    
    // If request is already fixed, then cant submission
    if (isFixed) {
      setError('This maintenance request is already fixed. No new logs can be added.');
      return;
    }
    
    const logDescription = e.target.logDescription.value;
    
    if (!logDescription.trim()) {
      setError('Please enter a log description');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);
    
    try {
      console.log("asfsdfds",selectedRequest);
      const response = await fetch('http://localhost:3000/admin/add-maintenance-log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requestId: selectedRequest.RequestID, 
          FixDetails: logDescription
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        const sqlMessage = errorData?.err?.sqlMessage || 'Unknown server error';
        throw new Error(`${sqlMessage}`);

      }
      
      setSuccess('Maintenance log added successfully');
      e.target.reset();
      
      if (onLogSubmitted) {
        setTimeout(() => {
          onLogSubmitted();
        }, 1500); 
      }
    } catch (err) {
      setError('Error adding maintenance log: ' + err.message);
      console.error('Error adding maintenance log:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="maintenance-log-form-container">
      <div className="log-form-header">
        <h4>Add Maintenance Log</h4>
        <button 
          type="button" 
          className="close-btn" 
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
      </div>
      
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      
      <form className="maintenance-log-form" onSubmit={handleSubmit}>
        <div className="request-form-group">
          <label htmlFor="requestId">Request ID:</label>
          <input 
            type="text" 
            id="requestId" 
            value={selectedRequest.RequestID} 
            readOnly 
            className="request-form-control" 
          />
        </div>
    

        {isFixed ? (
          <div className="request-status-fixed">
            This maintenance request is already fixed. No new logs can be added.
          </div>
        ) : (
          <div className="request-form-group">
            <label htmlFor="logDescription">Log Description:</label>
            <textarea 
              id="logDescription" 
              className="request-form-control textarea" 
              rows="4" 
              placeholder="Enter maintenance log details" 
              required
              disabled={isFixed}
            ></textarea>
          </div>
        )}
        
        <button 
          type="submit" 
          className="submit-btn" 
          disabled={isSubmitting || isFixed}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Log'}
        </button>
      </form>
    </div>
  );
};

export default MaintenanceLogForm;