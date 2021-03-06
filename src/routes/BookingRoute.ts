import { Router } from "express";
import { UploadedFile } from "express-fileupload";
import { checkSchema, validationResult } from "express-validator";
import FormData from "form-data";
import fetch from "node-fetch";
import prisma from "../lib/prisma";

const router = Router();

router.post(
  "/test",
  checkSchema({
    first_name: {
      isString: true,
    },
    last_name: {
      isString: true,
    },
    hospital_name: {
      isString: true,
    },
    email: {
      isEmail: true,
    },
    prescription_date: {
      isString: true,
    },
  }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    if (
      !req.files ||
      Object.keys(req.files).length === 0 ||
      !req.files.prescription_file
    ) {
      res.status(400).json({ message: "prescription image not provided" });
      return;
    }

    const { first_name, last_name, email, hospital_name, prescription_date } =
      req.body;

    const hasUniqueEmail = await prisma.users.findUnique({
      where: {
        email,
      },
    });

    if (!hasUniqueEmail) {
      res.status(403).json({ message: "email not found" });
      return;
    }

    const prescriptionImage: UploadedFile = req.files
      .prescription_file as UploadedFile;
    const formData = new FormData();
    formData.append("userkey", process.env.VGY_KEY);
    formData.append("file", prescriptionImage.data, {
      filename: prescriptionImage.name,
    });

    try {
      const vgyResponse = await fetch("https://vgy.me/upload", {
        method: "POST",
        body: formData,
      }).then((requestResponse) => requestResponse.json());

      const booking = await prisma.test.create({
        data: {
          prescription_image: vgyResponse.image,
          user_email: email,
          first_name,
          last_name,
          hospital_name,
          prescription_date,
        },
      });

      res.json(booking);
    } catch (error) {
      res.status(500).json({ error });
      console.error(error);
    }
  }
);

router.post(
  "/consult",
  checkSchema({
    first_name: {
      isString: true,
    },
    last_name: {
      isString: true,
    },
    hospital_name: {
      isString: true,
    },
    city: {
      isString: true,
    },
    health_condition: {
      isString: true,
    },
    email: {
      isEmail: true,
    },
    prescriptionDate: {
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

      if (
        !req.files ||
        Object.keys(req.files).length === 0 ||
        !req.files.prescription_file
      ) {
        res.status(400).json({ message: "prescription image not provided" });
        return;
      }

      const {
        first_name,
        last_name,
        email,
        hospital_name,
        city,
        health_condition,
        prescription_date,
      } = req.body;

      const hasUniqueEmail = await prisma.users.findUnique({
        where: {
          email,
        },
      });

      if (!hasUniqueEmail) {
        res.status(403).json({ message: "email not found" });
        return;
      }

      const prescriptionImage: UploadedFile = req.files
        .prescription_file as UploadedFile;
      const formData = new FormData();
      formData.append("userkey", process.env.VGY_KEY);
      formData.append("image", prescriptionImage.data, {
        filename: prescriptionImage.name,
      });

      const vgyResponse = await fetch("https://vgy.me/upload", {
        method: "POST",
        body: formData,
      }).then((requestResponse) => requestResponse.json());

      const consult = await prisma.consult.create({
        data: {
          prescription_image: vgyResponse.image,
          user_email: email,
          first_name,
          last_name,
          hospital_name,
          city,
          health_condition,
          prescription_date,
        },
      });

      res.json(consult);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  }
);

export default router;
