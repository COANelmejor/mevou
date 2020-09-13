module.exports = function (email) {
  // eslint-disable-next-line no-useless-escape
  var re = /^[0-9a-z.-]+$/;
  return re.test(email);
}