const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const swaggerJSDoc = require('swagger-jsdoc');
const helpers = require('./shared/utils/helpers');
const swaggerUi = require('swagger-ui-express');
const nunjucks = require('nunjucks');
const Sequelize = require('sequelize');

const app = express();

//Dotenv
dotenv.config({path: '.env'});

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PWD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
  });

sequelize.authenticate()
    .then(() => {
        console.log('Connection to the database has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
});

//Swagger
const port = helpers.normalizePort(process.env.PORT || '3000');
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

//Nunjucks
nunjucks.configure({
    autoescape: true,
    express: app,
    watch: true
});
app.engine ('njk', nunjucks.render);
app.set('view engine', 'njk');

//Allow app to read body request
app.use(express.json());

app.use("/public", express.static(__dirname + "front-office/public"));
app.use("/bopublic", express.static(__dirname + "/back-office/public"));

app.use(cors());

app.get('/bo', function(req, res) {
    res.render('back-office/views/index.njk');
});

module.exports = app;