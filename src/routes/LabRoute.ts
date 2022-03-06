import { Router } from "express";
import prisma from "../lib/prisma";
const router = Router();

router.post("/register", async (req, res) => {
    try {
        const { id, first_name, last_name, name, image, city } = req.body;
        const service = await prisma.service.create({
            data: {
                id,
                first_name,
                last_name,
                name,
                image,
                city
            }
        })
        res.json(service);
    } catch (error) {
        res.status(500).json({ error })
    }
})

export default router