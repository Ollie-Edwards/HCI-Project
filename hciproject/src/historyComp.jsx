import { IoMdClose } from "react-icons/io";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaHistory } from "react-icons/fa";

// History Component
const HistoryOverlay = ({ onClose }) => {
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

      <h2 style={{marginTop: 32}}>History</h2>
      <div style={{position: "absolute", top:52, right:50}}><FaHistory size={50}/></div>
      <div style={{fontSize:25, fontFamily:"Verdana"}}>
        <ul style={{listStyle: "none", margin:0, padding:0}}>
          <li className="scannedItem">
            <img src="Images/Scan1Img.png" height="100px" alt="Drinks Can"/> 
            <div className="scannedItemTextBox">
              <p>Drinks Can</p>
              <p>Box 1 <span style={{position: "relative", top:"5px", left:"135px"}}><RiDeleteBinLine size={25}/></span></p>
              <p>28/11/25</p>
            </div>
          </li>
          <li className="scannedItem">
            <img src="Images/Scan2Img.png" height="100px" alt="White Paper"/> 
            <div className="scannedItemTextBox">
              <p>White Paper</p>
              <p>Box 2 <span style={{position: "relative", top:"5px", left:"135px"}}><RiDeleteBinLine size={25}/></span></p>
              <p>28/11/25</p>
            </div>
          </li>
          <li className="scannedItem">
            <img src="Images/Scan3Img.png" height="100px" alt="Sweets Wrapper"/> 
            <div className="scannedItemTextBox">
              <p>Sweets Wrapper</p>
              <p>General Waste <span style={{position: "relative", top:"5px", left:"47px"}}><RiDeleteBinLine size={25}/></span></p>
              <p>27/11/25</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HistoryOverlay;
