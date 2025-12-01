import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaHistory } from "react-icons/fa";

const HistoryOverlay = ({ onClose }) => {

  const [items, setItems] = useState([
    {
      id: 1,
      img: "Images/Scan1Img.png",
      name: "Drinks Can",
      location: "Box 1",
      date: "28/11/25",
    },
    {
      id: 2,
      img: "Images/Scan2Img.png",
      name: "White Paper",
      location: "Box 2",
      date: "28/11/25",
    },
    {
      id: 3,
      img: "Images/Scan3Img.png",
      name: "Sweets Wrapper",
      location: "General Waste",
      date: "27/11/25",
    },
  ]);

  const deleteItem = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

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
      
      {/* Close Button */}
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

      <h2 style={{ marginTop: 32 }}>History</h2>
      <div style={{ position: "absolute", top: 52, right: 50 }}>
        <FaHistory size={50} />
      </div>

      <div style={{ fontSize: 25, fontFamily: "Verdana" }}>
        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {items.map(item => (
            <li className="scannedItem" key={item.id}>
              <img src={item.img} height="100px" alt={item.name} />
              <div className="scannedItemTextBox">
                <p>{item.name}</p>
                <p style={{ display: "flex", alignItems: "center" }}>
                  <span>{item.location}</span>

                  <span 
                    style={{ marginLeft: "auto", cursor: "pointer" }} 
                    onClick={() => deleteItem(item.id)}
                  >
                    <RiDeleteBinLine size={25} />
                  </span>
                </p>
                <p>{item.date}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
};

export default HistoryOverlay;
