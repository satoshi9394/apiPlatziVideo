const express = require('express');
const { moviesMock } = require('../utils/mocks/movies')

function moviesApi(app) {
  const router = express.Router();
  app.use("/api/movies", router);
  //pedir datos 
  router.get("/", async function(req, res, next){
    try {
      const movies = await Promise.resolve(moviesMock);
      res.status(200).json({
        data: movies,
        msg: "Movies listed"
      })
    } catch(err){
      next(err);
    }
  })

  router.get("/:movieId", async function(req, res, next){
    try {
      const movies = await Promise.resolve(moviesMock[0]);
      res.status(200).json({
        data: movies,
        msg: "Movies retrieved"
      })
    } catch(err){
      next(err);
    }
  })

  router.post("/", async function(req, res, next){
    try {
      const createdMovieId = await Promise.resolve(moviesMock[0].id);
      res.status(201).json({
        data: createdMovieId,
        msg: "movie created"
      })
    } catch(err){
      next(err);
    }
  })

  router.put("/:movieId", async function(req, res, next){
    try {
      const updateMovieId = await Promise.resolve(moviesMock[0].id);
      res.status(200).json({
        data: updateMovieId,
        msg: "movie update"
      })
    } catch(err){
      next(err);
    }
  })
  router.delete("/:movieId", async function(req, res, next){
    try {
      const deleteMovieId = await Promise.resolve(moviesMock[0].id);
      res.status(200).json({
        data: deleteMovieId,
        msg: "movie deleted"
      })
    } catch(err){
      next(err);
    }
  })

}

module.exports = moviesApi;