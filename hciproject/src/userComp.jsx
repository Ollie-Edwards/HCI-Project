import React, {useState} from 'react';
import { IoMdClose } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { FaUserCircle, FaUser } from "react-icons/fa";
import Modal from "./modal.jsx";

// Profile Component
const ProfileOverlay = ({ onClose }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
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
    }}>
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
        <IoMdClose size={40} onClick={onClose}/>
      </div>

      <h2 style={{marginTop:32}}>Profile</h2>
      <div style={{position: "absolute", top:52, right:50}}><FaUser size={50}/></div>
      <div style={{position: "absolute", top:135, right:40}}><FaUserCircle size={150}/> <FiEdit /></div>
      <p><strong>Forename: </strong><br/>John <FiEdit /> </p>
      <p><strong>Surname: </strong><br/>Smith <FiEdit /> </p>
      <p><strong>Email: </strong><br/>johnsmith@gmail.com <FiEdit /> </p> 
      <p><strong>Location: </strong><br/>Bath, BA2 7AY <FiEdit /> </p> 
      <p><strong>Help</strong><br/>Contact: help@recyclingBuddy.com</p>
    
      <button 
        style={{position:"absolute", top:"70%", left:"25%", width:200, height:50, backgroundColor:"rgba(41, 56, 72, 1)", color:"white", fontSize:"17px", padding:0}} 
        onClick={() => setOpen(true)}>
        Delete All User Data
      </button>

      <Modal 
        isOpen={open}
        onClose={() => setOpen(false)}
        onDelete={() => {
          alert("Account deleted!");
          setOpen(false);
        }}
      />
    </div>
  );
};

export default ProfileOverlay;