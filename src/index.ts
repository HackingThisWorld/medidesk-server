require('dotenv').config();
import { PrismaClient } from "@prisma/client";
import express from "express";

import BookingRoute from "./routes/BookingRoute";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use("/book", BookingRoute)

app.get('/', async (req, res) => {
    res.json({ message: 'Hello World' });
})

app.listen(process.env.PORT || 3000, () =>
    console.log(`🚀 Server ready at: ${process.env.PORT || 3000}`)
);