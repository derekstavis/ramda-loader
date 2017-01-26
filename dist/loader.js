'use strict';

var _escodegen = require('escodegen');

var _escodegen2 = _interopRequireDefault(_escodegen);

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _estraverse = require('estraverse');

var _loaderUtils = require('loader-utils');

var _loaderUtils2 = _interopRequireDefault(_loaderUtils);

var _getVisitor = require('./getVisitor');

var _getVisitor2 = _interopRequireDefault(_getVisitor);

var _shortenFileName = require('./shortenFileName');

var _shortenFileName2 = _interopRequireDefault(_shortenFileName);

var _wrapper = require('./wrapper');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var acorn = require('acorn');


module.exports = function (source, map) {
  var self = this;
  var ast = void 0;

  var query = _loaderUtils2.default.parseQuery(self.query);

  // Setup context
  self.debug = query.debug;
  self.strict = query.strict === undefined ? true : query.strict;
  self.ramdaImportFns = [];
  self.wrapperId = _wrapper.id;
  self.ramdaFns = Object.keys(_ramda2.default).filter(function (x) {
    return x !== 'default';
  });
  self.file = (0, _shortenFileName2.default)(self.resourcePath);
  self.source = source;
  self.cacheable();

  var visitor = {
    leave: (0, _getVisitor2.default)(self)
  };

  try {
    ast = acorn.parse(source, {
      sourceType: 'module'
    });
  } catch (e) {
    self.callback(null, source, map);
    return;
  }

  if (self.debug === true) {
    var tree = (0, _estraverse.replace)(ast, visitor);
    source = _escodegen2.default.generate(tree);
  } else {
    (0, _estraverse.traverse)(ast, visitor);
  }

  // Add header and imports only if the file contained RamdaJs functions
  if (self.ramdaImportFns.length > 0) {

    if (self.strict) {
      // Add global Ramda fns
      var header = 'var R = require("ramda")\n';
      header += _ramda2.default.join('\n', _ramda2.default.map(function (x) {
        return 'var ' + x + ' = R.' + x;
      }, self.ramdaImportFns));
      source = header + '\n\n' + source;
    }

    // Add ramdaDebugWrapper
    if (self.debug === true) {
      source = 'var ' + _wrapper.id + ' = require(\'' + __dirname + '/../dist/wrapper.js\').fn \n ' + source;
    }
  }

  self.callback(null, source, map);
};
//# sourceMappingURL=loader.js.map
