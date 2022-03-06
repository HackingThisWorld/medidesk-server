import { Router } from "express";
import prisma from "../lib/prisma";
const router = Router();

router.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const contact = await prisma.request.create({
      data: {
        name,
        email,
        message,
      },
    });

    res.json(contact);
  } catch (error) {
    res.status(500).json({ error });
  }
});

export default router;
