module.exports = function (req, res) {
    res.render('menus', {
        title: 'Menu - Μενού',
        h1: 'Menús',
        h1icon: 'fas fa-book-open',
        active: 'menus'
    });
}