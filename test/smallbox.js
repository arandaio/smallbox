var expect = require('chai').expect;
var Container = require('../lib/smallbox');

describe('Smallbox', function() {
  beforeEach(function() {
    // reset storage
    Container._registry = {};
    Container._cache = [];
  });

  describe('#define', function() {
    it('should define a content using the provided name', function() {
      Container.define('user:name', 'Javier');
      expect( Container._registry ).to.include.keys( 'user:name' );
    });

    it('should throw an error if the provided name is invalid', function() {
      expect( function() { Container.define('name'); } ).to.throw(Error);
    });

    it('should re-define a content if the content has not been requested before', function() {
      Container.define('user:name', 'Javier');
      Container.define('user:name', 'Herminia');

      expect( Container.require('user:name') ).to.be.equal( 'Herminia' );
    });

    it('should throw an error if the name already exists and has been requested before', function() {
      Container.define('user:name');
      Container.require('user:name');

      expect( function() { Container.define('user:name'); } ).to.throw(Error);
    });
  });

  describe('#undefine', function() {
    it('should undefine a previosly defined component', function() {
      Container.define('user:name', 'Javier');
      Container.undefine('user:name');

      expect( Container.require('user:name') ).to.be.undefined;
    });
  });

  describe('#require', function() {
    it('should return undefined if the searches return nothing', function() {
      expect( Container.require('user:name') ).to.be.equal.undefined;
    });

    it('should return the component if found it', function() {
      Container.define('user:name', 'Javier');

      expect( Container.require('user:name') ).to.be.equal( 'Javier' );
    });

    it('should allow the use of wildcard character', function() {
      Container.define('user:name', 'Javier');
      Container.define('user:surname', 'Aranda');

      var found = Container.require('user:*');

      expect( found ).to.has.property('user:name', 'Javier');
      expect( found ).to.has.property('user:surname', 'Aranda');
    });

    it('should return a single component using wildcard', function() {
      Container.define('user:name', 'Javier');

      expect( Container.require('user:*') ).to.be.equal( 'Javier' );
    });
  });

  describe('#has', function() {
    it('should return true if the component already been defined', function() {
      Container.define('user:name', 'Javier');

      expect( Container.has('user:name') ).to.be.true;
    });

    it('should return false if the component do not exists', function() {
      expect( Container.has('user:name') ).to.be.false;
    });

    it('should allow the use of wildcard character', function() {
      Container.define('user:name', 'Javier');
      Container.define('user:surname', 'Aranda');

      expect( Container.has('user:*') ).to.be.true;
      expect( Container.has('profile:*') ).to.be.false;
    });
  });

  describe('new', function() {
    var container1, container2;

    beforeEach(function() {
      container1 = new Container();
      container2 = new Container();
    });

    it('should be able to create new individual instances of the container', function() {
      container1.define('user:name', 'Javier');
      container2.define('user:name', 'Herminia');

      expect( container1.require('user:name') ).to.be.equal( 'Javier' );
      expect( container2.require('user:name') ).to.be.equal( 'Herminia' );
    });
  })
});
