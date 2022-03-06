import { Router } from "express";
import { checkSchema, validationResult } from "express-validator";
import prisma from "../lib/prisma";
const router = Router();

router.post(
  "/contact",
  checkSchema({
    name: {
      isString: true,
    },
    email: {
      isEmail: true,
    },
    message: {
      isString: true,
    },
  }),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

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
  }
);

export default router;
