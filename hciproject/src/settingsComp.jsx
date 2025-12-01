import { useState } from "react";
import { IoIosSettings, IoMdClose } from "react-icons/io";

// Settings Component
const SettingsOverlay = ({ onClose }) => {
  const [showNotificationOptions, setShowNotificationOptions] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);

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

      <h2 style={{marginTop: 32}}>Settings</h2>
      <div style={{position: "absolute", top:43, right:42}}><IoIosSettings size={75}/></div>
        <label style={{display: "block", lineHeight: "1"}}><input type="checkbox"/> Track Scan History</label>
        <br/>
        <label style={{display: "block", lineHeight: "1"}}><input type="checkbox"/> Use My Current Location</label>
        <br/>
        <label style={{display: "block", lineHeight: "1"}}>
          <input 
            type="checkbox" 
            onChange={(e) => setShowNotificationOptions(e.target.checked)}
          /> 
          <span> Enable Notifications</span>
        </label>
      
        {showNotificationOptions && (
            <div style={{marginLeft: 30, marginTop:5}}>
            <label><input type="checkbox"/> Text Messages</label><br/>
            <label><input type="checkbox"/> Email</label><br/>
            <label><input type="checkbox"/> Push Notifications</label>
            </div>
        )}

        <button
          style={{
            position:"absolute", 
            top:"58%", 
            left:"17.5%", 
            width:250, 
            height:60, 
            backgroundColor:"rgba(41, 56, 72, 1)", 
            color:"white", 
            fontSize:"20px", 
            padding:0,
            display: showTutorial ? "none" : "block",
          }}
          onClick={() => (setShowTutorial(true))}
          >
            Open App Instructions
        </button>
        
        <div style={{
          position:"absolute", 
          top:"45%",
          width:"95%",
          left:"2.5%",
          fontSize: "16px",
          display: showTutorial ? "flex" : "none",
          marginTop:0
          }}>
          <ul style={{paddingLeft:18, paddingRight:5}} >
            <li>Place the item to identify in front of the camera.</li>
            <li>Once recognised, the colour coding will indicate which elements of the item are reyclable.</li>
            <li>Press the camera button to get more information, and to store the item in history.</li>
            <li>Press the history button to view, edit and delete your previously scanned items.</li>
            <li>Press the profile button to view, edit and delete your user information.</li>
            <li>Press the settings button to view and change the settings to customise your app experience.</li>
          </ul>
          <button style={{
            position:"absolute", 
            top:"95%", 
            left:"35%", 
            width:80, 
            height:30, 
            backgroundColor:"rgba(41, 56, 72, 1)", 
            color:"white", 
            fontSize:"16px", 
            padding:0,
            display: showTutorial ? "block" : "none"}}
          onClick = {() => (setShowTutorial(!showTutorial))}>
            Close
          </button>
        </div>


      </div>
  );
};

export default SettingsOverlay;