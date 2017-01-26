'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var rowAt = function rowAt(text, charNo) {
  var sub = text.substr(0, charNo);
  var rows = sub.split('\n');
  return rows.length;
};

exports.default = rowAt;
//# sourceMappingURL=rowAt.js.map
