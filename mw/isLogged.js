/**
 * Usa este módulo para verificar el usaurio logueado
 * Si no lo está, redirige a login.
 */
module.exports = function (req, res, next) {
  // eslint-disable-next-line eqeqeq
  if (req.user == undefined) {
    res.redirect('/login')
  } else {
    res.locals.user = req.user
    res.locals.h1icon = 'fas fa-hand-point-right'
    res.locals.active = 'inicio'
    next()
  }
}