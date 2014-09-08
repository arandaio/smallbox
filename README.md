# smallbox

[![NPM][npm-image]][npm-url]

a lightweight container library for node.js

[![Node.js Version][node-image]][node-url]
[![Build Status][travis-image]][travis-url]


## Installation

```bash
$ npm install smallbox
```


## Usage

```javascript
var container = require('smallbox');

// register components
container.register('user:name', 'Javier');
container.register('user:surname', 'Aranda');
container.register('files:storage', 's3');

// get components
if ( container.has('user:name') ) {
  console.log( container.lookup('user:name') );
}

// using wildcard
container.lookup('user:*'); //=> { 'user:name': 'Javier', 'user:surname': 'Aranda' }
```

More examples are available inside the code.


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

Copyright (c) 2014 Javier Aranda - Released under [MIT](LICENSE) license

[npm-image]: https://nodei.co/npm/smallbox.png
[npm-url]: https://npmjs.org/package/smallbox
[node-image]: http://img.shields.io/badge/node.js-%3E%3D_0.8-brightgreen.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[travis-image]: https://img.shields.io/travis/arandaio/smallbox.svg?style=flat-square
[travis-url]: https://travis-ci.org/arandaio/smallbox
