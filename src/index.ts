require('dotenv').config();
import express from "express";

const app = express();

app.use(express.json());

app.get('/', async (req, res) => {
    res.json({ message: 'Hello World' });
})

app.listen(process.env.PORT || 3000, () =>
    console.log(`🚀 Server ready at: ${process.env.PORT || 3000}`)
);