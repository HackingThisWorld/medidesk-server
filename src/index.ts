require('dotenv').config();
import express from "express";

import BookingRoute from "./routes/BookingRoute";
import LabRoute from "./routes/LabRoute";
import ServiceRoute from "./routes/ServiceRoute";

const app = express();

app.use(express.json());
app.use("/book", BookingRoute)
app.use("/service", ServiceRoute);
app.use("/lab", LabRoute);

app.get('/', async (req, res) => {
    res.json({ message: 'Hello World' });
})

app.listen(process.env.PORT || 3000, () =>
    console.log(`🚀 Server ready at: ${process.env.PORT || 3000}`)
);