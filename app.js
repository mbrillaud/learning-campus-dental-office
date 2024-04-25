const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const swaggerJSDoc = require('swagger-jsdoc');
const helpers = require('./shared/utils/helpers');
const swaggerUi = require('swagger-ui-express');

const app = express();


const port = helpers.normalizePort(process.env.PORT || '3000');

//Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'Car Rent',
      description: 'Learning Campus Dental Office API documentation',
      contact: {
        name: 'MBrillaud'
      },
      servers: [`http://localhost:${port}`]
    },
    schemes: ['http', 'https'],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [{
      bearerAuth: []
    }]
  },
  apis: ["back-office/routes/*.js", "front-office/routes/*.js"]
};


const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//Dotenv
dotenv.config({path: '.env'});


//Allow app to read body request
app.use(express.json());

app.use(cors());

module.exports = app;