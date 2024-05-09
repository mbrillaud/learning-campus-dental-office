const express = require('express');

const app = express();
//Allow app to read body request
app.use(express.json());

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const dotenv = require('dotenv');
dotenv.config({path: '.env'});

const sequelize = require('./utils/sequelize-config');
const cors = require('cors');
const swaggerJSDoc = require('swagger-jsdoc');
const helpers = require('./utils/helpers');
const swaggerUi = require('swagger-ui-express');
const nunjucks = require('nunjucks');

//Vérification du status de l'utilisateur
const checkUserStatus = require('./middlewares/checkUserStatus');
app.use(checkUserStatus);

//Models
const User = require('./models/User');
const News = require('./models/News');
const Service = require('./models/Service');
const Appointment = require('./models/Appointment');
const Schedules = require('./models/Schedules');

//Routes
const viewsRoutes = require('./routes/front-end');
const usersRoutes = require('./routes/users');
const schedulesRoutes = require('./routes/schedules');
const servicesRoutes = require('./routes/services');

app.use('/', viewsRoutes);
app.use('/api/auth', usersRoutes);
app.use('/api/schedules', schedulesRoutes);
app.use('/api/services', servicesRoutes);



//Sequelize
sequelize.authenticate()
    .then(() => {
        console.log('Connection to the database has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
});

// sequelize.sync({ force: false })
//   .then(() => {
//     console.log('Tables synchronized successfully.');
//   })
//   .catch(err => {
//     console.error('Error synchronizing tables:', err);
//   });

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
  apis: ["back-office/routes/*.js", "front-office/routes/*.js", "routes/*.js"]
};


const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//Nunjucks
nunjucks.configure('views',{
    autoescape: true,
    express: app,
    watch: true
});
app.engine ('njk', nunjucks.render);
app.set('view engine', 'njk');


app.use('/public', express.static(__dirname + '/public'));

app.use(cors());

module.exports = app;