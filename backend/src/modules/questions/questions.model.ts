import mongoose from "mongoose";
import type { QuestionDTO } from "./questions.dto.js";
import connectDB from "../../config/database.js";

const questionSchema = new mongoose.Schema<QuestionDTO>(
    {
        question: { 
            type: String,
            required: true, 
            minlength: 0, 
            maxlength: 1000 
        },
        image: {
            type: String, 
            required: false
        },
        options: {
            type: [String], 
            required: true 
        },
        answer: {
            type: String,
            required: true 
        },
        difficulty: { 
            type: String, 
            enum: ["easy", "medium", "hard"], 
            required: true 
        },
        topic: { 
            type: String, 
            required: true 
        },
        year: { 
            type: Number, 
            required: true 
        },
        subject: { 
            type: String, 
            required: true 
        },
    },
    { 
        timestamps: true 
    }
);

const conn = await connectDB();
const QuestionModel = conn.model<QuestionDTO>("Question", questionSchema);

export default QuestionModel;