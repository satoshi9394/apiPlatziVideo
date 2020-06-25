const express = require('express')
const passport = require('passport')

const UserMoviesServices = require('../services/userMovies')
const validationHandler = require('../utils/middleware/validationHandler')
const scopesValidationHandler = require('../utils/middleware/scopesValidationHandler')

//estrategia de json web token
require('../utils/auth/strategies/jwt')

const { movieIdSchema } = require('../utils/schema/movies')
const { userIdSchema } = require('../utils/schema/users')
const { createUserMovieSchema } = require('../utils/schema/userMovies')


function userMoviesApi(app) {
  const router = express.Router();
  app.use('/api/user-movies', router)

  const userMoviesServices = new UserMoviesServices()

  router.get('/',
  passport.authenticate('jwt', { session: false}),
  scopesValidationHandler(['read:user-movies']), 
    validationHandler({userId: userIdSchema}, 'query'),
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
  router.post('/', 
  passport.authenticate('jwt', { session: false}),
  scopesValidationHandler(['create:user-movies']),   
    validationHandler(createUserMovieSchema), 
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
  
  router.delete('/:userMovieId', 
  passport.authenticate('jwt', { session: false}),
  scopesValidationHandler(['delete:user-movies']),  
  validationHandler({ userMovieId: movieIdSchema }, 'params' ),
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