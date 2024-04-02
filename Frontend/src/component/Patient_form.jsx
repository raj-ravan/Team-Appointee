import React, { Fragment, useEffect, useState } from "react";
import "./Patient_form.css";
import Axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Patient_Form = () => {
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [appointmentDate, setAppointmentDate] = useState(null);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  
  const [selectedPreferences, setSelectedPreferences] = useState([
    { preference: "" },
    { preference: "" },
    { preference: "" },
  ]);
  const appointmentPreferences = [
    { value: "Morning (9am - 12pm)", label: "Morning (9am - 12pm)" },
    { value: "Evening (2pm - 5pm)", label: "Evening (2pm - 5pm)" },
    { value: "Night (7pm - 9pm)", label: "Night (7pm - 9pm)" },
  ];

  const handlePreferenceChange = (index, preference) => {
    const updatedPreferences = selectedPreferences.map((item, i) => {
      if (index === i) {
        return { preference}
      }
      else {
        return item;
      }
    });

    updatedPreferences[index].preference = preference;
  
    // Disable selected preference in subsequent fields
    updatedPreferences.forEach((item, i) => {
      if (i > index && item.preference === preference) {
        updatedPreferences[i].preference = ""; // Clear the selection in subsequent fields
      }
    });
  
    setSelectedPreferences(updatedPreferences);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("inside patient form");
    Axios.post("http://localhost:4000/patient", {
      name : name,
      dateOfBirth : dateOfBirth,
      gender  : gender, 
      phoneNo : phoneNo,
      address : address,
      city  : city,
      state : state,
      appointmentDate : appointmentDate,
      preference1: selectedPreferences[0].preference,
      preference2: selectedPreferences[1].preference,
      preference3: selectedPreferences[2].preference,

    })
      .then((response) => {
        console.log(response);
        alert("Patient form filled successfully!");
      })
      .catch((error) => {
        console.error(error);
        setIsFormSubmitted(true);
        alert("Error submitting patient form. Please try again.");
      });
  };

  // Setting tomorrow's date for the appointment
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1); // Get tomorrow's date

  // Setting 5 days from now in the future for the appointment
  const fiveDaysFromNow = new Date();
  fiveDaysFromNow.setDate(fiveDaysFromNow.getDate() + 5); // Get the date 5 days from now

  return (
    <>
      <div className="container mt-4 p-4">
        <div className="col-md-6">
          <form
            name="frmContact"
            className="needs-validation"
            method="post"
            onSubmit={handleSubmit}
          >
            <h2 className="text-center my-4">Doctor Appointment Request Form</h2>
            <p className="text-center my-4">
              Fill the form below, and we will get back to you soon to update and plan your appointment.
            </p>

            <div className="form-group row">
              <label className="col-sm-4 col-lg-4">Name</label>
              <div className="col-sm-8 col-lg-8">
                <input
                  type="text"
                  id="Name"
                  className="form-control"
                  placeholder="Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group row">
              <label className="col-sm-4 col-lg-4">Date of Birth</label>
              <div className="col-sm-8 col-lg-8">
                <DatePicker
                  id="date"
                  className="form-control"
                  selected={dateOfBirth}
                  onChange={(date) => setDateOfBirth(date)}
                  dateFormat="yyyy-MM-dd"
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  placeholderText="Select a date"
                  required
                />
              </div>
            </div>

            <div className="form-group row">
              <label className="col-sm-4 col-lg-4">Gender</label>
              <div className="col-sm-8 col-lg-8">
                <select
                  id="gender"
                  className="form-control"
                  required
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">Please select one…</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="non-binary">Non-Binary</option>
                </select>
              </div>
            </div>

            <div className="form-group row">
              <label className="col-sm-4 col-lg-4">Phone Number</label>
              <div className="col-sm-8 col-lg-8">
                <input
                  type="tel"
                  id="Phone"
                  className="form-control"
                  placeholder="1234567890"
                  required
                  value={phoneNo}
                  onChange={(e) => setPhoneNo(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group row">
              <label className="col-sm-4 col-lg-4">Address</label>
              <div className="col-sm-8 col-lg-8">
                <input
                  type="text"
                  id="address"
                  className="form-control"
                  placeholder="Address"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group row">
              <label className="col-sm-4 col-lg-4">City</label>
              <div className="col-sm-8 col-lg-8">
                <input
                  type="text"
                  id="city"
                  className="form-control"
                  placeholder="City"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group row">
              <label className="col-sm-4 col-lg-4">State</label>
              <div className="col-sm-8 col-lg-8">
                <input
                  type="text"
                  id="state"
                  className="form-control"
                  placeholder="State"
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group row">
              <label className="col-sm-4 col-lg-4">Appointment Date</label>
              <div className="col-sm-8 col-lg-8">
                <DatePicker
                  id="appointmentDate"
                  className="form-control"
                  selected={appointmentDate}
                  onChange={(date) => setAppointmentDate(date)}
                  minDate={tomorrow}
                  maxDate={fiveDaysFromNow}
                  dateFormat="yyyy-MM-dd"
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  placeholderText="Select a date"
                  required
                />
              </div>
            </div>

            {selectedPreferences.map((selectedPreference, index) => (
  <div key={index}>
    <div className="form-group row">
      <label className="col-sm-4 col-lg-4">Preference {index + 1}</label>
      <div className="col-sm-8 col-lg-8">
        <select
          id={`preference${index + 1}`}
          className="form-control"
          required
          value={selectedPreference.preference}
          onChange={(e) => handlePreferenceChange(index, e.target.value)}
        >
          <option value="">Select preference</option>
          {appointmentPreferences.map((preference) => {
            const isPreferenceDisabled =
              index > 0 &&
              selectedPreferences
                .slice(0, index)
                .some((prevPreference) => prevPreference.preference === preference.value);
            return (
              <option
                key={preference.value}
                value={preference.value}
                disabled={isPreferenceDisabled}
              >
                {preference.label}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  </div>
))}

            
            <div className="form-group row">
              <div className="col-sm-12 text-center">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Patient_Form;
