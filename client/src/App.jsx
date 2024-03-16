import Navbar from "./Navbar";

import "./App.css";
import Home from "./Home";
import Files from "./Files";
import { Toaster } from "react-hot-toast";

import {
  createBrowserRouter,
  Link,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import FileDetail from "./FileDetail";

function App() {
  return (
    <div className="App">
      <Toaster
        toastOptions={{
          style: { background: "rgb(51 65 85)", color: "#fff" },
        }}
      />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/files" element={<Files />} />
        <Route path="/files/:id" element={<FileDetail />} />
      </Routes>
    </div>
  );
}

export default App;
