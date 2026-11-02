import nodemailer from "nodemailer";
import { asyncHandler } from "../middlewares/errorHandler.js";
import express from "express";

const reportRouter = express.Router();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        // type: "OAuth2",
        user: process.env.REPORT_EMAIL,
        pass: process.env.REPORT_EMAIL_PASSWORD,
        // clientId: process.env.GOOGLE_CLIENT_ID, 
        // clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        // refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
    },
});

reportRouter.post("/", asyncHandler(async (req, res) => {
    const { questionId, question, issue} = req.body;

    if(!issue.trim() || !questionId.trim() || !question.trim()) {
        return res.status(400).json({ message: "All fields are required." });
    }

    const mailOptions = {
        from: process.env.REPORT_EMAIL,
        to: process.env.REPORT_EMAIL,
        subject: `Report for Question ID: ${questionId}`,
        text: `Question: ${question}\n\nIssue: ${issue}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ 
        message: "Report sent successfully." 
    });
}));

export default reportRouter;