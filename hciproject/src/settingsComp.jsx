import { useState } from "react";
import { IoIosSettings, IoMdClose } from "react-icons/io";

// Settings Component
const SettingsOverlay = ({ onClose }) => {
  const [showNotificationOptions, setShowNotificationOptions] = useState(false);

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
      <label><input type="checkbox"/> Track Scan History</label><p></p>
      <br/>
      <label><input type="checkbox"/> Use My Current Location</label><p></p>
      <br/>
      <label>
        <input 
          type="checkbox" 
          onChange={(e) => setShowNotificationOptions(e.target.checked)}
        /> 
        Enable Notifications
      </label>
      
        {showNotificationOptions && (
            <div style={{marginLeft: 30, marginTop: 10}}>
            <label><input type="checkbox"/> Text Messages</label><br/>
            <label><input type="checkbox"/> Email</label><br/>
            <label><input type="checkbox"/> Push Notifications</label>
            </div>
        )}
      </div>
  );
};

export default SettingsOverlay;