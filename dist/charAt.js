'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var charAt = function charAt(text, charNo) {
  var sub = text.substr(0, charNo);
  return charNo - sub.lastIndexOf('\n');
};

exports.default = charAt;
//# sourceMappingURL=charAt.js.map
