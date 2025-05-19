
import { useAuth } from '../context/AuthContext';

const AdminNavbar = ({ 
  onDashboardClick, 
  onMaintenanceRequestClick, 
  onRegistrationClick, 
  onPaymentsClick,
}) => {
  const { logout, currentUser } = useAuth();

  return (
    <nav className="admin-navbar">
      <div className="navbar-left">
        <h2 className="navbar-brand">Admin Dashboard</h2>
        <div className="navbar-buttons">
          <button onClick={onDashboardClick} className="navbar-btn">
            Dashboard
          </button>
          <button onClick={onMaintenanceRequestClick} className="navbar-btn">
            Maintenance Requests
          </button>
          <button onClick={onRegistrationClick} className="navbar-btn">
            Registration
          </button>
          <button onClick={onPaymentsClick} className="navbar-btn">
            Payments
          </button>
        </div>
      </div>
      <div className="navbar-user">
        <span className="navbar-welcome">Welcome, {currentUser?.UserName}</span>
        <button onClick={logout} className="logout-btn">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;