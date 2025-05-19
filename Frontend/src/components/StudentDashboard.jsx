import { useState } from 'react';
import StudentNavbar from './StudentNavbar';
import { useAuth } from '../context/AuthContext';
import MaintenanceRequestForm from './MaintenanceRequestForm';

const StudentDashboard = () => {
  const { currentUser } = useAuth();
  const [showMaintenanceForm, setShowMaintenanceForm] = useState(false);

  return (
    <div className="dashboard student-dashboard">
      <StudentNavbar setShowMaintenanceForm={setShowMaintenanceForm} />
      <div className="dashboard-container">
        {showMaintenanceForm ? (
          <MaintenanceRequestForm />
        ) : (
          <>
            <h3 className="dashboard-title">Student Dashboard</h3>
            
            <div className="dashboard-card">
              <h4 className="card-title">Student Information</h4>
              
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
          </>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;