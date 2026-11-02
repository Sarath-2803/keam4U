import type { Request, Response } from "express";
import { QuestionService } from "./questions.service.js";
import { asyncHandler } from "../../middlewares/errorHandler.js";
import { validate } from "../../utils/validate.js";
import { CreateQuestionDTO, createQuestionSchema, updateQuestionSchema } from "./questions.dto.js";
import { ValidationError } from "../../utils/errors.js";
import { PaginationOptions } from "../../utils/pagination.js";
import titleCase from "../../utils/format.js";

export class QuestionController {
    constructor(private questionService: QuestionService) { }

    create = asyncHandler(async (req: Request, res: Response) => {
        const payload = req.body;

        const validated = validate(createQuestionSchema, payload);

        const question = await this.questionService.create(validated);
        res.status(201).json({
            status: "success",
            message: "Question created successfully",
            data: question
        });
    })

    createBulk = asyncHandler(async (req: Request, res: Response) => {
        const payload = req.body;


        if (!Array.isArray(payload)) {
            throw new ValidationError("Expected an array of questions");
        }

        const validated = payload.map((item, index) => {
            try {
                return validate(createQuestionSchema, item);
            } catch (error) {
                throw new ValidationError(`Validation failed for item at index ${index}: ${(error as Error).message}`);
            }
        });

        const questions = await this.questionService.bulkCreate(validated);
        res.status(201).json({
            status: "success",
            message: "Questions created successfully",
            data: questions
        });
    });

    createBulkInternally = async (questions: CreateQuestionDTO[]) => {
        const validated = questions.map((item, index) => {
            try {
                return validate(createQuestionSchema, item);
            } catch (error) {
                throw new ValidationError(`Validation failed for item at index ${index}: ${(error as Error).message}`);
            }
        }
        );

        const createdQuestions = await this.questionService.bulkCreate(validated);
        return createdQuestions;
    }

    findAll = asyncHandler(async (req: Request, res: Response) => {
        const { page, limit, sortBy, sortOrder } = req.query;
        const options: PaginationOptions = {
            page: Number(page) || 1,
            limit: Number(limit) || 10,
            sortBy: String(sortBy) || "createdAt",
            sortOrder: sortOrder as "asc" | "desc"
        };

        const questions = await this.questionService.findAll(options);
        res.json({
            status: "success",
            data: questions
        });
    })

    findById = asyncHandler(async (req: Request, res: Response) => {
        const { id } = req.params;
        if (!id) {
            throw new ValidationError("ID parameter is required");
        }

        const question = await this.questionService.findById(String(id));
        res.json({
            status: "success",
            data: question
        });
    })

    findAllTopicAndCountBySubAndYear = asyncHandler(async (req: Request, res: Response) => {
        const sub = req.params.subject[0].toLowerCase();
        const { year } = req.params;

        if (!sub || typeof sub !== "string") {
            throw new ValidationError("Subject parameter is required");
        }

        if (!year || typeof year !== "string") {
            throw new ValidationError("Year parameter is required");
        }
        const parsedYear = Number(year);

        if (isNaN(parsedYear)) {
            throw new ValidationError("Year must be a valid number");
        }

        const topics: { topic: string; count: number }[] = await this.questionService.findAllTopicAndCountBySubAndYear(sub, parsedYear);
        res.json({ status: "success", data: topics });
    });

    findByYear = asyncHandler(async (req: Request, res: Response) => {
        const { page, limit, sortBy, sortOrder, year } = req.query;
        const options: PaginationOptions = {
            page: Number(page) || 1,
            limit: Number(limit) || 10,
            sortBy: String(sortBy) || "createdAt",
            sortOrder: sortOrder as "asc" | "desc"
        };

        if (!year || typeof year !== "string") {
            throw new ValidationError("Year parameter is required");
        }
        const parsedYear = Number(year);
        if (isNaN(parsedYear)) {
            throw new ValidationError("Year must be a valid number");
        }

        const questions = await this.questionService.findByYear(options, parsedYear);
        res.json({ status: "success", data: questions });
    })

    findByTopic = asyncHandler(async (req: Request, res: Response) => {
        const { page, limit, sortBy, sortOrder, } = req.query;
        const topic = titleCase(req.query.topic as string || '');

        const options: PaginationOptions = {
            page: Number(page) || 1,
            limit: Number(limit) || 10,
            sortBy: String(sortBy) || "createdAt",
            sortOrder: sortOrder as "asc" | "desc"
        };

        if (!topic || typeof topic !== "string") {
            throw new ValidationError("Topic parameter is required");
        }
        const questions = await this.questionService.findByTopic(options, topic);
        res.json({ status: "success", data: questions });
    })

    findByYearAndTopic = asyncHandler(async (req: Request, res: Response) => {
        const { topicName } = req.params;
        const { year } = req.query;

        if (!year || typeof year !== "string") {
            throw new ValidationError("Year parameter is required");
        }

        if (!topicName || typeof topicName !== "string") {
            throw new ValidationError("Topic parameter is required");
        }

        const topic = titleCase(topicName as string);
        const parsedYear = Number(year);
        if (isNaN(parsedYear)) {
            throw new ValidationError("Year must be a valid number");
        }
        const questions = await this.questionService.findByYearAndTopic(parsedYear, topic);
        res.json({ status: "success", data: questions });
    })

    findBySubTopicAndYear = asyncHandler(async (req: Request, res: Response) => {
        const sub = req.params.subject[0].toLowerCase();
        let topic = titleCase(req.params.topic as string);

        // console.log(`Finding questions for subject: ${sub}, topic: ${topic}, year: ${req.query.year}`);
        const year = req.query.year;

        if (!sub || typeof sub !== "string") {
            throw new ValidationError("Subject parameter is required");
        }
        if (!topic || typeof topic !== "string") {
            throw new ValidationError("Topic parameter is required");
        }
        if (!year || typeof year !== "string") {
            throw new ValidationError("Year parameter is required");
        }
        const parsedYear = Number(year);
        if (isNaN(parsedYear)) {
            throw new ValidationError("Year must be a valid number");
        }

        topic = topic.replace(/-/g, " ");

        const questions = await this.questionService.findBySubTopicAndYear(sub, topic, parsedYear);
        res.json({ status: "success", data: questions });
    });

    findAllYearBySub = asyncHandler(async (req: Request, res: Response) => {
        const sub = req.params.subject[0].toLowerCase();

        if (!sub || typeof sub !== "string") {
            throw new ValidationError("Subject parameter is required");
        }

        const years = await this.questionService.findAllYearBySub(sub);
        res.json({ status: "success", data: years });
    });

    update = asyncHandler(async (req: Request, res: Response) => {
        const { id } = req.params;
        const payload = req.body;
        if (!id) {
            throw new ValidationError("ID parameter is required");
        }

        const validated = validate(updateQuestionSchema, payload);
        const question = await this.questionService.update(String(id), validated);
        res.json({
            status: "success",
            message: "Question updated successfully",
            data: question
        });
    })

    delete = asyncHandler(async (req: Request, res: Response) => {
        const { id } = req.params;
        if (!id) {
            throw new ValidationError("ID parameter is required");
        }
        await this.questionService.delete(String(id));
        res.json({
            status: "success",
            message: "Question deleted successfully"
        });
    })
}

// export default new QuestionController();