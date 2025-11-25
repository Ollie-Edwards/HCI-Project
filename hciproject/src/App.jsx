import React, { useEffect, useRef, useState } from "react";
import { User, Settings, History } from "lucide-react";
import { FaUser } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { FaHistory } from "react-icons/fa";

export default function IPhoneScannerUI() {
  const videoRef = useRef(null);
  const [hasCamera, setHasCamera] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);

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
    pointerEvents: "none",
    zIndex: 1,
  };

  const headerContainer = {
    padding: "16px 20px",
    display: "flex",
    justifyContent: "flex-end",
    gap: 16,
  };

  const iconStyle = {
    width: 40,
    height: 40,
    borderRadius: "50%",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    backdropFilter: "blur(10px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    cursor: "pointer",
    pointerEvents: "auto",
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
            <button style={activateButton} onClick={startCamera}>
              Activate Camera
            </button>
          </div>
        )}

        {/* Overlay UI */}
        <div style={overlayStyle}>

          <div className="headerContainer">
            <div className="iconContainer">
              
              <div className="icon">
                <FaHistory size={25} />
              </div>

              <div className="icon">
                <FaUser size={25} />
              </div>

              <div className="icon">
                <IoIosSettings size={25} />
              </div>
            </div>
          </div>

          <div style={{ height: 44, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={notch}>Camera View</div>
          </div>

          <div style={scannerArea}>
            <div style={scanBox}>
              {/* Only corners, no box or overlay */}
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