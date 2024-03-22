import express from "express";
import bodyParser from "body-parser";
import AppRouter from "./routes";

const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

app.use("/api", AppRouter);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
