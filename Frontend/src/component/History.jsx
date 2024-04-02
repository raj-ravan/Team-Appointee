import React from 'react';
import './History.css';

const History = () => {
  const paymentHistory = [
    {
      id: 1,
      date: '2023-06-10',
      modeOfPayment: 'Credit Card',
      Patient_name: 'John Doe',
      isSuccess: true,
    },
    {
      id: 2,
      date: '2023-06-09',
      modeOfPayment: 'PayPal',
      Patient_name: 'Jane Smith',
      isSuccess: false,
    },
    // Add more payment history objects as needed
  ];

  return (
    <div className="history-page-container">
      <h1>Payment History</h1>
      <table className="payment-history-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Mode of Payment</th>
            <th>Patient Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {paymentHistory.map((payment) => (
            <tr key={payment.id}>
              <td>{payment.date}</td>
              <td>{payment.modeOfPayment}</td>
              <td>{payment.Patient_name}</td>
              <td className={payment.isSuccess ? 'success' : 'failure'}>
                {payment.isSuccess ? 'Success' : 'Failure'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default History;
