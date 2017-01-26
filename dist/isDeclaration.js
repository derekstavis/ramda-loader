'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var isDeclaration = function isDeclaration(node, parent) {

  if (node.type === 'Identifier' && (parent.type === 'VariableDeclarator' && parent.id.name === node.name || parent.type === 'SequenceExpression' && undefined !== parent.expressions.find(function (x) {
    return x.name === node.name;
  }) || parent.type === 'FunctionDeclaration' && parent.id.name === node.name || parent.type === 'FunctionDeclaration' && undefined !== parent.params.find(function (x) {
    return x.name === node.name;
  }) || parent.type === 'MemberExpression' && parent.object.name === node.name && parent.object.start === node.start && -1 === ['apply', 'call'].indexOf(parent.property.name) || parent.type === 'ImportSpecifier' && parent.local.name === node.name || parent.type === 'ImportDefaultSpecifier' && parent.local.name === node.name || (parent.type === 'ImportNamespaceSpecifier' && parent.local.name === node.name) | (parent.type === 'ExportSpecifier' && parent.exported.name === node.name) || parent.type === 'ExportSpecifier' && parent.local.name === node.name)) {
    return true;
  } else {
    return false;
  }
};

exports.default = isDeclaration;
//# sourceMappingURL=isDeclaration.js.map
