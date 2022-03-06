import { Router } from "express";
import fileUpload, { UploadedFile } from "express-fileupload";
import { checkSchema, validationResult } from "express-validator";
import FormData from "form-data";
import fetch from "node-fetch";
import prisma from "../lib/prisma";

const router = Router();
router.use(fileUpload());

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
      custom: {
        options: (value, { req }) => {
          prisma.users.findUnique({ where: { email: value } }).then((test) => {
            if (!test) {
              return Promise.reject("User not found");
            }
          });
        },
      },
    },
    prescriptionDate: {
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

    const prescriptionImage: UploadedFile = req.files
      .prescription_file as UploadedFile;
    const formData = new FormData();
    formData.append("image", prescriptionImage.data, {
      filename: prescriptionImage.name,
    });

    try {
      const imgurResponse = await fetch("https://api.imgur.com/3/upload", {
        method: "POST",
        body: formData,
      }).then((requestResponse) => requestResponse.json());

      const booking = await prisma.test.create({
        data: {
          prescription_image: imgurResponse.data.link,
          user_email: email,
          first_name,
          last_name,
          hospital_name,
          prescription_date,
        },
      });

      res.json(booking);
    } catch (error) {
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
      custom: {
        options: (value, { req }) => {
          if (!["low", "mid", "severe"].includes(value.toLowerCase())) {
            return Promise.reject("health condition not found");
          }
        },
      },
    },
    email: {
      custom: {
        options: (value, { req }) => {
          prisma.users.findUnique({ where: { email: value } }).then((test) => {
            if (!test) {
              return Promise.reject("User not found");
            }
          });
        },
      },
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

      const prescriptionImage: UploadedFile = req.files
        .prescription_file as UploadedFile;
      const formData = new FormData();
      formData.append("image", prescriptionImage.data, {
        filename: prescriptionImage.name,
      });

      const imgurResponse = await fetch("https://api.imgur.com/3/upload", {
        method: "POST",
        body: formData,
      }).then((requestResponse) => requestResponse.json());

      await prisma.consult.create({
        prescription_image: imgurResponse.data.link,
        use_email: email,
        first_name,
        last_name,
        hospital_name,
        city,
        health_condition,
        prescription_date,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  }
);

export default router;
