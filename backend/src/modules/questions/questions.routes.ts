import { Router } from "express";

import { QuestionController } from "./questions.controller.js";

export class QuestionRoutes {
    private router: Router;
    constructor(private questionController: QuestionController) {
        this.router = Router();
        this.registerRoutes();
    }

    registerRoutes() {
        this.router.get("/", this.questionController.findAll);
        this.router.get("/year", this.questionController.findByYear);
        this.router.get("/topic", this.questionController.findByTopic);

        this.router.get("/:topic/q", this.questionController.findByYearAndTopic);
        this.router.get("/:subject/:year/topic", this.questionController.findAllTopicAndCountBySubAndYear);
        this.router.get("/:subject/year", this.questionController.findAllYearBySub);
        this.router.get("/:subject/:topic", this.questionController.findBySubTopicAndYear);

        this.router.get("/:id", this.questionController.findById);
    }

    getRouter() {
        return this.router;
    }
}
