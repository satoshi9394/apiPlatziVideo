const express = require('express');
const MoviesService = require('../services/movies')



function moviesApi(app) {
  const router = express.Router();
  app.use("/api/movies", router);
  const moviesService = new MoviesService();

  router.get("/", async function(req, res, next){
    const { tags } = req.query;
    try {
      const movies = await moviesService.getMovies({ tags });
      //throw new Error('Error getting movies') validar la capa de errores
      res.status(200).json({
        data: movies,
        msg: "Movies listed"
      })
    } catch(err){
      next(err);
    }
  })

  router.get("/:movieId", async function(req, res, next){
    const { movieId } = req.params
    try {
      const movies = await moviesService.getMovie({ movieId });
      res.status(200).json({
        data: movies,
        msg: "Movies retrieved"
      })
    } catch(err){
      next(err);
    }
  })

  router.post("/", async function(req, res, next){
    const { body: movie } = req
    try {
      const createdMovieId = await moviesService.createMovie({ movie });
      res.status(201).json({
        data: createdMovieId,
        msg: "movie created"
      })
    } catch(err){
      next(err);
    }
  })

  router.put("/:movieId", async function(req, res, next){
    const { body: movie } = req
    const { movieId } = req.params
    try {
      const updateMovieId = await moviesService.updateMovie({ 
        movieId, 
        movie 
      });
      res.status(200).json({
        data: updateMovieId,
        msg: "movie update"
      })
    } catch(err){
      next(err);
    }
  })
  router.delete("/:movieId", async function(req, res, next){
    const { movieId } = req.params
    try {
      const deleteMovieId = await moviesService.deleteMovie({ movieId });;
      res.status(200).json({
        data: deleteMovieId,
        msg: "movie deleted"
      })
    } catch(err){
      next(err);
    }
  })
  router.patch('/:movieId', async (req, res, next) => {
    const { movieId } = req.params;
    const { body: movie } = req;
    try {
      const replacedMovieId = await moviesService.replacedMovie({
        movieId,
        movie
      });
      res.status(200).json({
        data: replacedMovieId,
        message: 'patch'
      });
    } catch (err) {
      next(err);
    }
  });

}

module.exports = moviesApi;