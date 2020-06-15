const express = require('express')

const UserMoviesServices = require('../services/userMovies')
const validationHandler = require('../utils/middleware/validationHandler')

const { movieIdSchema } = require('../utils/schema/movies')
const { userIdSchema } = require('../utils/schema/users')
const { createUserMovieSchema } = require('../utils/schema/userMovies')


function userMoviesApi(app) {
  const router = express.Router();
  app.use('/api/user-movies', router)

  const userMoviesServices = new UserMoviesServices()

  router.get('/', validationHandler({userId: userIdSchema}, 'query'),
    async function(req, res, next) {
      const { userId } = req.query;
      try {
        const userMovies = await userMoviesServices.getUserMovies({ userId })

        res.status(200).json({
          data: userMovies,
          message: 'user movies listed'
        })
      } catch(error) {
        next(error)
      }
    }
  );
  router.post('/', validationHandler(createUserMovieSchema), 
    async function(req, res, next){
      const { body: userMovie } = req;
      try {
        const createdUserMovieId = await userMoviesServices.createUserMovie({
          userMovie
        });
        res.status(201).json({
          data: createdUserMovieId,
          message: 'user movie created'
        })
      } catch (error) {
          next(error)
      }
    }
  );
  
  router.delete('/:userMovieId', validationHandler({ userMovieId: movieIdSchema }, 'params' ),
    async function(req, res, next) {
      const { userMovieId } = req.params

      try {
        const deletedUserMovieId = await userMoviesServices.deleteUserMovie({
          userMovieId
        })
        res.status(200).json({
          data: deletedUserMovieId,
          message: 'user movie delete'
        })
      } catch (error) {
        next(error)
      }
    }
  )
}

module.exports = userMoviesApi;