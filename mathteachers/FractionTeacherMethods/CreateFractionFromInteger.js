import FractionTeaching from '../mathteachings/FractionTeaching';
import {fractionLatex} from './../FractionTeacher'
import {fractionSolution} from './../Solutions/FractionSolutions'

const teaching = FractionTeaching;

//tells lesson or creates a fraction from an integer
export const fromInteger=(args)=> {
  if (args === undefined) {
    let initialization = teaching.fromInteger()
    let lesson = [
      initialization
    ]
    return lesson
  }
  validateParams(args)
    let initialization = teaching.fromInteger(parseInt(args[2]), fractionLatex(parseInt(args[2]), 1))
    let lesson = [
      initialization
    ]
    return lesson
}

function validateParams(args){
  if (args===undefined || isNaN(parseInt(args[2]))) {
    throw Error("Bad Input")
  }
}

export const fromIntegerProblem=function fromIntegerProblem(args) {
  validateParams(args)
  return {problem: [[`{str-c}integer: ${args[2]}`]],
  solutions: fractionSolution}
}