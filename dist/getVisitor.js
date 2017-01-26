'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _rowAt = require('./rowAt');

var _rowAt2 = _interopRequireDefault(_rowAt);

var _charAt = require('./charAt');

var _charAt2 = _interopRequireDefault(_charAt);

var _isIdentifier = require('./isIdentifier');

var _isIdentifier2 = _interopRequireDefault(_isIdentifier);

var _isDeclaration = require('./isDeclaration');

var _isDeclaration2 = _interopRequireDefault(_isDeclaration);

var _redeclareError = require('./redeclareError');

var _redeclareError2 = _interopRequireDefault(_redeclareError);

var _astTypes = require('ast-types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getVisitor = function getVisitor(ctx) {
  return function (node, parent) {

    if (-1 !== ctx.ramdaFns.indexOf(node.name)) {
      var rowLoc = (0, _rowAt2.default)(ctx.source, node.start);
      var charLoc = (0, _charAt2.default)(ctx.source, node.start);

      if ((0, _isIdentifier2.default)(node, parent)) {

        if (-1 === ctx.ramdaImportFns.indexOf(node.name)) {
          ctx.ramdaImportFns.push(node.name);
        }

        if (ctx.debug === true && '__' !== node.name) {
          return _astTypes.builders.callExpression(_astTypes.builders.identifier(ctx.wrapperId), [_astTypes.builders.literal(ctx.file), _astTypes.builders.literal(rowLoc), _astTypes.builders.literal(charLoc), _astTypes.builders.literal(node.name), _astTypes.builders.identifier(node.name)]);
        }
      } else if ((0, _isDeclaration2.default)(node, parent)) {
        ctx.emitError((0, _redeclareError2.default)(ctx, rowLoc, charLoc, node.name));
      }
    }

    return node;
  };
};

exports.default = getVisitor;
//# sourceMappingURL=getVisitor.js.map
