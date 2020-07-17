/**
 * Usa este módulo para verificar el usaurio logueado es un dueño.
 * Si no lo es, responde con un stado 401 y un JSON.
 */
module.exports = function (req, res, next) {
  // eslint-disable-next-line eqeqeq
  if (req.user.tipo == 'owner') {
    next()
  } else {
    res.status(401).send({
      message: 'No tienes permiso para acceder a este proceso.'
    })
  }
}
