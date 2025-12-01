import React, { useEffect, useRef, useState } from "react";
import { IoIosSettings, IoMdClose } from "react-icons/io";
import { FaCamera, FaUser, FaHistory, FaUserCircle } from "react-icons/fa";

// Import Overlay Components
import SettingsOverlay from "./settingsComp"
import HistoryOverlay from "./historyComp"
import ProfileOverlay from "./userComp"

// Main Component
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
    setFlash(1);

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

  const iconStyle = {
    width: "75px",
    height: "75px",
    minHeight: "75px",
    minWidth: "75px",
    backgroundColor: "#3191ff",
    borderRadius: "100%",
    color: "white",
    cursor: "pointer",
    display: "flex",
    visibility: showButtons ? "visible" : "hidden",
    alignItems: "center",
    justifyContent: "center"
  };

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

  const screenFlash = {
    position: "fixed",
    height: "100%",
    width: "100%",
    background: `rgba(0,0,0,${flash})`
  };

  const handleCloseOverlay = (overlayType) => {
    switch(overlayType) {
      case 'history':
        setShowHistory(false);
        break;
      case 'profile':
        setShowProfile(false);
        break;
      case 'settings':
        setShowSettings(false);
        break;
    }
    setShowButtons(true);
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
            <button style={activateButton} onClick={() => {startCamera(); setShowButtons(true);}}>
              Activate Camera
            </button>
          </div>
        )}

        <div style={screenFlash}></div>

        {/* Overlay UI */}
        <div style={overlayStyle}>
          <div className="headerContainer">
            <div className="iconContainer" style={{ display: "flex", gap: 16 }}>
              <div
                className="icon"
                onClick={() => {
                  setShowHistory(!showHistory);
                  setShowButtons(false);
                }}
                style={iconStyle}
              >
                <FaHistory size={35} />
              </div>

              <div 
                className="icon" 
                onClick={() => {
                  setShowProfile(!showProfile);
                  setShowButtons(false);
                }} 
                style={iconStyle}
              >
                <FaUser size={35} />
              </div>

              <div 
                className="icon" 
                onClick={() => {
                  setShowSettings(!showSettings);
                  setShowButtons(false);
                }}
                style={iconStyle}
              >
                <IoIosSettings size={50} />
              </div>
            </div>
          </div>

          {/* Conditional rendering of overlay components */}
          {showHistory && <HistoryOverlay onClose={() => handleCloseOverlay('history')} />}
          {showProfile && <ProfileOverlay onClose={() => handleCloseOverlay('profile')} />}
          {showSettings && <SettingsOverlay onClose={() => handleCloseOverlay('settings')} />}

          <div style={{ height: 44, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={notch}>Camera View</div>
          </div>

          <div style={scannerArea}>
            <div style={scanBox} className="overlayReticle">
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