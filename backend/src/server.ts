import dotenv from 'dotenv';
import {connectDB} from "./config/index.js";
import RedisService from "./config/redis.js";
import QuestionModel from "./modules/questions/questions.model.js";
import { QuestionService } from "./modules/questions/questions.service.js";
import QuestionRepository from "./modules/questions/questions.repository.js";
import { QuestionController } from "./modules/questions/questions.controller.js";
import { QuestionRoutes } from "./modules/questions/questions.routes.js";
import { createApp } from './app.js';

dotenv.config();

const startServer = async () => {
    try {
        // Connect to the database
        await connectDB();
        console.log('Database connection successful');
        
        await RedisService.connect();
        console.log('Redis connection successful');

        const questionService = new QuestionService(new QuestionRepository(QuestionModel), RedisService.getClient());
        const questionController = new QuestionController(questionService);
        const questionRoutes = new QuestionRoutes(questionController);

        const app = createApp(questionRoutes.getRouter());
        // Start the server
        app.listen(process.env.PORT || 5000, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });

    } catch (error) {
        console.error('Error starting server:', error);
        process.exit(1);
    }
}

startServer();