import express from "express";
import statusRouter from "./routes/status.js";
import stt from "./routes/STT.js";
import getall from "./routes/getall.js";
import write from "./routes/write.js";
import path from "path";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();


app.use("/api", statusRouter);
app.use("/api", stt);
app.use("/api", getall);
app.use("/api", write);


app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

