const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Best Time to Grow (BTG) API',
    description: 'Documentação da API para o sistema BTG',
  },

  host: 'localhost:3000',
  schemes: ['http'],

  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
      description: 'Digite: Bearer <seu_token_jwt>'
    }
  },

  security: [
    {
      bearerAuth: []
    }
  ]
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./app.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);