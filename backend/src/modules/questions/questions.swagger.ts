export const QuestionSwagger = {
  "/api/v1/questions": {
    get: {
      tags: ["Questions"],
      summary: "Get all questions",
      description: "Returns all questions",
      responses: {
        200: {
          description: "Questions fetched successfully",
        },
        500: {
          description: "Internal server error",
        },
      },
    },
  },

  "/api/v1/questions/year": {
    get: {
      tags: ["Questions"],
      summary: "Get questions by year",
      parameters: [
        {
          name: "year",
          in: "query",
          required: true,
          schema: {
            type: "number",
            example: 2024,
          },
        },
      ],
      responses: {
        200: {
          description: "Questions fetched successfully",
        },
      },
    },
  },

  "/api/v1/questions/topic": {
    get: {
      tags: ["Questions"],
      summary: "Get questions by topic",
      parameters: [
        {
          name: "topic",
          in: "query",
          required: true,
          schema: {
            type: "string",
            example: "Algebra",
          },
        },
      ],
      responses: {
        200: {
          description: "Questions fetched successfully",
        },
      },
    },
  },

  "/api/v1/questions/{topic}/q": {
    get: {
      tags: ["Questions"],
      summary: "Get questions by topic and year",
      parameters: [
        {
          name: "topic",
          in: "path",
          required: true,
          schema: {
            type: "string",
            example: "Physics",
          },
        },
        {
          name: "year",
          in: "query",
          required: true,
          schema: {
            type: "number",
            example: 2024,
          },
        },
      ],
      responses: {
        200: {
          description: "Questions fetched successfully",
        },
      },
    },
  },

  "/api/v1/questions/{subject}/{year}/topic": {
    get: {
      tags: ["Questions"],
      summary: "Get topic count by subject and year",
      parameters: [
        {
          name: "subject",
          in: "path",
          required: true,
          schema: {
            type: "string",
            example: "Physics",
          },
        },
        {
          name: "year",
          in: "path",
          required: true,
          schema: {
            type: "number",
            example: 2024,
          },
        },
      ],
      responses: {
        200: {
          description: "Topic count fetched successfully",
        },
      },
    },
  },

  "/api/v1/questions/{subject}/year": {
    get: {
      tags: ["Questions"],
      summary: "Get available years for a subject",
      parameters: [
        {
          name: "subject",
          in: "path",
          required: true,
          schema: {
            type: "string",
            example: "Chemistry",
          },
        },
      ],
      responses: {
        200: {
          description: "Years fetched successfully",
        },
      },
    },
  },

  "/api/v1/questions/{subject}/{topic}": {
    get: {
      tags: ["Questions"],
      summary: "Get questions by subject and topic",
      parameters: [
        {
          name: "subject",
          in: "path",
          required: true,
          schema: {
            type: "string",
            example: "Maths",
          },
        },
        {
          name: "topic",
          in: "path",
          required: true,
          schema: {
            type: "string",
            example: "Calculus",
          },
        },
      ],
      responses: {
        200: {
          description: "Questions fetched successfully",
        },
      },
    },
  },

  "/api/v1/questions/{id}": {
    get: {
      tags: ["Questions"],
      summary: "Get question by ID",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "string",
            example: "67abc123456",
          },
        },
      ],
      responses: {
        200: {
          description: "Question fetched successfully",
        },
        404: {
          description: "Question not found",
        },
      },
    },
  },
};