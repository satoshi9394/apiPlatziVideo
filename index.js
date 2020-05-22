const express = require('express');
const app = express();

const { config } = require('./config/index');

const moviesApi = require('./routes/movies.js')
//para errores de el back end
const { 
  logErrors,
  wrapError, 
  errorHandler 
} = require('./utils/middleware/errorHandlers')

const notFoundHandler = require('./utils/middleware/notFoundHandler')


//body parser
app.use(express.json())

//routes
moviesApi(app);

//catch 404
app.use(notFoundHandler)

//manejadores de errores
app.use(logErrors)
app.use(wrapError)
app.use(errorHandler)


app.listen(config.port, function() {
  console.log(`Escuchando en http://localhost:${config.port}`);
});