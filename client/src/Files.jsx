import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Files = () => {
  const [filesDataFromBackend, setfilesDataFromBackend] = useState([]);
  const navigate = useNavigate();
  const handleFetchDataForAllFiles = async (fileId) => {
    try {
      const response = await axios.get("http://localhost:4000/allFiles");
      console.log("Files data fetched successfully:", response.data);
      setfilesDataFromBackend(response.data);
    } catch (error) {
      console.error("Error fetching file data:", error);
    }
  };
  useEffect(() => {
    handleFetchDataForAllFiles();
    // handleFetchDataForSingleFiles();
  }, []);
  const handleFetchDataForSingleFiles = async (fileId) => {
    try {
      const response = await axios.get(`http://localhost:4000/file/${fileId}`);
      console.log("File data fetched successfully:", response.data);
      // setJsonData(response.data);
    } catch (error) {
      console.error("Error fetching file data:", error);
    }
  };
  return (
    <div>
      {filesDataFromBackend && filesDataFromBackend.length > 0 && (
        <>
          <h1 className=" mb-4 text-xl text-center font-extrabold tracking-tight leading-none dark:text-white">
            Uploaded Files are
          </h1>

          <div class="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    File Name
                  </th>
                  <th scope="col" className="px-2 py-3 text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filesDataFromBackend.map((file) => (
                  <tr
                    key={file.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {file.originalname}
                    </td>
                    <td className="px-2 py-4 text-center">
                      {" "}
                      {/* Modified className here */}
                      <button
                        onClick={() =>
                          navigate(`/files/${file._id}`, {
                            state: {
                              filename: file.originalname,
                            },
                          })
                        }
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {filesDataFromBackend && filesDataFromBackend.length == 0 && (
        <h1 className=" mb-4 text-xl text-center font-extrabold tracking-tight leading-none dark:text-white">
          Sorry No Files Uploaded yet
        </h1>
      )}
    </div>
  );
};

export default Files;
