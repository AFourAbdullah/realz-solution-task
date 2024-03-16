const express = require("express");
const app = express();

const XLSX = require("xlsx");
// const ticketroutes = require("./routes/ticketRoutes");

const connectDB = require("./database");
const bodyparser = require("body-parser");
const multer = require("multer");
const FileModel = require("./model/filemodel");
require("dotenv").config();
app.use(express.json({ limit: "50mb" }));
// app.use(cors());
// app.use(
//   cors({
//     origin: "*",
//   })
// );
var cors = require("cors");
const corsOptions = {
  // origin:'*',
  origin: true,
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.set("trust proxy", 1);

app.use(bodyparser.json());
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyparser.urlencoded({ limit: "50mb", extended: true }));

connectDB();

// Set up multer for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Define your file upload endpoint
app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    console.log("reqfile", req.file);
    const { originalname, mimetype, size, buffer } = req.file;

    // Save the file data to MongoDB
    const file = await FileModel.create({
      originalname,
      mimetype,
      size,
      buffer,
    });

    res
      .status(200)
      .json({ message: "File uploaded successfully", fileId: file._id });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
// Define your route to read the file in JSON format
app.get("/file/:id", async (req, res) => {
  try {
    const fileId = req.params.id;
    console.log("id", fileId);
    const file = await FileModel.findById(fileId);
    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }
    // Parse the Excel buffer to JSON

    const workbook = XLSX.read(file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(sheet);
    res.json(jsonData);
  } catch (error) {
    console.error("Error reading file:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.get("/allFiles", async (req, res) => {
  try {
    const fileId = req.params.id;
    console.log("id", fileId);
    const files = await FileModel.find();
    if (!files) {
      return res.status(404).json({ error: "Files not found" });
    }

    res.json(files);
  } catch (error) {
    console.error("Error reading file:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`server is listening at port:${process.env.PORT}`);
});
