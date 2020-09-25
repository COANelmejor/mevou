module.exports = function (req, res) {
    res.render('m', {
        title: 'Μενού',
        shortname: req.params.shortname,
    });
}