var acorn = require('acorn')
import escodegen from 'escodegen'
import R from 'ramda'
import { traverse, replace } from 'estraverse'
import loaderUtils from 'loader-utils'
import getVisitor from './getVisitor'
import shortenFileName from './shortenFileName'
import { id as wrapperId } from './wrapper'

module.exports = function(source, map) {
  let self = this
  let ast

  const query = loaderUtils.parseQuery(self.query)

  // Setup context
  self.debug = query.debug
  self.strict = query.strict === undefined ? true : query.strict
  self.ramdaImportFns = []
  self.wrapperId = wrapperId
  self.ramdaFns = Object.keys(R).filter(x => x !== 'default')
  self.file = shortenFileName(self.resourcePath)
  self.source = source
  self.cacheable()

  let visitor = {
    leave: getVisitor(self)
  }

  try {
    ast = acorn.parse(source, {
      sourceType: 'module'
    })
  } catch (e) {
    self.callback(null, source, map)
    return
  }

  if (self.debug === true) {
    let tree = replace(ast, visitor)
    source = escodegen.generate(tree)
  } else {
    traverse(ast, visitor)
  }

  // Add header and imports only if the file contained RamdaJs functions
  if (self.ramdaImportFns.length > 0) {

    if (self.strict) {
       // Add global Ramda fns
      let header = 'var R = require("ramda")\n'
      header += R.join('\n', R.map(x => `var ${x} = R.${x}`, self.ramdaImportFns))
      source = header + '\n\n' + source
    }

    // Add ramdaDebugWrapper
    if (self.debug === true) {
      source = `var ${wrapperId} = require('${__dirname}/../dist/wrapper.js').fn \n ${source}`
    }

  }

  self.callback(null, source, map)
}
