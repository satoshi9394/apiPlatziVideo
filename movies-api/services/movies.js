const MongoLib = require('../lib/mongo')


class MoviesService {
  constructor() {
    this.collection = 'movies';
    this.mongoDb = new MongoLib()
  }
  async getMovies({ tags }) {
    const query = tags && { tags: { $in: tags}};
    const movies = await this.mongoDb.getAll(this.collection, query);
    return movies || [];
  } 

  async getMovie({ movieId }) {
    const movie = await this.mongoDb.get(this.collection, movieId);
    return movie || {};
  }

  async createMovie ({ movie }) {
    const createMovieID = await this.mongoDb.create(this.collection, movie);
    return createMovieID;
  }
  async updateMovie ({  movieId, movie } = {}) {
    const updatedMovieID = await this.mongoDb.update(this.collection, movieId, movie);
    return updatedMovieID;
  }
  async deleteMovie ({ movieId }) {
    const deletedMovieID = await this.mongoDb.delete(this.collection, movieId);
    return deletedMovieID;
  }
  /*
  async replacedMovie(movieId, movie) {
    let replacedMovie = await Promise.resolve(moviesMock[0].id);
    return replacedMovie || {};
  }*/

}

module.exports = MoviesService