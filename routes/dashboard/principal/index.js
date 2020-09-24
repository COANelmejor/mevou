module.exports = function (req, res) {
    res.render('dashboard', {
        title: 'Dashboard - Μενού',
        h1: 'Inicio',
        h1icon: 'fas fa-tachometer-alt'
    });
}