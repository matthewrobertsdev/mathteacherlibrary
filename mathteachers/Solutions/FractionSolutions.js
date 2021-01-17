import {fractionLatex} from './../FractionTeacher'

const addAFractionSolution=function(args) {
  return fractionLatex(args[0],args[1])
}

const indeterminateLatex=function() {
  return 'indeterminate'
}

const undefinedLatex=function() {
  return 'undefined'
}

export const fractionSolution=[{function: addAFractionSolution, inputs: ['a', 'b']}, {function: undefinedLatex, inputs: []}]