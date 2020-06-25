const MongoLib = require('../lib/mongo')

class ApiKeysService {
  constructor() {
    this.collection =  'api-keys';
    this.mongoDB = new MongoLib
  }

  async getApikey({ token }){
    const [ apikey ] = await this.mongoDB.getAll(this.collection, { token });
    return apikey
  }
}

module.exports = ApiKeysService;