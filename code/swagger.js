const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Best Time to Grow (BTG) API',
    description: 'Documentação da API para o sistema BTG',
  },

  host: process.env.AZURE_URL || 'localhost:3000',
  schemes: ['http', 'https'],

  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
      description: 'IMPORTANTE: Digite "Bearer " seguido do seu token. Ex: Bearer eyJhbG...'
    }
  },

  security: [
    {
      bearerAuth: []
    }
  ]
};

const outputFile = './swagger-output.json';
const endpointsFiles = ["./src/app.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);