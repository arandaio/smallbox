# smallbox

[![NPM][npm-image]][npm-url]

a lightweight container library for node.js

[![Build Status][travis-image]][travis-url]


## Installation

```bash
$ npm install smallbox
```


## Usage

```javascript
var container = require('smallbox');

// register components
container.define('user:name', 'Javier');
container.define('user:surname', 'Aranda');
container.define('files:storage', 's3');

// get components
if ( container.has('user:name') ) {
  console.log( container.require('user:name') );
}

// using wildcard
container.require('user:*'); //=> { 'user:name': 'Javier', 'user:surname': 'Aranda' }
```

### Share a container between two modules

```javascript
// module_a.js

var container = require('smallbox');
container.define('user:location', 'Spain');
```

```javascript
// module_b.js

var container = require('smallbox');
container.require('user:location'); // => 'Spain'
```

More examples are available inside the code or tests.


## Testing

The library is tested using Mocha.

```bash
$ npm test
```


## Contributing

1. Fork it ( https://github.com/arandaio/smallbox/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request


## Versioning

**smallbox** uses [Semantic Versioning 2.0.0](http://semver.org)


## Contact

* Author: Javier Aranda
* Home Page: http://aranda.io
* Twitter: https://twitter.com/arandaio
* Email: javier@aranda.io
* Github: https://github.com/arandaio
* Issues: https://github.com/arandaio/smallbox/issues


## License

Copyright (c) 2015 Javier Aranda - Released under [MIT](LICENSE) license

[npm-image]: https://nodei.co/npm/smallbox.png
[npm-url]: https://npmjs.org/package/smallbox
[travis-image]: https://img.shields.io/travis/arandaio/smallbox.svg?style=flat-square
[travis-url]: https://travis-ci.org/arandaio/smallbox
