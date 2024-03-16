import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const FileDetail = () => {
  const { id } = useParams();
  const [fileDataFromBackend, setfileDataFromBackend] = useState([]);
  const [Loading, setLoading] = useState(null);

  let location = useLocation();

  useEffect(() => {
    handleFetchDataForSingleFiles(id);
  }, []);
  const handleFetchDataForSingleFiles = async (fileId) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:4000/file/${fileId}`);
      console.log("File data fetched successfully:", response.data);
      // setJsonData(response.data);
      setfileDataFromBackend(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching file data:", error);
      toast.error(error.response.data.error);
      setLoading(false);
    }
  };
  return (
    <div>
      {Loading && <h1 className="text-center my-2">Loading..</h1>}
      {fileDataFromBackend && fileDataFromBackend.length > 0 && (
        <>
          <h1 className=" mb-4 text-xl text-center font-extrabold   dark:text-white">
            Data of file {location.state.filename} is
          </h1>
          <table className="table">
            <thead>
              <tr>
                {fileDataFromBackend.length > 0 &&
                  Object.keys(fileDataFromBackend[0]).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {fileDataFromBackend.length > 0 &&
                fileDataFromBackend.map((row, index) => (
                  <tr key={index}>
                    {Object.values(row).map((value, index) => (
                      <td key={index}>{value}</td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default FileDetail;
