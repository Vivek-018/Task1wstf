import dotenv from "dotenv";
import ConnectDB from "./db/connect.js";
import app from "./app.js";

dotenv.config({
  path: "./.env",
});

ConnectDB()
  .then(() => {
    app.on("ERROR", (error) => {
      console.log("error", error);
    });
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server is listening on ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGODB connection Error", err);
  });
