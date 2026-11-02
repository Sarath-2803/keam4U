import mongoose, { Model } from "mongoose";
import type {
    CreateQuestionDTO,
    QuestionDTO,
    UpdateQuestionDTO
} from "./questions.dto.js";
import { PaginationOptions, PaginatedResult } from "../../utils/pagination.js";

class QuestionRepository {
    constructor(
        private model: Model<QuestionDTO>
    ) { }

    async create(data: CreateQuestionDTO): Promise<QuestionDTO> {
        const doc = await this.model.insertOne(data);
        return doc.toObject();
    }

    async bulkCreate(data: CreateQuestionDTO[]): Promise<QuestionDTO[]> {
        const docs = await this.model.insertMany(data);
        return docs.map(doc => doc.toObject());
    }

    async findAll(options: PaginationOptions): Promise<PaginatedResult<QuestionDTO>> {
        const { page = 1,
            limit = 10,
            sortBy = "createdAt",
            sortOrder = "desc"
         } = options;
        
        const skip = (page - 1) * limit;
        const sort: Record<string, 1 | -1> = { [sortBy]: sortOrder === "asc" ? 1 : -1 };

        const [data, total] = await Promise.all([
            this.model.find().sort(sort).skip(skip).limit(limit).lean(),
            this.model.countDocuments()
        ]);

        const totalPages = Math.ceil(total / limit);

        return { data, total, page, limit, totalPages };
    }

    async findAllTopicAndCountBySubAndYear(subject: string, year: number): Promise<{ topic: string; count: number }[]> {
        const topics = await this.model.aggregate([
            { $match: { subject, year } },
            { $group: { _id: "$topic", count: { $sum: 1 } } },
            { $project: { topic: "$_id", count: 1, _id: 0 } }
        ]);
        return topics;
    }

    async findById(id: string): Promise<QuestionDTO | null> {
        if (!mongoose.Types.ObjectId.isValid(id)) return null;

        return this.model.findById(id).lean();
    }

    async findByYear(options: PaginationOptions, year: number): Promise<PaginatedResult<QuestionDTO>> {
        const { page = 1, 
            limit = 10, 
            sortBy = "createdAt", 
            sortOrder = "desc"
        } = options;
        const skip = (page - 1) * limit;
        const sort: Record<string, 1 | -1> = { [sortBy]: sortOrder === "asc" ? 1 : -1 };

        const [data, total] = await Promise.all([
            this.model.find({ year }).sort(sort).skip(skip).limit(limit).lean(),
            this.model.countDocuments({ year })
        ]);

        const totalPages = Math.ceil(total / limit);

        return { data, 
            total, 
            page, 
            limit, 
            totalPages 
        };
    }

    async findByTopic(options: PaginationOptions, topic: string): Promise<PaginatedResult<QuestionDTO>> {
        const { page = 1, 
            limit = 10, 
            sortBy = "createdAt", 
            sortOrder = "desc" 
        } = options;
        const skip = (page - 1) * limit;
        const sort: Record<string, 1 | -1> = { [sortBy]: sortOrder === "asc" ? 1 : -1 };

        const [data, total] = await Promise.all([
            this.model.find({ topic }).sort(sort).skip(skip).limit(limit).lean(),
            this.model.countDocuments({ topic })
        ]);

        const totalPages = Math.ceil(total / limit);

        return { data, 
            total, 
            page, 
            limit, 
            totalPages 
        };
    }

    async findByYearAndTopic(year: number, topic: string): Promise<QuestionDTO[]> {
        return this.model.find({ year, topic }).lean();
    }

    async findBySubTopicAndYear(subject: string, topic: string, year: number): Promise<QuestionDTO[]> {
        return this.model.find({ subject, topic, year }).lean();
    }

    async findAllYearBySub(subject: string): Promise<number[]> {
        const years = await this.model.distinct("year", { subject });
        return years.sort((a, b) => b - a);
    }

    async update(
        id: string,
        data: UpdateQuestionDTO
    ): Promise<QuestionDTO | null> {
        if (!mongoose.Types.ObjectId.isValid(id)) return null;

        return this.model
            .findByIdAndUpdate(id, data, { new: true })
            .lean();
    }

    async delete(id: string): Promise<boolean> {
        if (!mongoose.Types.ObjectId.isValid(id)) return false;

        const result = await this.model.findByIdAndDelete(id);
        return result !== null;
    }
}

export default QuestionRepository;