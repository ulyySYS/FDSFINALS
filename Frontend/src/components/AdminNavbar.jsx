import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

const AdminSidebar = ({ 
  onDashboardClick, 
  onMaintenanceRequestClick, 
  onRegistrationClick, 
  onPaymentsClick,
}) => {
  const { logout, currentUser } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`admin-sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <button className="toggle-btn" onClick={toggleSidebar}>
          {collapsed ? '→' : '←'}
        </button>
      </div>
      
      <div className="sidebar-buttons">
        <button onClick={onDashboardClick} className="sidebar-btn">
          <span className="btn-icon">📊</span>
          {!collapsed && <span className="btn-text">Dashboard</span>}
        </button>
        <button onClick={onMaintenanceRequestClick} className="sidebar-btn">
          <span className="btn-icon">🔧</span>
          {!collapsed && <span className="btn-text">Maintenance Requests</span>}
        </button>
        <button onClick={onRegistrationClick} className="sidebar-btn">
          <span className="btn-icon">📝</span>
          {!collapsed && <span className="btn-text">Registration</span>}
        </button>
        <button onClick={onPaymentsClick} className="sidebar-btn">
          <span className="btn-icon">💰</span>
          {!collapsed && <span className="btn-text">Payments</span>}
        </button>
      </div>
      
      <div className="sidebar-footer">
        {!collapsed && (
          <span className="navbar-welcome">Welcome, {currentUser?.UserName}</span>
        )}
        <button onClick={logout} className="logout-btn">
          {collapsed ? '🚪' : 'Logout'}
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;