import express, { Router } from 'express';
// import QuestionRouter from './modules/questions/questions.routes.js';
import cors from 'cors';
import reportRouter from './utils/report.js';
import {morganMiddleware, swaggerSpec, swaggerUi} from './config/index.js';
import {errorHandler} from './middlewares/index.js';

export function createApp(questionRouter: Router) {
    const app = express();
    app.use(express.json());
    app.use(cors());
    app.use(morganMiddleware);
    // app.use(requestLogger);

    app.use('/health', (req, res) => {
        res.json('Server is running');
    });

    app.use('/api-docs', swaggerUi.serve, 
        swaggerUi.setup(swaggerSpec));

    app.use('/api/v1/questions', questionRouter);
    app.use('/api/v1/report', reportRouter);

    app.use(errorHandler);

    return app;
}





