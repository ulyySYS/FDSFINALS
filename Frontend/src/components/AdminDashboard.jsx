import { useState, useEffect } from 'react';
import AdminNavbar from './AdminNavbar';
import { useAuth } from '../context/AuthContext';
import AdminMaintenanceRequestForm from './AdminMaintenanceRequestForm';
import MaintenanceRequestList from './MaintenanceRequestList';
import MaintenanceLogForm from './AdminMaintenanceLogForm';
import RegistrationForm from './RegistrationForm';
import RegistrationsList from './RegistrationsList';
import PaymentForm from './PaymentForm';

const AdminDashboard = () => {
  const { currentUser } = useAuth();
  const [activeView, setActiveView] = useState('dashboard'); 
  const [maintenanceRequests, setMaintenanceRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showLogForm, setShowLogForm] = useState(false);
  
  // Payment-related state
  const [registrations, setRegistrations] = useState([]);
  const [selectedRegistration, setSelectedRegistration] = useState(null);
  const [isLoadingRegistrations, setIsLoadingRegistrations] = useState(false);
  const [registrationsError, setRegistrationsError] = useState(null);

  //  state for user registrations combined view
  const [userRegistrations, setUserRegistrations] = useState([]);
  const [isLoadingUserRegistrations, setIsLoadingUserRegistrations] = useState(false);
  const [userRegistrationsError, setUserRegistrationsError] = useState(null);

  //  state for payments
  const [allPayments, setAllPayments] = useState([]);
  const [isLoadingPayments, setIsLoadingPayments] = useState(false);
  const [paymentsError, setPaymentsError] = useState(null);

  //  state for maintenance logs
  const [maintenanceLogs, setMaintenanceLogs] = useState([]);
  const [isLoadingLogs, setIsLoadingLogs] = useState(false);
  const [logsError, setLogsError] = useState(null);

  //  state for buildings
  const [buildings, setBuildings] = useState([]);
  const [isLoadingBuildings, setIsLoadingBuildings] = useState(false);
  const [buildingsError, setBuildingsError] = useState(null);

  // Fetch data when the view changes
  useEffect(() => {
    if (activeView === 'maintenance') {
      fetchMaintenanceRequests();
    } else if (activeView === 'payments') {
      fetchRegistrations();
    } else if (activeView === 'userRegistration') {
      fetchUserRegistrations();
    } else if (activeView === 'allPayments') {
      fetchAllPayments();
    } else if (activeView === 'maintenanceRequests') {
      fetchMaintenanceRequests();
    } else if (activeView === 'maintenanceLogs') {
      fetchMaintenanceLogs();
    } else if (activeView === 'buildings') {
      fetchBuildings();
    }
  }, [activeView]);

  // Function to fetch user and registration info
  const fetchUserRegistrations = async () => {
    setIsLoadingUserRegistrations(true);
    setUserRegistrationsError(null);
    
    try {
      const response = await fetch('http://localhost:3000/admin/all-registrations');
      
      if (!response.ok) {
        throw new Error('Failed to fetch user registrations');
      }
      
      const data = await response.json();
      setUserRegistrations(data.allRegistrations || []);
    } catch (err) {
      setUserRegistrationsError('Error fetching user registrations: ' + err.message);
      console.error('Error fetching user registrations:', err);
    } finally {
      setIsLoadingUserRegistrations(false);
    }
  };

  // Function to fetch all payments
  const fetchAllPayments = async () => {
    setIsLoadingPayments(true);
    setPaymentsError(null);
    
    try {
      const response = await fetch('http://localhost:3000/admin/all-payments');
      
      if (!response.ok) {
        throw new Error('Failed to fetch payments');
      }
      
      const data = await response.json();
      setAllPayments(data.allPayments || []);
    } catch (err) {
      setPaymentsError('Error fetching payments: ' + err.message);
      console.error('Error fetching payments:', err);
    } finally {
      setIsLoadingPayments(false);
    }
  };

  // Function to fetch maintenance logs
  const fetchMaintenanceLogs = async () => {
    setIsLoadingLogs(true);
    setLogsError(null);
    
    try {
      const response = await fetch('http://localhost:3000/admin/view-maintenance-logs');
      
      if (!response.ok) {
        throw new Error('Failed to fetch maintenance logs');
      }
      
      const data = await response.json();
      setMaintenanceLogs(data.logs || []);
    } catch (err) {
      setLogsError('Error fetching maintenance logs: ' + err.message);
      console.error('Error fetching maintenance logs:', err);
    } finally {
      setIsLoadingLogs(false);
    }
  };

  // Function to fetch buildings
  const fetchBuildings = async () => {
    setIsLoadingBuildings(true);
    setBuildingsError(null);
    
    try {
      const response = await fetch('http://localhost:3000/admin/all-buildings');
      
      if (!response.ok) {
        throw new Error('Failed to fetch buildings');
      }
      
      const data = await response.json();
      setBuildings(data.buildings || []);
    } catch (err) {
      setBuildingsError('Error fetching buildings: ' + err.message);
      console.error('Error fetching buildings:', err);
    } finally {
      setIsLoadingBuildings(false);
    }
  };

  // Function to fetch maintenance requests
  const fetchMaintenanceRequests = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://localhost:3000/admin/view-maintenance-requests');
      
      if (!response.ok) {
        throw new Error('Failed to fetch maintenance requests');
      }
      
      const data = await response.json();
      setMaintenanceRequests(data.requests || []);
    } catch (err) {
      setError('Error fetching maintenance requests: ' + err.message);
      console.error('Error fetching maintenance requests:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to fetch registrations for payments
  const fetchRegistrations = async () => {
    setIsLoadingRegistrations(true);
    setRegistrationsError(null);
    try {
      const response = await fetch('http://localhost:3000/admin/all-registrations');
      
      if (!response.ok) {
        throw new Error('Failed to fetch registrations');
      }
      
      const data = await response.json();
      setRegistrations(data.allRegistrations || []);
    } catch (err) {
      setRegistrationsError('Error fetching registrations: ' + err.message);
      console.error('Error fetching registrations:', err);
    } finally {
      setIsLoadingRegistrations(false);
    }
  };

  // Handle request selection
  const handleRequestSelect = (request) => {
    setSelectedRequest(request);
    setShowLogForm(true);
  };

  // Handle registration selection for payments
  const handleRegistrationSelect = (registration) => {
    setSelectedRegistration(registration);
  };

  // Handle form submission success
  const handleRequestSubmitted = () => {
    fetchMaintenanceRequests();
  };

  // Handle log submission success
  const handleLogSubmitted = () => {
    fetchMaintenanceRequests();
    setSelectedRequest(null);
    setShowLogForm(false);
  };

  // Handle payment submission success
  const handlePaymentSubmitted = () => {
    setSelectedRegistration(null);
    // Optionally refetch registrations to update any status
    fetchRegistrations();
  };

  // Handle closing the log form
  const handleCloseLogForm = () => {
    setShowLogForm(false);
    setSelectedRequest(null);
  };

  // Format date to a more readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="ad-dashboard-layout">
      <AdminNavbar 
        onDashboardClick={() => setActiveView('dashboard')}
        onMaintenanceRequestClick={() => setActiveView('maintenance')}
        onRegistrationClick={() => setActiveView('registration')}
        onPaymentsClick={() => setActiveView('payments')}
        onRoomsClick={() => setActiveView('rooms')}
      />
      
      <div className="ad-dashboard-content">
        <div className="ad-dashboard-header">
          {activeView === 'dashboard' && <h2 className="ad-dashboard-page-title">Admin Dashboard</h2>}
          {activeView === 'maintenance' && <h2 className="ad-dashboard-page-title">Maintenance Requests</h2>}
          {activeView === 'registration' && <h2 className="ad-dashboard-page-title">User Registration</h2>}
          {activeView === 'payments' && <h2 className="ad-dashboard-page-title">Payment Management</h2>}
          {activeView === 'userRegistration' && <h2 className="ad-dashboard-page-title">User Registration List</h2>}
          {activeView === 'allPayments' && <h2 className="ad-dashboard-page-title">Payment List</h2>}
          {activeView === 'maintenanceLogs' && <h2 className="ad-dashboard-page-title">Maintenance Logs</h2>}
          {activeView === 'maintenanceRequests' && <h2 className="ad-dashboard-page-title">Maintenance Requests</h2>}
          {activeView === 'buildings' && <h2 className="ad-dashboard-page-title">Dorm Buildings</h2>}
        </div>
        
        <div className="ad-dashboard-main">
          {activeView === 'dashboard' ? (
            // Dashboard View
            <div className="ad-dashboard-home">
              <div className="ad-dashboard-card">
                <h4 className="ad-dashboard-card-title">User Information</h4>
                <div className="info-grid">
                  <div className="info-item">
                    <p className="info-label">Full Name</p>
                    <p className="info-value">{currentUser?.UserName}</p>
                  </div>
                  <div className="info-item">
                    <p className="info-label">Email Address</p>
                    <p className="info-value">{currentUser?.Email}</p>
                  </div>
                  <div className="info-item">
                    <p className="info-label">Contact Number</p>
                    <p className="info-value">{currentUser?.ContactNumber}</p>
                  </div>
                  <div className="info-item">
                    <p className="info-label">User Role</p>
                    <p className="role-badge">{currentUser?.Role}</p>
                  </div>
                </div>
              </div>
              
              <div className="ad-dashboard-quick-actions">
                <h4 className="ad-dashboard-card-title">Quick Access</h4>
                <div className="ad-dashboard-actions-grid">
                  <button 
                    className="ad-dashboard-action-button" 
                    onClick={() => setActiveView('userRegistration')}
                  >
                    User Registration
                  </button>
                  <button 
                    className="ad-dashboard-action-button" 
                    onClick={() => setActiveView('allPayments')}
                  >
                    Payments
                  </button>
                  <button 
                    className="ad-dashboard-action-button"
                    onClick={() => setActiveView('maintenanceLogs')}
                  >
                    Maintenance Logs
                  </button>
                  <button 
                    className="ad-dashboard-action-button"
                    onClick={() => setActiveView('maintenanceRequests')}
                  >
                    Maintenance Requests
                  </button>
                  <button 
                    className="ad-dashboard-action-button"
                    onClick={() => setActiveView('buildings')}
                  >
                    Dorm Buildings
                  </button>
                </div>
              </div>
            </div>
          ) : activeView === 'maintenance' ? (
            // Maintenance View
            <div className="ad-dashboard-section">
              <div className="ad-dashboard-maintenance-container">
                {/* List of maintenance requests */}
                <div className="ad-dashboard-list-section">
                  {isLoading ? (
                    <p className="ad-dashboard-loading">Loading requests...</p>
                  ) : error ? (
                    <p className="ad-dashboard-error">{error}</p>
                  ) : (
                    <MaintenanceRequestList 
                      requests={maintenanceRequests} 
                      onSelectRequest={handleRequestSelect}
                      selectedRequest={selectedRequest}
                    />
                  )}
                </div>
                
                {/* Forms container */}
                <div className="ad-dashboard-form-section">
                  {showLogForm && selectedRequest ? (
                    <MaintenanceLogForm 
                      selectedRequest={selectedRequest}
                      onLogSubmitted={handleLogSubmitted}
                      onClose={handleCloseLogForm}
                    />
                  ) : (
                    <AdminMaintenanceRequestForm 
                      currentUser={currentUser}
                      onRequestSubmitted={handleRequestSubmitted}
                    />
                  )}
                </div>
              </div>
            </div>
          ) : activeView === 'registration' ? (
            // Registration View
            <div className="ad-dashboard-section">
              <RegistrationForm currentUser={currentUser} />
            </div>
          ) : activeView === 'payments' ? (
            // Payments View
            <div className="ad-dashboard-section">
              <div className="ad-dashboard-payment-container">
                {/* List of registrations */}
                <div className="ad-dashboard-list-section">
                  {isLoadingRegistrations ? (
                    <p className="ad-dashboard-loading">Loading registrations...</p>
                  ) : registrationsError ? (
                    <p className="ad-dashboard-error">{registrationsError}</p>
                  ) : (
                    <RegistrationsList 
                      registrations={registrations}
                      onSelectRegistration={handleRegistrationSelect}
                      selectedRegistration={selectedRegistration}
                    />
                  )}
                </div>
                
                {/* Payment form */}
                <div className="ad-dashboard-form-section">
                  <PaymentForm 
                    currentUser={currentUser}
                    selectedRegistration={selectedRegistration}
                    onPaymentSubmitted={handlePaymentSubmitted}
                  />
                </div>
              </div>
            </div>
          ) : activeView === 'userRegistration' || 
              activeView === 'allPayments' || 
              activeView === 'maintenanceLogs' || 
              activeView === 'maintenanceRequests' || 
              activeView === 'buildings' ? (
            // Table Views (common layout for all table views)
            <div className="ad-dashboard-section">
              <div className="ad-dashboard-table-container">
                <button 
                  className="ad-dashboard-back-button" 
                  onClick={() => setActiveView('dashboard')}
                >
                  Back to Dashboard
                </button>
                
                {activeView === 'userRegistration' && (
                  <>
                    {isLoadingUserRegistrations ? (
                      <p className="ad-dashboard-loading">Loading user registrations...</p>
                    ) : userRegistrationsError ? (
                      <p className="ad-dashboard-error">{userRegistrationsError}</p>
                    ) : (
                      <div className="ad-dashboard-table-wrapper">
                        <table className="ad-dashboard-table">
                          <thead>
                            <tr>
                              <th>Reg. ID</th>
                              <th>User ID</th>
                              <th>Room ID</th>
                              <th>User Name</th>
                              <th>Contact Number</th>
                              <th>Email</th>
                              <th>Start Date</th>
                              <th>End Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {userRegistrations.map((reg) => (
                              <tr key={reg.RegistrationID}>
                                <td>{reg.RegistrationID}</td>
                                <td>{reg.UserID}</td>
                                <td>{reg.RoomID}</td>
                                <td>{reg.UserName}</td>
                                <td>{reg.ContactNumber}</td>
                                <td>{reg.Email}</td>
                                <td>{formatDate(reg.StartDate)}</td>
                                <td>{formatDate(reg.EndDate)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </>
                )}
                
                {activeView === 'allPayments' && (
                  <>
                    {isLoadingPayments ? (
                      <p className="ad-dashboard-loading">Loading payments...</p>
                    ) : paymentsError ? (
                      <p className="ad-dashboard-error">{paymentsError}</p>
                    ) : (
                      <div className="ad-dashboard-table-wrapper">
                        <table className="ad-dashboard-table">
                          <thead>
                            <tr>
                              <th>Registration ID</th>
                              <th>User Name</th>
                              <th>Contact Number</th>
                              <th>Email</th>
                              <th>Payment Date</th>
                              <th>Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            {allPayments.map((payment, index) => (
                              <tr key={index}>
                                <td>{payment.RegistrationID}</td>
                                <td>{payment.UserName}</td>
                                <td>{payment.ContactNumber}</td>
                                <td>{payment.Email}</td>
                                <td>{formatDate(payment.PaymentDate)}</td>
                                <td>₱{parseFloat(payment.Amount).toFixed(2)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </>
                )}
                
                {activeView === 'maintenanceLogs' && (
                  <>
                    {isLoadingLogs ? (
                      <p className="ad-dashboard-loading">Loading maintenance logs...</p>
                    ) : logsError ? (
                      <p className="ad-dashboard-error">{logsError}</p>
                    ) : (
                      <div className="ad-dashboard-table-wrapper">
                        <table className="ad-dashboard-table">
                          <thead>
                            <tr>
                              <th>Log ID</th>
                              <th>Request ID</th>
                              <th>Log Date</th>
                              <th>Repair Description</th>
                            </tr>
                          </thead>
                          <tbody>
                            {maintenanceLogs.map((log) => (
                              <tr key={log.MaintenanceLogs}>
                                <td>{log.MaintenanceLogs}</td>
                                <td>{log.RequestID}</td>
                                <td>{formatDate(log.LogDate)}</td>
                                <td>{log.RepairDescription}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </>
                )}
                
                {activeView === 'maintenanceRequests' && (
                  <>
                    {isLoading ? (
                      <p className="ad-dashboard-loading">Loading maintenance requests...</p>
                    ) : error ? (
                      <p className="ad-dashboard-error">{error}</p>
                    ) : (
                      <div className="ad-dashboard-table-wrapper">
                        <table className="ad-dashboard-table">
                          <thead>
                            <tr>
                              <th>Request ID</th>
                              <th>Room ID</th>
                              <th>Room Name</th>
                              <th>User ID</th>
                              <th>Username</th>
                              <th>Issue</th>
                              <th>Status</th>
                              <th>Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {maintenanceRequests.map((request) => (
                              <tr key={request.RequestID}>
                                <td>{request.RequestID}</td>
                                <td>{request.RoomID}</td>
                                <td>{request.RoomName}</td>
                                <td>{request.UserID}</td>
                                <td>{request.Username}</td>
                                <td>{request.RequestDetails}</td>
                                <td>
                                  <span className={`ad-dashboard-status ad-dashboard-status-${request.Status.toLowerCase()}`}>
                                    {request.Status}
                                  </span>
                                </td>
                                <td>{formatDate(request.Date)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </>
                )}
                
                {activeView === 'buildings' && (
                  <>
                    {isLoadingBuildings ? (
                      <p className="ad-dashboard-loading">Loading buildings...</p>
                    ) : buildingsError ? (
                      <p className="ad-dashboard-error">{buildingsError}</p>
                    ) : (
                      <div className="ad-dashboard-table-wrapper">
                        <table className="ad-dashboard-table">
                          <thead>
                            <tr>
                              <th>Building ID</th>
                              <th>Building Name</th>
                              <th>Address</th>
                              <th>Total Rooms</th>
                              <th>Available Rooms</th>
                            </tr>
                          </thead>
                          <tbody>
                            {buildings.map((building) => (
                              <tr key={building.DormBuildingID}>
                                <td>{building.DormBuildingID}</td>
                                <td>{building.BuildingName}</td>
                                <td>{building.Address}</td>
                                <td>{building.TotalRooms}</td>
                                <td>{building.AvailableRooms}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;