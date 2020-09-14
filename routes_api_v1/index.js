module.exports = function (app) {
    app.use('/api/v1', require('./home'));
    app.use('/api/v1/logout', require('./logout'));
    app.use('/api/v1/users', require('./users'));
    app.use('/api/v1/menus', require('./menus'));
    app.use('/api/v1/categorias', require('./categorias'));
}