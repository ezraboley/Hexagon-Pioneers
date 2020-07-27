var assert = require('assert');

describe('Array', function () {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});

var actions = require('../actions.js');
describe('Actions', function () {
  describe('#hello()', function () {
    it('should return hello', function () {
      assert.equal(actions.hello(), "Hello");
    });
  });
});