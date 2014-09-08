/*
  Module dependencies
*/
var merge = require('utils-merge');
var wildcard = require('wildcard');
var messages = require('./messages');

/*
  Smallbox

  @constructor
*/
function Smallbox() {
  this._registry = {};
  this._cache = [];
}

Smallbox.prototype = {
  /*
    @property _registry
    @type Object
    @default {}
    @private
  */
  _registry: {},

  /*
    @property _cache
    @type Array
    @default []
    @private
  */
  _cache: [],

  /*
    Registers a component

    Example:

    ```javascript
    var container = require('smallbox');

    container.register('resource:users', UsersResource);
    container.register('store:main', function() { return 'store'; });
    container.register('api:github', {});

    ```
    @method register
    @param {String} name
    @param {Mixed} component
    @return {Mixed} the registered component
  */
  register: function(name, component) {
    assert(messages.invalidName(name), validateName( name ));
    assert(messages.reRegister(name), this._cache.indexOf(name) === -1);

    return this._registry[name] = component;
  },

  /*
    Unregister a previously registered component

    @method unregister
    @param {String} name - the name of the component to remove
  */
  unregister: function(name) {
    assert(messages.invalidName(name), validateName( name ));

    delete this._registry[name];

    var indexOf = this._cache.indexOf(name);

    if ( indexOf !== -1 ) {
      this._cache.splice(indexOf, 1);
    }
  },

  /*
    Searches components by name accepting wildcard notation

    Example:

    ```javascript
    var container = require('smallbox');

    container.register('resource:users', UsersResource);
    container.register('resource:posts', PostsResource);

    container.lookup('resource:images'); //=> undefined
    container.lookup('resource:users'); //=> UsersResource
    container.lookup('resource:*');
    //=> { 'resource:users': UsersResource, 'resource:posts': PostsResource }
    ```

    @method lookup
    @param {String} name
    @return {Mixed} the component
  */
  lookup: function(name) {
    var found = wildcard(name, this._registry, ':');
    var keys = Object.keys(found);
    var length = keys.length;

    if (  length === 0 ) {
      return undefined;
    }

    // store returned names in cache to prevent re-registration of them
    keys.forEach(function(key) {
      if ( this._cache.indexOf( key ) === -1 ) {
        this._cache.push( key );
      }
    }, this);

    if ( length === 1 ) {
      return found[ keys[0] ];
    } else {
      return found;
    }
  },

  /*
    Checks if the container has registered a content

    Example:

    ```javascript
    var container = require('smallbox');

    container.register('resource:users', {});

    container.has('resource:users'); //=> true
    container.has('resource:posts'); //=> false
    ```

    @method has
    @param {String} name
    @return {Boolean}
  */
  has: function(name) {
    return this.lookup( name ) !== undefined;
  }
};

// expose prototype to main function for single use
merge(Smallbox, Smallbox.prototype);

/*
  Module helpers
*/
function assert(message, condition) {
  if ( ! condition ) {
    throw new Error(message);
  }
}

function validateName(name) {
  return /^[^:]+.+:[^:]+$/.test(name);
}

/*
  Module exports
*/
module.exports = Smallbox;
