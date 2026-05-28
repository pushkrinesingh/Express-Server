import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ quiet: true });

async function connectToDB() {
    mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("DB Connection: OK, Server Running: OK");
  })
  .catch((err) => {
    console.log(err);
  }); 
}

export default connectToDB;