import {z} from 'zod';

const QuestionSchema = z.string().min(0).max(1000);
const ImageSchema = z.string().nullable().optional();
const OptionsSchema = z.array(z.string()).min(2).max(5);
const AnswerSchema = z.string().min(1).max(1).nullable();
const DifficultySchema = z.enum(['easy', 'medium', 'hard']);
const TopicSchema = z.string();
const YearSchema = z.number().int().min(1900).max(new Date().getFullYear());
const SubjectSchema = z.string().min(1).max(100);

const createQuestionSchema = z.object({
    question: QuestionSchema,
    image: ImageSchema,
    options: OptionsSchema,
    answer: AnswerSchema,
    difficulty: DifficultySchema,
    topic: TopicSchema,
    year: YearSchema,
    subject: SubjectSchema,
});

const updateQuestionSchema = z.object({
    question: QuestionSchema.optional(),
    image: ImageSchema.optional(),
    options: OptionsSchema.optional(),
    answer: AnswerSchema.optional(),
    difficulty: DifficultySchema.optional(),
    topic: TopicSchema.optional(),
    year: YearSchema.optional(),
    subject: SubjectSchema.optional(),
});

const questionSchema = z.object({
    _id: z.string(),
    question: QuestionSchema,
    image: ImageSchema,
    options: OptionsSchema,
    answer: AnswerSchema,
    difficulty: DifficultySchema,
    topic: TopicSchema,
    year: YearSchema,
    subject: SubjectSchema,
});

export type CreateQuestionDTO = z.infer<typeof createQuestionSchema>;
export type UpdateQuestionDTO = z.infer<typeof updateQuestionSchema>;
export type QuestionDTO = z.infer<typeof questionSchema>;
export { createQuestionSchema, updateQuestionSchema, questionSchema };