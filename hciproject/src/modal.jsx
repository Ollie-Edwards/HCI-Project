import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

const Modal = ({ isOpen, onClose, onDelete }) => {
  if (!isOpen) return null;

    const styles = {
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.3)",
        backdropFilter: "blur(4px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
    },

    modal: {
        width: "380px",
        background: "#fff",
        borderRadius: "14px",
        padding: "24px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
        textAlign: "left",
        animation: "fadeIn 0.2s ease-out",
    },

    iconWrapper: {
        display: "flex",
        justifyContent: "center",
        marginBottom: "10px",
    },

    title: {
        fontSize: "22px",
        fontWeight: "600",
        margin: "10px 0",
    },

    text: {
        color: "#555",
        fontSize: "15px",
        margin: "10px 0 20px 0",
    },

    checkboxRow: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        marginBottom: "24px",
        fontSize: "14px",
    },

    checkbox: {
        width: "16px",
        height: "16px",
    },

    buttonRow: {
        display: "flex",
        justifyContent: "flex-end",
        gap: "12px",
    },

    deleteBtn: {
        padding: "10px 18px",
        backgroundColor: "#D9534F",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
    },

    cancelBtn: {
        padding: "10px 18px",
        backgroundColor: "#E5E5E5",
        color: "#333",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
    },
    };


  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        
        {/* Icon */}
        <div style={styles.iconWrapper}>
          <RiDeleteBin6Line size={40} color="#D9534F" />
        </div>

        <h2 style={styles.title}>Delete Account</h2>

        <p style={styles.text}>
          Are you sure you want to delete the account and all data linked to  
          <strong> products1@nicelydone.com?</strong>
          <br/>
          <br/>
          This includes: records of scans, location data, user data, and all accociated data
        </p>

        {/* Checkbox */}
        <label style={styles.checkboxRow}>
          <input type="checkbox" style={styles.checkbox} />
            <p style={ styles.text}>I understand that I won't be able to recover my account.</p>
        </label>

        {/* Buttons */}
        <div style={styles.buttonRow}>
          <button style={styles.deleteBtn} onClick={onDelete}>Delete</button>
          <button style={styles.cancelBtn} onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
