"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var redeclareError = function redeclareError(ctx, rowLoc, charLoc, name) {
  return new Error("\n\n  [ramda-loader]\n  Error: \"" + name + "\" is redeclared in " + ctx.file + ":" + rowLoc + ":" + charLoc + "\n  RamdaJs functions shouldn't be redeclared if you want to use RamdaJs without the R. namespace.\n\n            ");
};

exports.default = redeclareError;
//# sourceMappingURL=redeclareError.js.map
