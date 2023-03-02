import React, { useState } from "react";

const ScoreForm = ({ addScore }) => {
  const [attendeeInfo, setAttendeeInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    shirt: "",
    skillLevel: "",
  });

  const handleChange = (event) => {
    event.preventDefault();
    setAttendeeInfo({ ...attendeeInfo, [event.target.id]: event.target.value });
  };

  const submitForm = () => {
    addScore(attendeeInfo);
  };

  return (
    <div className="attendee-form">
      <h2>Register Attendee</h2>
      <label>First Name: </label>
      <input type="text" id="firstName" onChange={handleChange}></input>
      <label>Last Name: </label>
      <input type="text" id="lastName" onChange={handleChange}></input>
      <label>Email: </label>
      <input type="email" id="email" onChange={handleChange}></input>
      <label>Shirt Size:</label>
      <select onChange={handleChange} id="shirt">
        <option value="XS">XS</option>
        <option value="S">S</option>
        <option value="M">M</option>
        <option value="L">L</option>
        <option value="XL">XL</option>
        <option value="XXL">XXL</option>
      </select>
      <label>Skill Level:</label>
      <select onChange={handleChange} id="skillLevel">
        <option value="beginner">beginner</option>
        <option value="intermediate">intermediate</option>
        <option value="expert">expert</option>
      </select>
      <button onClick={submitForm}>REGISTER</button>
    </div>
  );
};

export default ScoreForm;
