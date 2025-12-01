import React from 'react';
import { IoMdClose } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";

// Profile Component
const ProfileOverlay = ({ onClose }) => {
  const profileTabStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "100%",
    backgroundColor: "rgba(0,122,255,0.8)",
    color: "#fff",
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    padding: 16,
    zIndex: 10,
    overflowY: "auto",
  };

  return (
    <div style={profileTabStyle}>
      <div
        onClick={onClose}
        style={{
          position: "absolute",
          top: 8,
          right: 12,
          fontSize: 20,
          cursor: "pointer",
          color: "#fff",
          userSelect: "none",
        }}
      >
        <IoMdClose size={40}/>
      </div>

      <h2 style={{marginTop:32}}>Profile</h2>
      <div style={{position: "absolute", top:52, right:50}}><FaUser size={50}/></div>
      <div style={{position: "absolute", top:135, right:40}}><FaUserCircle size={150}/> <FiEdit /></div>
      <p><strong>Forename: </strong><br/>John <FiEdit /> </p>
      <p><strong>Surname: </strong><br/>Smith <FiEdit /> </p>
      <p><strong>Email: </strong><br/>johnsmith@gmail.com <FiEdit /> </p> 
      <p><strong>Location: </strong><br/>Bath, BA2 7AY <FiEdit /> </p> 
      <p><strong>Help</strong><br/>Contact: help@recyclingBuddy.com</p>
    </div>
  );
};

export default ProfileOverlay;