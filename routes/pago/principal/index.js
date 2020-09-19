module.exports = function (req, res) {
    res.render('pago', {
        title: 'Mi Suscripción - Μενού',
        h1: 'Tu Suscripción',
        h1icon: 'fas fa-tachometer-alt'
    });
}