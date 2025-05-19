
import React from 'react';

const RegistrationsList = ({ registrations, onSelectRegistration, selectedRegistration }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="payment-registrations-list">
      <h4 className="payment-list-title">Registrations</h4>
      {registrations.length === 0 ? (
        <p className="payment-no-data">No registrations found</p>
      ) : (
        <div className="payment-list-wrapper">
          <table className="payment-table">
            <thead>
              <tr className="payment-table-header">
                <th>Reg ID</th>
                <th>User ID</th>
                <th>Name</th>
                <th>Room ID</th>
                <th>Contact</th>
                <th>Email</th>
                <th>Start Date</th>
                <th>End Date</th>
              </tr>
            </thead>
            <tbody>
              {registrations.map((registration) => (
                <tr 
                  key={registration.RegistrationID}
                  className={`payment-table-row ${
                    selectedRegistration?.RegistrationID === registration.RegistrationID 
                      ? 'payment-row-selected' 
                      : ''
                  }`}
                  onClick={() => onSelectRegistration(registration)}
                >
                  <td className="payment-table-cell">{registration.RegistrationID}</td>
                  <td className="payment-table-cell">{registration.UserID}</td>
                  <td className="payment-table-cell">{registration.UserName}</td>
                  <td className="payment-table-cell">{registration.RoomID}</td>
                  <td className="payment-table-cell">{registration.ContactNumber}</td>
                  <td className="payment-table-cell">{registration.Email}</td>
                  <td className="payment-table-cell">{formatDate(registration.StartDate)}</td>
                  <td className="payment-table-cell">{formatDate(registration.EndDate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RegistrationsList;