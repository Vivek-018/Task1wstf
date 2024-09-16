import express from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extented: true, limit: "20kb" }));
app.use(express.static("public"));



// import routers
import dogrouter from "./routes/dog.route.js";

// routes declaration
app.use("/api/v1/dogs", dogrouter);

// localhost:3000/api/v1/dogs/

export default app;
