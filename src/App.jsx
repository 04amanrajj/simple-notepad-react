import React, { useState, useEffect } from "react";
import { Alert } from "@mui/material";
import { motion } from "framer-motion";

function App() {
  const [note, setNote] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  // Load saved note from local storage on mount
  useEffect(() => {
    const savedNote = localStorage.getItem("note");
    if (savedNote) {
      setNote(savedNote);
    }
  }, []);

  // Save note to local storage with debouncing effect
  useEffect(() => {
    const saveNote = setTimeout(() => {
      localStorage.setItem("note", note);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2000); // Show alert for 2 seconds
    }, 1000); // Save after 1 sec of inactivity

    return () => clearTimeout(saveNote);
  }, [note]);

  const AlertMsg = ({ showAlert }) => {
    return (
      <motion.div
        initial={{ y: "-100%", opacity: 0 }}
        animate={showAlert ? { y: 0, opacity: 1 } : { y: "-100%", opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{
          position: "fixed",
          top: 0,
          transform: "translateX(-50%)",
          width: "100%",
          zIndex: 1000,
        }}
      >
        <Alert severity="success">Note saved successfully!</Alert>
      </motion.div>
    );
  };

  return (
    <>
      <AlertMsg showAlert={showAlert} />
      <div className="notepad bg-gray-100 flex h-screen flex-col">
        <h1 className="text-4xl p-4 font-bold" style={{backgroundColor: "#F8ED8C"}}>Notepad</h1>
        <hr className="w-full border-black" />
        <textarea
          className="m-2 p-6 rounded-xl border-black"
          style={{ height: '88vh', resize: "none", border: "1px solid gray" }}
          value={note}
          onChange={(e) => setNote(e.target.value)}
        ></textarea>
      </div>
    </>
  );
}

export default App;
