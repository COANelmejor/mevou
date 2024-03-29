module.exports = function (app) {
    app.use('/', require('./home'));
    app.use('/login', require('./login'));
    app.use('/register', require('./register'));
    app.use('/forgot-password', require('./forgot-password'));
    app.use('/recover-password', require('./recover-password'));
    app.use('/dashboard', require('./dashboard'));
    app.use('/suscripcion', require('./suscripcion'));
    app.use('/perfil', require('./perfil'));
    app.use('/menus', require('./menus'));
    app.use('/editar-menu', require('./editar-menu'));
    app.use('/categorias-add-platillos', require('./categorias-add-platillos'));
    app.use('/m', require('./m'));
}