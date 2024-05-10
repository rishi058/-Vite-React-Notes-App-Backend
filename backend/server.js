import express from "express"; // ES6 syntax
import mongoose from "mongoose";
import path from "path";
import {customLogger} from "./logger.js";
import cors from "cors";

import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/notes.route.js";

const app = express();
app.use(express.json()); // Middleware that parses the recieved request body into json.
app.use(cors()); // To prevent : Access to XMLHttpRequest at 'http://localhost:3000/' from origin 'http://localhost:5173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource
app.use(customLogger());

const password = "iMpmtWPWciVciMuX";
const clusterName = "Cluster0";
const dbName = "NotesDB";
const mongoUrl = `mongodb+srv://rishiqwerty01:${password}@${clusterName}.ewhvozy.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=${clusterName}`; // backtick is used for string interpolation

app.use("/api", authRouter);
app.use("/api", userRouter);

const port = process.env.PORT || 3000;

//-------------- Settings to run FE+BE on same port ------------------

const __myDir = path.resolve();

app.use(express.static(path.join(__myDir, "frontend/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__myDir, "frontend", "dist", "index.html"));
});

//-------------------------------------------------------------------


mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("DB connected !");
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch(() => {
    console.log("DB connection failed");
  });
