module.exports = function (app) {
    app.use('/api/v1', require('./home'));
    app.use('/api/v1/logout', require('./logout'));
    app.use('/api/v1/users', require('./users'));
}