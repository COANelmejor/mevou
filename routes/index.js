module.exports = function (app) {
    app.use('/', require('./home'));
    app.use('/login', require('./login'));
    app.use('/register', require('./register'));
    app.use('/forgot-password', require('./forgot-password'));
    app.use('/recover-password', require('./recover-password'));
    app.use('/dashboard', require('./dashboard'));
    app.use('/menus', require('./menu'));
    app.use('/crear-menu', require('./crear-menu'));
    app.use('/categorias-add-platillos', require('./categorias-add-platillos'));
}