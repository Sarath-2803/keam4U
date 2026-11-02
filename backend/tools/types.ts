import { CreateQuestionDTO } from "../src/modules/questions/questions.dto";

export interface ExtractionResult {
    questions: CreateQuestionDTO[];
    questionsWithDiagrams: CreateQuestionDTO[];
    year: number;
    totalPages: number;
    failedPages: number[];
}

export type QuestionExtractDTO = ExtractionResult;