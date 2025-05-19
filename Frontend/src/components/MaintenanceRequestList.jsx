const MaintenanceRequestList = ({ requests, onSelectRequest, selectedRequest }) => {
  return (
    <div className="maintenance-list">
      <h4>All Maintenance Requests</h4>
      
      {requests.length === 0 ? (
        <p className="no-requests">No maintenance requests found.</p>
      ) : (
        <div className="request-list">
          {requests.map((request) => (
            <div 
              key={`${request.RoomID}-${request.UserID}-${request.Date}`}
              className={`request-item ${selectedRequest && selectedRequest.RoomID === request.RoomID ? 'selected' : ''} ${request.Status === 'fixed' ? 'status-fixed' : 'status-not-fixed'}`}
              onClick={() => onSelectRequest(request)}
            >
              <div className="request-header">
                <span className="room-name">Room: {request.RoomName}</span>
                <span className={`request-status ${request.Status === 'fixed' ? 'status-fixed' : 'status-not-fixed'}`}>
                  {request.Status === 'fixed' ? 'Fixed' : 'Not Fixed'}
                </span>
              </div>
              
              <div className="request-details">
                <p className="request-issue"><strong>Problem:</strong> {request.RequestDetails}</p>
                <p className="request-user"><strong>Reported by:</strong> {request.Username}</p>
                <p className="request-date"><strong>Date:</strong> {new Date(request.Date).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MaintenanceRequestList;