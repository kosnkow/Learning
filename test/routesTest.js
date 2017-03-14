var assert = require('assert');
var routesFactory = require('../src/routes');

describe('Route', function() {
    it('get count should return the number of existing items', function(done) {
        // given 
        var stockRepository = {
            getCount: function(isbn) {
                assert.equal(isbn, '1234567890');
                return Promise.resolve(1);
            }
        };
        var req = {
            params: {
                isbn: '1234567890'
            }
        };
        var routes = routesFactory(stockRepository);
        var res = {
            json: function(body) {
                assert.deepEqual(body, { count: 1 });
                res.json.called = true;
            }
        };

        // when  
        routes.getCount(req, res).then(function() {
            assert.ok(res.json.called);
            done();
        }).catch(done);

        // then
    });

    it('get count should pass to 404 middleware on no items in repository', function(done) {
        var stockRepository = {
            getCount: function(isbn) {
                return Promise.resolve(null);
            }
        };

        var routes = routesFactory(stockRepository);
        var req = {
            params: {
                isbn: '1234567890'
            }
        };
        var next = function() {
            done();
        };

        routes.getCount(req, "irrelevant", next).catch(done);
    });

});