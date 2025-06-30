import React, { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    dob: ""
  });
  const [validationError, setValidationError] = useState("");
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleCloseModal();
      }
    };

    if (isOpen) {
      document.body.classList.add("modal-open");
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.body.classList.remove("modal-open");
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.body.classList.remove("modal-open");
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleOpenModal = () => setIsOpen(true);

  const handleCloseModal = () => {
    setIsOpen(false);
    setValidationError("");
    setFormData({ username: "", email: "", phone: "", dob: "" });
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, phone, dob } = formData;

    if (!username || !email || !phone || !dob) {
      setValidationError("Please fill in all fields.");
      return;
    }

    if (!email.includes("@")) {
      setValidationError("Invalid email. Please check your email address.");
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      setValidationError("Invalid phone number. Please enter a 10-digit phone number.");
      return;
    }

    const today = new Date();
    const dobDate = new Date(dob);
    if (dobDate >= today) {
      setValidationError("Invalid date of birth.");
      return;
    }

    setValidationError("");
    handleCloseModal();
  };

  return (
    <div className="App">
      <h1>User Details Modal</h1>
      <button className="open-button" onClick={handleOpenModal}>
        Open Form
      </button>

      {isOpen && (
        <div className="modal">
          <div className="modal-content" ref={modalRef}>
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" onChange={handleInputChange} value={formData.username} />
              </div>
              <div className="input-group">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" onChange={handleInputChange} value={formData.email} />
              </div>
              <div className="input-group">
                <label htmlFor="phone">Phone:</label>
                <input type="text" id="phone" onChange={handleInputChange} value={formData.phone} />
              </div>
              <div className="input-group">
                <label htmlFor="dob">Date of Birth:</label>
                <input type="date" id="dob" onChange={handleInputChange} value={formData.dob} />
              </div>
              <button type="submit" className="submit-button">
                Submit
              </button>
            </form>
            {validationError && <p className="error-message">{validationError}</p>}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
