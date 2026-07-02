const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "FoodRescue API",
      version: "1.0.0",
      description: "Dokumentasi API untuk platform donasi makanan FoodRescue",
    },
    servers: [
      {
        url: process.env.SERVER_URL || "http://localhost:5000",
        description: "Server aktif",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    // Kalau kebanyakan route lo butuh login, ini bikin semua endpoint
    // otomatis kelihatan ada gembok "Authorize" di Swagger UI
    security: [{ bearerAuth: [] }],
  },
  // Semua file yang bakal di-scan buat cari komentar @swagger / JSDoc
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;