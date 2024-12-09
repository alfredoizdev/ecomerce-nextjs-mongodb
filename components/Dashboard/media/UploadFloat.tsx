"use client";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import FolderPopup from "./UploadPopUp";
import { useState } from "react";
// import { CldUploadWidget } from "next-cloudinary";

const UploadFloat = () => {
  const [open, setOpen] = useState(false);

  const togglePopUp = () => {
    setOpen(!open);
  };

  return (
    <>
      {!open ? (
        <button
          onClick={togglePopUp}
          className="fixed bottom-6 right-6 z-50 bg-blue-600 text-white rounded-full shadow-lg p-4 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <IoMdAdd size={24} />
        </button>
      ) : (
        <button
          onClick={togglePopUp}
          className="fixed bottom-6 right-6 z-50 bg-red-600 text-white rounded-full shadow-lg p-4 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          <IoMdClose size={24} />
        </button>
      )}

      {open && <FolderPopup toogle={togglePopUp} />}
    </>
  );
};

export default UploadFloat;
