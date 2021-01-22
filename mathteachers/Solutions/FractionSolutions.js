import {fractionLatex} from './../FractionTeacher'

const addAFractionSolution=(args)=> {
  let numerator='a'
  let denominator='b'
  if (args!==undefined) {
    for (let i=0; i<args.length; i++) {
      if (args[i]===undefined) {
        args[i]=""
      }
    }
    numerator=args[0]
    denominator=args[1]
  }
  return fractionLatex(numerator,denominator)
}

const indeterminateLatex=function() {
  return 'indeterminate'
}

const undefinedLatex=function() {
  return 'undefined'
}

export const fractionSolution={type: 'int', solutions: [{function: addAFractionSolution, 
  inputs: ['a', 'b'], type: 'frac-pairs'}, {function: indeterminateLatex, inputs: [], 
    type: 'str'},{function: undefinedLatex, inputs: [], type: 'str'}]}