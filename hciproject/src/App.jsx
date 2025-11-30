import React, { useEffect, useRef, useState } from "react";
import { IoIosSettings, IoMdClose } from "react-icons/io";
//import { CiEdit } from "react-icons/ci";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaCamera, FaUser, FaHistory, FaUserCircle } from "react-icons/fa";

export default function IPhoneScannerUI() {
  const videoRef = useRef(null);
  const [hasCamera, setHasCamera] = useState(0);
  const [cameraActive, setCameraActive] = useState(false);

  const [showHistory, setShowHistory] = useState(false); 
  const [showProfile, setShowProfile] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  
  const [flash, setFlash] = useState(0);
  
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setHasCamera(true);
      setCameraActive(true);
    } catch (err) {
      console.error("Camera error:", err);
      setHasCamera(false);
    }
  };

  const flashEffect = () => {
    setFlash(1)

    let i = 1;
    const interval = setInterval(() => {
      i -= 0.1;
      if (i <= 0) {
        i = 0;
        clearInterval(interval);
      }
      setFlash(i);
    }, 30);    
  };

  useEffect(() => {
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);
  
  const phoneStyle = {
    width: 390,
    height: 844,
    borderRadius: 42,
    overflow: "hidden",
    boxShadow: "0 30px 60px rgba(0,0,0,0.35)",
    border: "12px solid #111",
    position: "relative",
    backgroundColor: "#000",
  };

  const overlayStyle = {
    position: "absolute",
    inset: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    zIndex: 1,
  };

  const headerContainer = {
    padding: "16px 20px",
    display: "flex",
    justifyContent: "flex-end",
    gap: 16,
  };

  const iconStyle = {
    width: "75px",
    height: "75px",
    minHeight: "75px",
    minWidth: "75px",
    backgroundColor: "#3191ff",
    borderRadius: "100%",
    color: "white",
    cursor: "pointer",
    /* Center icons in div */
    display: "flex",
    visibility: showButtons ? "visible" : "hidden",
    alignItems: "center",
    justifyContent: "center"
  }

  const scannerArea = {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  };

  const scanBox = {
    width: 260,
    height: 260,
    position: "relative",
  };

  const cornerStyle = (top, left) => ({
    width: 28,
    height: 28,
    borderStyle: "solid",
    borderColor: "#FFFFFF",
    borderWidth: "3px",
    position: "absolute",
    borderRadius: 4,
    boxSizing: "border-box",
    transform: "translate(-50%, -50%)",
    ...(top === 0 ? { top: 0 } : { bottom: 0 }),
    ...(left === 0 ? { left: 0 } : { right: 0 }),
    background: "transparent",
    borderTopWidth: top === 0 ? 3 : 0,
    borderLeftWidth: left === 0 ? 3 : 0,
    borderRightWidth: left === 0 ? 0 : 3,
    borderBottomWidth: top === 0 ? 0 : 3,
  });

  const bottomBar = {
    height: 96,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 18,
    paddingBottom: 20,
  };

  const hint = {
    color: "rgba(255,255,255,0.9)",
    fontSize: 14,
    pointerEvents: "none",
    textShadow: "0 2px 4px rgba(0,0,0,0.5)",
  };

  const activateButton = {
    padding: "14px 32px",
    backgroundColor: "#007AFF",
    color: "#fff",
    border: "none",
    borderRadius: 24,
    fontSize: 16,
    fontWeight: "600",
    cursor: "pointer",
    pointerEvents: "auto",
    boxShadow: "0 4px 12px rgba(0, 122, 255, 0.4)",
  };

  const notch = {
    position: "absolute",
    top: 6,
    left: "50%",
    transform: "translateX(-50%)",
    width: 210,
    height: 30,
    borderRadius: 18,
    background: "rgba(0,0,0,0.35)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "rgba(255,255,255,0.6)",
    fontSize: 12,
    pointerEvents: "none",
  };

 const historyTabStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    maxHeight: showHistory ? "100%" : "0", 
    height: "100%", 
    opacity: showHistory ? 1 : 0,
    backgroundColor: "rgba(0,122,255,0.8)",
    color: "#fff",
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    padding: showHistory ? 16 : 0,
    pointerEvents: showHistory ? "auto" : "none",
    zIndex: 10,
    overflowY: "auto",
    transition: "max-height 0.3s ease, opacity 0.3s ease, padding 0.3s ease",
  };

  const profileTabStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    maxHeight: showProfile ? "100%" : "0", 
    height: "100%", 
    opacity: showProfile ? 1 : 0,
    backgroundColor: "rgba(0,122,255,0.8)",
    color: "#fff",
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    padding: showProfile ? 16 : 0,
    pointerEvents: showProfile ? "auto" : "none",
    zIndex: 10,
    overflowY: "auto",
    transition: "max-height 0.3s ease, opacity 0.3s ease, padding 0.3s ease",
  };

  const settingsTabStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    maxHeight: showSettings ? "100%" : "0", 
    height: "100%", 
    opacity: showSettings ? 1 : 0,
    backgroundColor: "rgba(0,122,255,0.8)",
    color: "#fff",
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    padding: showSettings ? 16 : 0,
    pointerEvents: showSettings ? "auto" : "none",
    zIndex: 10,
    overflowY: "auto",
    transition: "max-height 0.3s ease, opacity 0.3s ease, padding 0.3s ease",
  };

  const screenFlash = {
    position: "fixed",
    height: "100%",
    width: "100%",
    background: `rgba(0,0,0,${flash})`
  };

  return (
    <div style={{ padding: 0, display: "flex", justifyContent: "center", minHeight: "100vh", alignItems: "center", backgroundColor: "#000", position: "fixed", inset: 0 }}>
      <div style={{ ...phoneStyle, width: "100vw", height: "100vh", border: "none", borderRadius: 0, boxShadow: "none" }}>
        {/* Full-screen camera */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        
        {!cameraActive && (
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "#fff",
            fontSize: 16,
            padding: 20,
            textAlign: "center",
            flexDirection: "column",
            gap: 20,
            zIndex: 2,
          }}>
            <div>Ready to scan</div>
            <button style={activateButton} onClick={() => {startCamera(), setShowButtons(true)}}>
              Activate Camera
            </button>
          </div>
        )}

        <div style={screenFlash}></div>

        {/* Overlay UI */}
        <div style={overlayStyle}>

          <div className="headerContainer">
            <div className="iconContainer"  style={{ display: "flex", gap: 16 }}>
              
              <div
                className="icon"
                onClick={() => {
                  setShowHistory(!showHistory)
                  setShowButtons(false)
                }}
                style={iconStyle}
              >
                <FaHistory size={35} />
              </div>

              <div 
                className="icon" 
                onClick={() => {
                  setShowProfile(!showProfile)
                  setShowButtons(false)
                }} 
                style={iconStyle}
              >
                <FaUser size={35} />
              </div>

              <div 
                className="icon" 
                onClick={() => {
                  setShowSettings(!showSettings);
                  setShowButtons(false)
                }}
                style={iconStyle}
              >
                <IoIosSettings size={50} />
              </div>
            </div>
          </div>

          {showHistory && (
            <div style={historyTabStyle}>
              
              <div
                onClick={() => {
                  setShowHistory(false)
                  setShowButtons(true)
                }}
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
                < IoMdClose size={40}/>
              </div>

              <h2 style={{marginTop: 32}}>History </h2>
              <div style={{position: "absolute", top:52,right:50}}><FaHistory size={50}/></div>
              <div style={{fontSize:25, fontFamily:"Verdana"}}>
                <ul style={{listStyle: "none", margin:0,padding:0}}>
                  <li className="scannedItem">
                    <img src="Images/Scan1Img.png" height="100px"/> 
                    <div className = "scannedItemTextBox">
                      <p>Drinks Can</p>
                      <p>Box 1 <span style={{position: "relative", top:"5px", left:"135px"}}><RiDeleteBinLine size={25}/></span></p>
                      <p>28/11/25</p>
                    </div>
                  </li>
                  <li className="scannedItem">
                    <img src="Images/Scan2Img.png" height="100px"/> 
                    <div className = "scannedItemTextBox">
                      <p>White Paper</p>
                      <p>Box 2 <span style={{position: "relative", top:"5px", left:"135px"}}><RiDeleteBinLine size={25}/></span></p>
                      <p>28/11/25</p>
                    </div>
                  </li>
                  <li className="scannedItem">
                    <img src="Images/Scan3Img.png" height="100px"/> 
                    <div className = "scannedItemTextBox">
                      <p>Sweets Wrapper</p>
                      <p>General Waste <span style={{position: "relative", top:"5px", left:"47px"}}><RiDeleteBinLine size={25}/></span></p>
                      <p>27/11/25</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {showProfile && (
            <div style={profileTabStyle}>

              <div
                onClick={() => {
                  setShowProfile(false)
                  setShowButtons(true)
                }}
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
                < IoMdClose size={40}/>
              </div>

              <h2 style={{ marginTop:32}}>Profile</h2>
              <div style={{position: "absolute", top:52, right:50}}><FaUser size={50}/></div>
              <div style = {{position: "absolute", top:135, right:40}}><FaUserCircle size={150}/> <FiEdit font-size="20px"/></div>
              <p><strong>Forename: </strong><br/>John <FiEdit /> </p>
              <p><strong>Surname: </strong><br/>Smith <FiEdit /> </p>
              <p><strong>Email: </strong><br/>johnsmith@gmail.com <FiEdit /> </p> 
              <p><strong>Location: </strong><br/>Bath, BA2 7AY <FiEdit /> </p> 
              <p><strong>Help</strong><br/>Contact: help@recyclingBuddy.com</p>
              <p></p>
            </div>
          )}

          {showSettings && (
            <div style={settingsTabStyle}>
              
              <div
                onClick={() => {
                  setShowSettings(false)
                  setShowButtons(true)
                }}
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
                < IoMdClose size={40}/>
              </div>

              <h2 style={{ marginTop: 32}}>Settings </h2>
              <div style={{position: "absolute", top:43,right:42}}><IoIosSettings size={75}/></div>
              <label><input type="checkbox"></input> Track Scan History</label><p></p>
              <br/>
              <label><input type="checkbox"></input> Store My Current Location</label><p></p>
              <br/>
              <label><input type="checkbox"></input> Enable Notifications</label>
            </div>
          )}

          <div style={{ height: 44, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={notch}>Camera View</div>
          </div>

          <div style={scannerArea}>
            <div style={scanBox} className="overlayReticle">
              {/* Only corners, no box or overlay */}
              <div style={cornerStyle(0, 0)} />
              <div style={cornerStyle(0, 1)} />
              <div style={cornerStyle(1, 0)} />
              <div style={cornerStyle(1, 1)} />
            </div>
          </div>

          <div style={bottomBar} className="bottomButton">
              <div
                style={iconStyle}
                onClick={flashEffect}
              >
                <FaCamera size={35} />
              </div>
            <div style={hint}>Align object inside the frame</div>
          </div>
        </div>
      </div>
    </div>
  );
}