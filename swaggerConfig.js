const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Simple Blog API',
      version: '1.0.0',
      description: 'This is a simple CRUD API for managing blog articles, categories, users, and comments.',
      contact: {
        name: 'Eljefe_213',
        email: 'abdelghani.hamaz.pro@gmail.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000'
      }
    ],
    components: {
      schemas: {
        Article: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'The unique identifier of the article',
              example: '1'
            },
            title: {
              type: 'string',
              description: 'The title of the article',
              example: 'How to Learn JavaScript'
            },
            content: {
              type: 'string',
              description: 'The content of the article',
              example: 'JavaScript is essential for frontend development...'
            },
            authorId: {
              type: 'string',
              description: 'The identifier of the author',
              example: '2'
            }
          },
          required: ['title', 'content', 'authorId']
        },
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'A message describing the error',
              example: 'Not found'
            },
            statusCode: {
              type: 'integer',
              description: 'The HTTP status code',
              example: 404
            }
          }
        }
      }
    }
  },
  apis: ['./src/infrastructure/web/routes/*.js'], 
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

function setupSwagger(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = setupSwagger;
