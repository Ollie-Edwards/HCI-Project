import React, { useEffect, useRef, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { FaUser, FaHistory, FaUserCircle } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";

export default function IPhoneScannerUI() {
  const videoRef = useRef(null);
  const [hasCamera, setHasCamera] = useState(false);
  const [showHistory, setShowHistory] = useState(false); 
  const [showProfile, setShowProfile] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    async function startCamera() {
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
      } catch (err) {
        console.error("Camera error:", err);
        setHasCamera(false);
      }
    }
    startCamera();

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
    pointerEvents: "none",
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
  };

  const hint = {
    color: "rgba(255,255,255,0.9)",
    fontSize: 14,
    pointerEvents: "none",
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
    maxHeight: showHistory ? "40%" : "0", 
    opacity: showHistory ? 1 : 0,
    backgroundColor: "rgba(0,0,0,0.95)",
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
    maxHeight: showProfile ? "40%" : "0", 
    opacity: showProfile ? 1 : 0,
    backgroundColor: "rgba(0,0,0,0.95)",
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
    maxHeight: showSettings ? "40%" : "0", 
    opacity: showSettings ? 1 : 0,
    backgroundColor: "rgba(0,0,0,0.95)",
    color: "#fff",
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    padding: showSettings ? 16 : 0,
    pointerEvents: showSettings ? "auto" : "none",
    zIndex: 10,
    overflowY: "auto",
    transition: "max-height 0.3s ease, opacity 0.3s ease, padding 0.3s ease",
  };

  return (
    <div style={{ padding: 24, display: "flex", justifyContent: "center" }}>
      <div style={phoneStyle}>

        {hasCamera && (
          <video
            ref={videoRef}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        )}

   
        <div style={overlayStyle}>
          <div
            className="headerContainer"
            style={{ pointerEvents: "auto", padding: 10 }}
          >
            <div className="iconContainer" style={{ display: "flex", gap: 16 }}>
              <div
                className="icon"
                onClick={() => setShowHistory(!showHistory)}
                style={{ cursor: "pointer" }}
              >
                <FaHistory size={25} />
              </div>

              <div 
                className="icon" 
                onClick={() => setShowProfile(!showProfile)} 
                style={{ cursor: "pointer" }}
              >
                <FaUser size={25} />
              </div>

              <div 
                className="icon" 
                onClick={() => setShowSettings(!showSettings)}
                style={{ cursor: "pointer" }}
              >
                <IoIosSettings size={25} />
              </div>
            </div>
          </div>

          {showHistory && (
            <div style={historyTabStyle}>
              
              <div
                onClick={() => setShowHistory(false)}
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
                ×
              </div>

              <h3 style={{ marginTop: 32 }}>History</h3>
              <ul>
                <li>Scan 1</li>
                <li>Scan 2</li>
                <li>Scan 3</li>
              </ul>
            </div>
          )}

          {showProfile && (
            <div style={profileTabStyle}>
              
              <div
                onClick={() => setShowProfile(false)}
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
                ×
              </div>

              <h3 style={{ marginTop: 32 }}>Profile <FaUserCircle size={60}/></h3>
              <p>John <CiEdit /> </p>
              <p>Smith <CiEdit /> </p>
              <p>user@gmail.com <CiEdit /> </p> 
              <p></p>
              <p>Help</p>
            </div>
          )}

          {showSettings && (
            <div style={settingsTabStyle}>
              
              <div
                onClick={() => setShowSettings(false)}
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
                ×
              </div>

              <h3 style={{ marginTop: 32 }}>Settings</h3>
            </div>
          )}

          <div
            style={{
              height: 44,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={notch}>Camera View</div>
          </div>

          <div style={scannerArea}>
            <div style={scanBox}>
              <div style={cornerStyle(0, 0)} />
              <div style={cornerStyle(0, 1)} />
              <div style={cornerStyle(1, 0)} />
              <div style={cornerStyle(1, 1)} />
            </div>
          </div>

          <div style={bottomBar}>
            <div style={hint}>Align object inside the frame</div>
          </div>
        </div>
      </div>
    </div>
  );
}
