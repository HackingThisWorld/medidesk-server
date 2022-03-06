import { Router } from "express";
import bcrypt from "bcrypt";
import prisma from "../lib/prisma";
const router = Router();

router.post("/register", async (req, res) => {
  try {
    const { first_name, last_name, name, password, city } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const service = await prisma.lab.create({
      data: {
        password: hashedPassword,
        first_name,
        last_name,
        name,
        city,
      },
    });
    res.json(service);
  } catch (error) {
    res.status(500).json({ error });
  }
});

export default router;
