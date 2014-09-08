var expect = require('chai').expect;
var Container = require('../lib/smallbox');

describe('Smallbox', function() {
  var container;

  beforeEach(function() {
    container = new Container();
  });

  describe('#register', function() {
    it('should register a content using the provided name', function() {
      container.register('user:name', 'Javier');
      expect( container._registry ).to.include.keys( 'user:name' );
    });

    it('should throw an error if the provided name is invalid', function() {
      expect( function() { container.register('name'); } ).to.throw(Error);
    });

    it('should re-register a content if the content has not been requested before', function() {
      container.register('user:name', 'Javier');
      container.register('user:name', 'Herminia');

      expect( container.lookup('user:name') ).to.be.equal( 'Herminia' );
    });

    it('should throw an error if the name already exists and has been requested before', function() {
      container.register('user:name');
      container.lookup('user:name');

      expect( function() { container.register('user:name'); } ).to.throw(Error);
    });
  });

  describe('#unregister', function() {
    it('should unregister a previosly registered component', function() {
      container.register('user:name', 'Javier');
      container.unregister('user:name');

      expect( container.lookup('user:name') ).to.be.undefined;
    });
  });

  describe('#lookup', function() {
    it('should return undefined if the searches return nothing', function() {
      expect( container.lookup('user:name') ).to.be.equal.undefined;
    });

    it('should return the component if found it', function() {
      container.register('user:name', 'Javier');

      expect( container.lookup('user:name') ).to.be.equal( 'Javier' );
    });

    it('should allow the use of wildcard character', function() {
      container.register('user:name', 'Javier');
      container.register('user:surname', 'Aranda');

      var found = container.lookup('user:*');

      expect( found ).to.has.property('user:name', 'Javier');
      expect( found ).to.has.property('user:surname', 'Aranda');
    });

    it('should return a single component using wildcard', function() {
      container.register('user:name', 'Javier');

      expect( container.lookup('user:*') ).to.be.equal( 'Javier' );
    });
  });

  describe('#has', function() {
    it('should return true if the component already been registered', function() {
      container.register('user:name', 'Javier');

      expect( container.has('user:name') ).to.be.true;
    });

    it('should return false if the component do not exists', function() {
      expect( container.has('user:name') ).to.be.false;
    });

    it('should allow the use of wildcard character', function() {
      container.register('user:name', 'Javier');
      container.register('user:surname', 'Aranda');

      expect( container.has('user:*') ).to.be.true;
      expect( container.has('profile:*') ).to.be.false;
    });
  });
});

describe('new Smallbox', function() {
  var container1, container2;

  beforeEach(function() {
    container1 = new Container();
    container2 = new Container();
  });

  it('should be able to create new individual instances of the container', function() {
    container1.register('user:name', 'Javier');
    container2.register('user:name', 'Herminia');

    expect( container1.lookup('user:name') ).to.be.equal( 'Javier' );
    expect( container2.lookup('user:name') ).to.be.equal( 'Herminia' );
  });
});