'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.closureId = exports.id = exports.fn = exports.regex = undefined;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fn = function fn() {};

var ramdaWrappers = {
  f1: _ramda2.default.prop('a'),
  f2: _ramda2.default.prop,
  f3: _ramda2.default.mergeWith,
  n1: _ramda2.default.curryN(2, fn).apply(null, [null]),
  n2: _ramda2.default.curryN(2, fn),
  n3: _ramda2.default.curryN(3, fn),
  n4: _ramda2.default.curryN(4, fn),
  n5: _ramda2.default.curryN(5, fn),
  n6: _ramda2.default.curryN(6, fn),
  n7: _ramda2.default.curryN(7, fn),
  n8: _ramda2.default.curryN(8, fn),
  n9: _ramda2.default.curryN(9, fn),
  n10: _ramda2.default.curryN(10, fn)
};

var ramdaWrappersList = Object.keys(ramdaWrappers).map(function (x) {
  return ramdaWrappers[x].toString();
});

var wrapper = function wrapper(FileName, Row, Char, fnName, fn) {
  return function __ramdaDebugWrapperClosure() {
    var args = Array.prototype.slice.call(arguments);

    try {
      var result = fn.apply(null, args);

      if (true === result instanceof Function && -1 !== ramdaWrappersList.indexOf(result.toString())) {
        return wrapper(FileName, Row, Char, fnName, result);
      } else {
        return result;
      }
    } catch (e) {
      var message = FileName + ':' + Row + ':' + Char + ':' + fnName + '\n';
      console.error('Error args: ', args);
      e.message = message + e.message;
      e.FileName = FileName;
      e.Row = Row;
      e.Char = Char;
      e.args = args;
      throw e;
    }
  };
};

var regex = /__ramdaDebugWrapper\('([\.\/\w\-]+)',\s(\d+),\s(\d+),\s'(\w+)',\s(\w+)\)/g;

var id = '__ramdaDebugWrapper';
var closureId = '__ramdaDebugWrapperClosure';

exports.regex = regex;
exports.fn = wrapper;
exports.id = id;
exports.closureId = closureId;
//# sourceMappingURL=wrapper.js.map
