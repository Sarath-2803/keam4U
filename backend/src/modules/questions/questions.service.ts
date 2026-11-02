import type {
    CreateQuestionDTO,
    QuestionDTO,
    UpdateQuestionDTO,
} from "./questions.dto.js";
import QuestionRepository from "./questions.repository.js";
import { NotFoundError } from "../../utils/errors.js";
import { PaginatedResult, PaginationOptions } from "../../utils/pagination.js";
import { RedisClientType } from "redis";
import logger from "../../config/logger.js";


export class QuestionService {
    // private redisClient: RedisClientType | null = RedisService.getClient();

    constructor(
        private readonly repository: QuestionRepository,
        private redis: RedisClientType 
    ) { }

    async create(data: CreateQuestionDTO): Promise<QuestionDTO> {
        const question = await this.repository.create(data);

        logger.info("Question created successfully", { questionId: question._id });
        return question;
    }

    async bulkCreate(data: CreateQuestionDTO[]): Promise<QuestionDTO[]> {
        if (!data.length) return [];
        const questions = await this.repository.bulkCreate(data);
        logger.info("Questions created successfully", { questionIds: questions.map(q => q._id) });
        return questions;
    }

    async findAll(options: PaginationOptions): Promise<PaginatedResult<QuestionDTO>> {
        const questions = await this.repository.findAll(options);
        logger.info("Questions found successfully", { questionCount: questions.data.length });
        return questions;
    }

    async findAllTopicAndCountBySub(subject: string, year: number): Promise<{ topic: string; count: number }[]> {
        if (!this.redis) {
            throw new Error("Redis client is not initialized");
        }

        const cacheKey = `topics:${subject}:${year}`;
        const cachedData = await this.redis.get(cacheKey);
        if (cachedData) {
            logger.debug("Retrieved topics from cache", { cacheKey });
            return JSON.parse(cachedData);
        }

        logger.debug("Cache miss for topics", { cacheKey });
        const result = await this.repository.findAllTopicAndCountBySubAndYear(subject, year);
        await this.redis.set(cacheKey, JSON.stringify(result), { EX: 3600 }); // Cache for 1 hour
        logger.debug("Cached topics", { cacheKey });
        logger.info("Topics retrieved successfully", { subject, year, topicCount: result.length });
        return result;
        // return this.repository.findAllTopicAndCountBySubAndYear(subject, year);
    }

    async findById(id: string): Promise<QuestionDTO> {
        const question = await this.repository.findById(id);
        if (!question) throw new NotFoundError(`Question not found: ${id}`);

        logger.info("Question retrieved successfully", { questionId: id });
        return question;
    }

    async findByYear(options: PaginationOptions, year: number): Promise<PaginatedResult<QuestionDTO>> {
        const questions = await this.repository.findByYear(options, year);
        logger.info("Questions found by year", { questionCount: questions.data.length });
        return questions;
    }

    async findAllTopicAndCountBySubAndYear(subject: string, year: number): Promise<{ topic: string; count: number }[]> {
        if (!this.redis)
            throw new Error("Redis client is not initialized");

        const cacheKey = `topics:${subject}:${year}`;
        const cachedData = await this.redis.get(cacheKey);
        if (cachedData) {
            logger.debug("Retrieved topics from cache", { cacheKey });
            logger.info("Topics retrieved successfully from cache", { subject, year, topicCount: JSON.parse(cachedData).length });
            return JSON.parse(cachedData);
        }

        logger.debug("Cache miss for topics", { cacheKey });
        const result = await this.repository.findAllTopicAndCountBySubAndYear(subject, year);
        await this.redis.set(cacheKey, JSON.stringify(result), { EX: 3600 }); 
        // console.log(`Cached topics for subject: ${subject}, year: ${year}`);
        logger.info("Topics retrieved successfully", { subject, year, topicCount: result.length });
        return result;
    }

    async findByTopic(options: PaginationOptions, topic: string): Promise<PaginatedResult<QuestionDTO>> {
        const questions = await this.repository.findByTopic(options, topic);
        logger.info("Questions found by topic", { questionCount: questions.data.length });
        return questions;
    }

    async findByYearAndTopic(year: number, topic: string): Promise<QuestionDTO[]> {
        if(!this.redis)
            throw new Error("Redis client is not initialized");

        const cacheKey = `questions:${year}:${topic}`;
        const cachedData = await this.redis.get(cacheKey);
        if (cachedData) {
            logger.debug("Retrieved questions from cache", { cacheKey });
            return JSON.parse(cachedData);
        }
        const result = await this.repository.findByYearAndTopic(year, topic);
        await this.redis.set(cacheKey, JSON.stringify(result), { EX: 3600 }); 
        logger.info("Questions retrieved successfully", { year, topic, questionCount: result.length });
        return result;
    }

    async findBySubTopicAndYear(subject: string, topic: string, year: number): Promise<QuestionDTO[]> {
        const questions = await this.repository.findBySubTopicAndYear(subject, topic, year);
        logger.info("Questions found by subject, topic, and year", { questionCount: questions.length });
        return questions;
    }

    async findAllYearBySub(subject: string): Promise<number[]> {
        const years = await this.repository.findAllYearBySub(subject);
        logger.info("Years found by subject", { subject, years: years });
        return years;
    }

    async update(id: string, data: UpdateQuestionDTO): Promise<QuestionDTO> {
        const question = await this.repository.update(id, data);
        if (!question) throw new NotFoundError(`Question not found: ${id}`);
        logger.info("Question updated successfully", { questionId: id });
        return question;
    }

    async delete(id: string): Promise<void> {
        const deleted = await this.repository.delete(id);
        if (!deleted) throw new NotFoundError(`Question not found: ${id}`);
        logger.info("Question deleted successfully", { questionId: id });
    }
}

// export default QuestionService();