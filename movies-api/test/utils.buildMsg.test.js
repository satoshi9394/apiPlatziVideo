const assert = require('assert');
const buildMsg = require('../utils/buildMsg')

describe('utils - buildMsg', function(){
  describe('when receives na entity and an action', function(){
    it('should return the respective message', function(){
      const result = buildMsg('movies', 'create')
      const expect = "movies created"
      assert.strictEqual(result, expect) 
    })
  })
  describe('when receives an entity and an action and is a list', function(){
    it('should return the respective msg with the entity in plural', function(){
      const result = buildMsg('movie', 'list');
      const expect = 'movies listed'
      assert.strictEqual(result, expect)
    })
  })
})