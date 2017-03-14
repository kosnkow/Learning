var request = require('supertest');
var appFactory = require('../src/app');




describe('Book inventory', function() {
    it('allows to stock up the items', function(done) {
        var stockRepository = require('../src/inMemoryRepository')();
        var app = appFactory(stockRepository);

        request(app).
        post('/stock').
        send({ isbn: '1234', count: 10 }).
        expect('Content-Type', /json/).
        expect(200, { isbn: '1234', count: 10 }, done);
    });

    it('check count', function(done) {
        var stockRepository = require('../src/inMemoryRepository')();
        stockRepository._items([{ isbn: '03333333', count: 1 }]);
        var app = appFactory(stockRepository);

        request(app).get('/stock/03333333').set('Accept', 'application/json').expect(200, { count: 1 }, done);
    });
});