const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  originalname: { type: String, required: true },
  mimetype: { type: String, required: true },
  size: { type: Number, required: true },
  buffer: { type: Buffer, required: true },
});

const FileModel = mongoose.model("File", fileSchema);

module.exports = FileModel;
