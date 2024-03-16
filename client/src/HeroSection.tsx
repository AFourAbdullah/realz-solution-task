import React from "react";

const HeroSection = ({ handleFileUpload, file, handleSubmit, loading }) => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
            Upload Your Excel Files
          </h1>
          <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
            Your one-stop solution for hassle-free Excel file uploads
          </p>
          {/* <button
            onClick={handleFileUpload}
            className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-slate-800 hover:bg-slate-500 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
          >
            Upload Files
          </button> */}
          {file ? (
            <button
              onClick={handleSubmit}
              className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-slate-800 hover:bg-slate-500 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
            >
              {!loading ? "Upload Files" : "Uploading..."}
            </button>
          ) : (
            <label
              htmlFor="file-upload"
              className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-slate-800 hover:bg-slate-500 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900 cursor-pointer"
            >
              Select Files
              <input
                accept=".xlsx, .xls"
                id="file-upload"
                type="file"
                className="hidden"
                onChange={handleFileUpload}
              />
            </label>
          )}
          {file && (
            <p className="text-slate-600 mt-3">
              File is <span className="text-slate-900">{file.name}</span>
            </p>
          )}
        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
          <img src="/bg.png" alt="mockup" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
