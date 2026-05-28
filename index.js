import express from "express";
import dotenv from "dotenv";
dotenv.config({ quiet: true });
import connectToDB from "./config/connect.js";
import router from "./routes/userRoutes.js";

const app = express();
app.use(express.json());

await connectToDB();
app.use("/api", router);

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server Has Started On PORT : ${PORT}`));
