import { Router } from "express";
import prisma from "../lib/prisma";
const router = Router();

router.get("/getAll", async (req, res) => {
    try {
        const services = await prisma.service.findMany();
        res.json(services);
    } catch (error) {
        res.status(500).json({ error })
    }
})

export default router
