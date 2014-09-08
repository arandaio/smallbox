/*
  Module exports
*/
module.exports = {
  invalidName: function(name) { return '`' + name + '` isn\'t a valid name, expected `type:name`'; },
  reRegister: function(name) { return 'cannot re-register `' + name + '`. It already been looked up!'; }
};