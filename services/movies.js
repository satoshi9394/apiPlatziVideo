const { moviesMock } = require('../utils/mocks/movies')


class MoviesService {
  async getMovies() {
    const movies = await Promise.resolve(moviesMock);
    return movies || [];
  } 

  async getMovie() {
    const movie = await Promise.resolve(moviesMock[0]);
    return movie || {};
  }

  async createMovie () {
    const createMovieID = await Promise.resolve(moviesMock[0].id);
    return createMovieID;
  }
  async updateMovie () {
    const updatedMovieID = await Promise.resolve(moviesMock[0].id);
    return updatedMovieID;
  }
  async deleteMovie () {
    const deletedMovieID = await Promise.resolve(moviesMock[0].id);
    return deletedMovieID;
  }
  async replacedMovie(movieId, movie) {
    let replacedMovie = await Promise.resolve(moviesMock[0].id);
    return replacedMovie || {};
  }

}

module.exports = MoviesService