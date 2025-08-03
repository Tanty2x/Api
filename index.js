import express from "express";
import statusRouter from "./routes/status.js";

const app = express();

app.use("/api", statusRouter);

app.get("/api", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
