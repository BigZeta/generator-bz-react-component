var chai = require('chai');
var expect = chai.expect;
var should = chai.should();

// Import the module(s) to test
var starWars = require('../../src');

describe('core test', function () {

    it('should just pass', function () {
        (2 + 2).should.equal(4);
    });

    it('should fail', function () {
        // Two different ways to do it.
        (2 + 2).should.not.equal(5);
        expect(9 * 4).to.equal(36);
    });
});

describe('starwars-names', function () {
    it('should be an array of strings', function () {
        (starWars.all).should.satisfy(isArrayOfStrings);

        function isArrayOfStrings(array) {
            return array.every(function (item) {
                return typeof item === 'string';
            })
        }
    });

    it('should contain `Luke Skywalker`', function () {
        (starWars.all).should.include('Luke Skywalker');
    });

    it('should return a random item from starwars.all', function () {
        var randomItem = starWars.random();

        (starWars.all).should.include(randomItem);
    });

    it('should return an array of random items if passed a number', function () {
        var randomItems = starWars.random(3);
        (randomItems).should.have.length(3);
        randomItems.forEach(function (item) {
            (starWars.all).should.include(item);
        })
    });
});
