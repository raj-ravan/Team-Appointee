import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import './History.css';

const History = () => {
  const [historyList, setHistoryList] = useState([]);
  const [phoneSearch, setPhoneSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchHistory = (phone = '') => {
    setLoading(true);
    const url = phone ? `http://localhost:4000/history?phoneNo=${phone}` : 'http://localhost:4000/history';
    Axios.get(url)
      .then((res) => {
        if (res.data.status === 'success') {
          setHistoryList(res.data.records);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchHistory(phoneSearch);
  };

  return (
    <div className="container mt-4 p-4">
      <h2 className="text-center my-4">Appointment History</h2>
      
      <form onSubmit={handleSearch} className="form-inline justify-content-center mb-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Filter by Phone Number"
            value={phoneSearch}
            onChange={(e) => setPhoneSearch(e.target.value)}
          />
          <div className="input-group-append">
            <button className="btn btn-primary" type="submit">Search</button>
          </div>
        </div>
      </form>

      {loading ? (
        <p className="text-center">Loading appointments...</p>
      ) : historyList.length === 0 ? (
        <p className="text-center">No appointment history records found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="thead-dark">
              <tr>
                <th>Patient Name</th>
                <th>Phone</th>
                <th>City / State</th>
                <th>Appointment Date</th>
                <th>Time Preferences</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {historyList.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.phone_no}</td>
                  <td>{item.city}, {item.state}</td>
                  <td>{item.appointment_date}</td>
                  <td>
                    <ul className="list-unstyled mb-0" style={{ fontSize: '13px' }}>
                      {item.preference1 && <li>1. {item.preference1}</li>}
                      {item.preference2 && <li>2. {item.preference2}</li>}
                      {item.preference3 && <li>3. {item.preference3}</li>}
                    </ul>
                  </td>
                  <td>
                    <span className="badge badge-info">{item.status || 'Pending'}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default History;
