module.exports = function (app) {
    app.use('/', require('./home'));
    app.use('/recover-password', require('./recover-password'));
}