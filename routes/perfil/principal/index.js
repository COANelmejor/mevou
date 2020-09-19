module.exports = function (req, res) {
    res.render('perfil', {
        title: 'Dashboard - Μενού',
        h1: 'Mi Perfil',
        h1icon: 'fas fa-user'
    });
}