import React from "react";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import HeroSection from "./HeroSection";
import Navbar from "./Navbar";
import toast from "react-hot-toast";

import axios from "axios";

const Home = () => {
  const [file, setFile] = useState(null);
  const [fileUploadLoading, setFileUploadLoading] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFileUploadLoading(true);
    const formData = new FormData();

    formData.append("file", file);
    try {
      const response = await axios.post(
        "http://localhost:4000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("File uploaded successfully:", response.data);
      toast.success("File uploaded successfully");
      setFileUploadLoading(false);
      setFile(null);
      // setFileId(response.data.fileId);
      // handleFetchDataForSingleFiles(response.data.fileId);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div>
      <HeroSection
        handleFileUpload={handleFileChange}
        file={file}
        handleSubmit={handleSubmit}
        loading={fileUploadLoading}
      />
    </div>
  );
};

export default Home;
