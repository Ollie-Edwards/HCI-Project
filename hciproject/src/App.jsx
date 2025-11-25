import React, { useEffect, useRef, useState } from "react";
import { FaUser } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { FaHistory } from "react-icons/fa";

export default function IPhoneScannerUI() {
  const videoRef = useRef(null);
  const [hasCamera, setHasCamera] = useState(false);

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
    // NO border, NO boxShadow
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

  return (
    <div style={{ padding: 24, display: "flex", justifyContent: "center" }}>
      <div style={phoneStyle}>
        {/* Full-screen camera */}
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
