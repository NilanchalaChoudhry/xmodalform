import React, { useState } from "react";
import "./App.css";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const clickHandler = () => setIsOpen(true);

  const closeHandler = (e) => {
    if (e.target.className === "modal-content") setIsOpen(false);
  };

  // const submitHandler = (e) => {
  //   e.preventDefault();

  //   const username = e.target.username.value.trim();
  //   const email = e.target.email.value.trim();
  //   const phone = e.target.phoneNo.value.trim();
  //   const dob = e.target.dob.value;

  //   if (!username || !email || !phone || !dob) {
  //     alert("All fields are required.");
  //   } else if (!email.includes("@")) {
  //     alert("Invalid email. Please check your email address.");
  //   } else if (phone.length !== 10) {
  //     alert("Invalid phone number. Please enter a 10-digit phone number.");
  //   } else if (new Date(dob).getTime() > Date.now()) {
  //     alert("Invalid date of birth. Date of birth cannot be in the future.");
  //   } else {
  //     e.target.reset();
  //     setIsOpen(false);
  //   }
  // };
  const submitHandler = (e) => {
    e.preventDefault();

    const username = e.target.username.value.trim();
    const email = e.target.email.value.trim();
    const phone = e.target.phoneNo.value.trim();
    const dob = e.target.dob.value;

    if (!username) {
      alert("Please fill out this field.");
    } else if (!email) {
      alert("Email is required.");
    } else if (!email.includes("@")) {
      alert("Invalid email. Please check your email address.");
    } else if (!phone) {
      alert("Phone number is required.");
    } else if (phone.length !== 10) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
    } else if (!dob) {
      alert("Date of birth is required.");
    } else if (new Date(dob).getTime() > Date.now()) {
      alert("Invalid date of birth. Date of birth cannot be in the future.");
    } else {
      e.target.reset();
      setIsOpen(false);
    }
  };

  return (
    <div className="App">
      <h1>User Details Modal</h1>
      <button onClick={clickHandler}>Open Form</button>

      {isOpen && (
        <div className="modal-content" onClick={closeHandler}>
          <form onSubmit={submitHandler}>
            <h2>Fill Details</h2>
            <div className="input-group">
              <label htmlFor="username">Username: </label>
              <input type="text" name="username" id="username" />
            </div>
            <div className="input-group">
              <label htmlFor="email">Email Address:</label>
              <input type="email" name="email" id="email" />
            </div>
            <div className="input-group">
              <label htmlFor="phoneNo">Phone Number:</label>
              <input type="number" name="phoneNo" id="phone" />
            </div>
            <div className="input-group">
              <label htmlFor="dob">Date of Birth:</label>
              <input type="date" name="dob" id="dob" />
            </div>
            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
