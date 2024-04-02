import React, { useState } from 'react';
import Axios from 'axios';
import './Appointment.css';
import { useNavigate } from 'react-router-dom';

const Appointment = () => {
  const [subdistrictapp, setsubdistrictapp] = useState('');
  const [specializationapp, setspecializationapp] = useState('');
  const [selhospitalapp, setselhospitalapp] = useState('');
  const navigate = useNavigate();

  const appointment = (e) => {
    e.preventDefault();
    console.log('inside appointment');
    Axios.post('http://localhost:4000/appointment', {
      State: 'maharashtra', // Set the state value directly
      District: 'navi_mumbai', // Set the district value directly
      SubDistrict: subdistrictapp,
      Specialization: specializationapp,
      SelectHospital: selhospitalapp,
    }).then((response) => {
      console.log(response);
    });

    navigate(`/Patient_form`, { replace: true });
  };

  // Define a mapping of specialization options to corresponding hospital options
  const hospitalOptions = {
    clinic: ['abc', 'xyz', 'mnc'],
    dentist: ['pqr', 'lmn', 'stu'],
    skin_prob: ['def', 'ghi', 'jkl'],
    };

  const handleSpecializationChange = (e) => {
    const selectedSpecialization = e.target.value;
    setspecializationapp(selectedSpecialization);
    setselhospitalapp(''); // Reset the selected hospital when the specialization changes
  };

  return (
    <>
      <div className="Appoint">
        <div className="container mt-4 p-4">
          <div className="col-md-6">
            <form
              name="frmContact"
              className="needs-validation "
              method="post"
            />
            <h2 className="text-center my-4">Need an appointment?</h2>
            <p className="text-center my-4">
              Fill the details of the hospital and get your appointment fixed online!!!
            </p>

            <div className="form-group row">
              <label className="col-sm-4 col-lg-4">State</label>
              <div className="col-sm-8 col-lg-8">
                <p>Maharashtra</p> {/* Display the state directly */}
              </div>
            </div>

            <div className="form-group row">
              <label className="col-sm-4 col-lg-4">District</label>
              <div className="col-sm-8 col-lg-8">
                <p>Navi Mumbai</p> {/* Display the district directly */}
              </div>
            </div>

            <div className="form-group row">
              <label className="col-sm-4 col-lg-4">Sub District</label>
              <div className="col-sm-8 col-lg-8">
                <select value={subdistrictapp} onChange={(e) => setsubdistrictapp(e.target.value)}>
                  <option value="">Please select</option>
                  <option value="kharghar">Kharghar</option>
                  <option value="Vashi">Vashi</option>
                </select>
              </div>
            </div>

            <div className="form-group row">
              <label className="col-sm-4 col-lg-4">Specialization</label>
              <div className="col-sm-8 col-lg-8">
                <select value={specializationapp} onChange={handleSpecializationChange}>
                  <option value="">Please select</option>
                  <option value="clinic">Clinic</option>
                  <option value="dentist">Dental</option>
                  <option value="skin_prob">Skin-Problems</option>
                </select>
              </div>
            </div>

            <div className="form-group row">
              <label className="col-sm-4 col-lg-4">Select Hospital</label>
              <div className="col-sm-8 col-lg-8">
                <select value={selhospitalapp} onChange={(e) => setselhospitalapp(e.target.value)}>
                  <option value="">Please select</option>

                  {hospitalOptions[specializationapp]?.map((hospital) => (
                    <option key={hospital} value={hospital}>
                      {hospital}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group row justify-content-end">
              <div className="col-sm-5">
                <button onClick={appointment} type="submit" className="btn btn-form">
                  Next Step
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Appointment;
