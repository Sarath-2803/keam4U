import fs from 'fs/promises';
import { QuestionExtractDTO } from './types';
import { extractQuestions } from './extractor';
import { QuestionController } from '../src/modules/questions/questions.controller';
import { CreateQuestionDTO } from '../src/modules/questions/questions.dto';
import mongoose from 'mongoose';
import QuestionRepository from '../src/modules/questions/questions.repository';
import { QuestionService } from '../src/modules/questions/questions.service';
import QuestionModel from "../src/modules/questions/questions.model"
import RedisService from "../src/config/redis"

await RedisService.connect();
const questionService = new QuestionService(new QuestionRepository(QuestionModel), RedisService.getClient());
const questionController = new QuestionController(questionService);

async function uploadQuestions(filePath: string) {
    try {
        const files = (await fs.readdir(filePath)).filter(file => file.endsWith('.pdf'));

        for (const file of files) {
            const data: QuestionExtractDTO = await extractQuestions(`${filePath}/${file}`);
            console.log(`Extracted ${data.questions.length} questions from ${file}`);
            console.log(`Extracted ${data.questionsWithDiagrams.length} questions with diagrams from ${file}\n`);

            await fs.writeFile(`./extracted/${file.replace('.pdf', '_questions.json')}`, JSON.stringify(data.questions, null, 2));
            await fs.writeFile(`./needReview/${file.replace('.pdf', '_need_review.json')}`, JSON.stringify(data.questionsWithDiagrams, null, 2));
            // await uploadToDB(`./extracted/${file.replace('.pdf', '.json')}`);
            console.log(`Finished processing ${file}\n`);
        }
    }
    catch (err) {
        console.error('Error: ', err);
    }
}

async function uploadToDB(filePath: string) {
    try {
        await mongoose.connect(process.env.DB_URL!);
        console.log('Connected to MongoDB');

        const files = (await fs.readdir(filePath)).filter(file => file.endsWith('.json'));

        for (const file of files) {
            const questions: CreateQuestionDTO[] = JSON.parse(await fs.readFile(`${filePath}/${file}`, 'utf-8'));

            await questionController.createBulkInternally(questions);
            console.log(`Uploaded ${questions.length} questions from ${file} to the database.`);
        }

        return mongoose.disconnect();
    }
    catch (err) {
        console.error('Error: ', err);
    }
}

uploadQuestions('./data');
uploadToDB('./extracted/');