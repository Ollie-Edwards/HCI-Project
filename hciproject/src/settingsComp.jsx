import { IoIosSettings, IoMdClose } from "react-icons/io";

// Settings Component
const SettingsOverlay = ({ onClose }) => {
  const settingsTabStyle = {
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
    <div style={settingsTabStyle}>
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

      <h2 style={{marginTop: 32}}>Settings</h2>
      <div style={{position: "absolute", top:43, right:42}}><IoIosSettings size={75}/></div>
      <label><input type="checkbox"/> Track Scan History</label><p></p>
      <br/>
      <label><input type="checkbox"/> Store My Current Location</label><p></p>
      <br/>
      <label><input type="checkbox"/> Enable Notifications</label>
    </div>
  );
};

export default SettingsOverlay;
