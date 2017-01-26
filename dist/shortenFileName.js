'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var shortenFileName = function shortenFileName(file) {

  // Shorten the file name
  if (file.length > 30) {
    file = file.substr(file.length - 30);
    file = file.substr(file.indexOf('/'));
    file = '..' + file;
  }

  return file;
};

exports.default = shortenFileName;
//# sourceMappingURL=shortenFileName.js.map
