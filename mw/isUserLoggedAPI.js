/**
 * Usa este módulo para verificar si unusuario está logueado.
 * Si no está logueado, responde con un stado 401 y un JSON.
 */
module.exports = function (req, res, next) {
  // eslint-disable-next-line eqeqeq
  if (req.user == undefined) {
    res.status(401).send({
      message: 'No tienes permiso para acceder a este proceso.'
    })
  } else {
    next()
  }
}
