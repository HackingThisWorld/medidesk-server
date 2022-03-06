require("dotenv").config();
import express from "express";
import fileUpload, { UploadedFile } from "express-fileupload";
import cors from "cors";
import BookingRoute from "./routes/BookingRoute";
import FormRoute from "./routes/FormRoute";
import LabRoute from "./routes/LabRoute";
import ServiceRoute from "./routes/ServiceRoute";

const app = express();

app.use(fileUpload());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/forms", FormRoute);
app.use("/book", BookingRoute);
app.use("/service", ServiceRoute);
app.use("/lab", LabRoute);

app.get("/", async (req, res) => {
  res.json({ message: "Hello World" });
});

app.listen(process.env.PORT || 3000, () =>
  console.log(`🚀 Server ready at: ${process.env.PORT || 3000}`)
);
