import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./routes/contactRouter.js";

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/contact", router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server start at ${PORT}`));
