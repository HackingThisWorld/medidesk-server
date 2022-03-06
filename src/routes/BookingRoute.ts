import { Router } from "express";
import fileUpload, { UploadedFile } from "express-fileupload";
import FormData from "form-data";
import fetch from "node-fetch";

const router = Router()
router.use(fileUpload())

router.post("/test", async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.prescription_file) {
        res.status(400).json({ "message": "prescription image not provided" });
        return;
    }

    const prescriptionImage: UploadedFile = req.files.prescription_file as UploadedFile;
    const formData = new FormData();
    formData.append("image", prescriptionImage.data, { filename: prescriptionImage.name });

    try {
        const imgurResponse = await fetch("https://api.imgur.com/3/upload", {
            method: "POST",
            body: formData
        }).then((requestResponse) => requestResponse.json())

        res.json({ url: imgurResponse.data.link })
    } catch (error) {
        console.error(error)
    }

})

export default router;