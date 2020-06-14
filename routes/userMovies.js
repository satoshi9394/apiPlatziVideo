const express = require('express')

const UserMoviesServices = require('../services/userMovies')
const validationHandler = require('../utils/middleware/validationHandler')

const { movieIdSchema } = require('../utils/schema/movies')
const { userIdSchema } = require('../utils/schema/users')
const { createUserMovieSchema } = require('../utils/schema/userMovies')


function userMoviesApi(app) {
  const router = express.Router();
  app.user('/api/user-movies', router)

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
}