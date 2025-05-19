import { useAuth } from '../context/AuthContext';


const StudentNavbar = ({ setShowMaintenanceForm }) => {
  const { logout, currentUser } = useAuth();

  return (
    <nav className="student-navbar">
      <div>
        <h2 className="navbar-brand">Student Dashboard</h2>
      </div>
      <div className="navbar-actions">
        <button 
          className="nav-btn maintenance-btn"
          onClick={() => setShowMaintenanceForm(true)}
        >
          Maintenance Request
        </button>
        <button 
          className="nav-btn dashboard-btn"
          onClick={() => setShowMaintenanceForm(false)}
        >
          Dashboard
        </button>
      </div>
      <div className="navbar-user">
        <span className="navbar-welcome">Welcome, {currentUser?.UserName}</span>
        <button 
          onClick={logout}
          className="logout-btn"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default StudentNavbar;