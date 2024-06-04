// Load environment variables
require('dotenv').config({path: '.env'});

// Module imports
const express = require('express');
const cookieParser = require('cookie-parser');
const sequelize = require('./utils/sequelize-config');
const cors = require('cors');
const swaggerJSDoc = require('swagger-jsdoc');
const helpers = require('./utils/helpers');
const swaggerUi = require('swagger-ui-express');
const nunjucks = require('nunjucks');
const checkUserStatus = require('./middlewares/checkUserStatus');
const viewsRoutes = require('./routes/front-end');
const usersRoutes = require('./routes/users');
const schedulesRoutes = require('./routes/schedules');
const servicesRoutes = require('./routes/services');
const photosRoutes = require('./routes/photos');
const newsRoutes = require('./routes/news');
const appointmentsRoutes = require('./routes/appointments');

// App configuration
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(checkUserStatus);
app.use(cors());
app.use('/public', express.static(__dirname + '/public'));

// Database initialization
sequelize.authenticate()
    .then(() => {
        console.log('Connection to the database has been established successfully.');

        return sequelize.sync({ force: false });
    })
    .then(() => {
        console.log('Tables synchronized successfully.');

        // Routes
        app.use('/', viewsRoutes);
        app.use('/api/auth', usersRoutes);
        app.use('/api/schedules', schedulesRoutes);
        app.use('/api/services', servicesRoutes);
        app.use('/api/upload/office', photosRoutes);
        app.use('/api/news', newsRoutes);
        app.use('/api/appointments', appointmentsRoutes);
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

// Swagger
const port = helpers.normalizePort(process.env.PORT || '3000');
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'Dental Office API',
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
  apis: ["back-office/routes/*.js", "front-office/routes/*.js", "routes/*.js"]
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Nunjucks
nunjucks.configure('views',{
    autoescape: true,
    express: app,
    watch: true
});
app.engine ('njk', nunjucks.render);
app.set('view engine', 'njk');

module.exports = app;