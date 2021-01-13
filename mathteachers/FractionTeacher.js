import FractionTeaching from './mathteachings/FractionTeaching';
import {addAFraction, addAFractionProblem} from './FractionTeacherMethods/AddFractiontoFraction'
import {fromNumeratorAndDenominator} from './FractionTeacherMethods/CreatFromNumeratorAndDenominator'
import {fromInteger, fromIntegerProblem} from './FractionTeacherMethods/CreateFractionFromInteger'
import {getRandomIntArray} from '../utilities/GetRandomInt'


//latex for a fraction
export const fractionLatex=(numerator, denominator) => {
  return `\\frac{${numerator}}{${denominator}}`
}

class FractionTeacher {

  goodInput=false
  goodProblemInput=false
  goodAnswerInput=false

  //the teaching with the String functions
  teaching = FractionTeaching;

  /*
  fromNumeratorAndDenominatorProblem(args){
    const splitArgs=args.split('@')
    const num1=parseInt(splitArgs[2])
    const denom1=parseInt(splitArgs[4])
    return (
      this.teaching.fromNumeratorAndDenominatorProblem(num1, denom1,
        `${fractionLatex(num1, denom1)}`)
    )
  }

  fromIntegerProblem(args){
    const splitArgs=args.split('@')
    const integer=parseInt(splitArgs[2])
    return this.teaching.fromIntegerProblem(integer)
  }

  addAFractionProblem(args){
    const splitArgs=args.split('@')
    const num1=parseInt(splitArgs[2])
    const denom1=parseInt(splitArgs[4])
    const num2=parseInt(splitArgs[6])
    const denom2=parseInt(splitArgs[8])
    return (
      this.teaching.addAFractionProblem(num1, denom1, num2, denom2,
        `${fractionLatex(num1, denom1)}+${fractionLatex(num2, denom2)}`)
    )
  }
  */

  fromNumeratorAndDenominator(args){
    return this.teach(fromNumeratorAndDenominator, args)
  }

  fromNumeratorAndDenominatorArgs() {
    return getRandomIntArray(4, 0, 24)
  }

  fromNumeratorAndDenominatorProblem(args) {

  }

  fromInteger(args){
    return this.teach(fromInteger, args)
  }

  fromIntegerArgs() {
    return getRandomIntArray(2, 0, 100)
  }

  fromIntegerProblem(args) {
    return fromIntegerProblem(args)
  }

  addAFraction(args){
    return this.teach(addAFraction, args)
  }

  addAFractionArgs() {
    return getRandomIntArray(8, 0, 16)
  }

  addAFractionProblem(args) {
    return addAFractionProblem(args)
  }

  giveProblem(method, args) {
    try{
      const problem=method(args)
      //validate arguments
      //problem summmary
      //coded problem function
      //coded latex function
      //coded answer values in a sequence
      //latex expects problems in an order
      console.log(problem)
      this.goodProblemInput=true
      return problem
    } catch(error) {
      console.log(error)
      return [this.teaching.tellBadInput()]
    }
  }

  giveAnswer(method, args) {
    try{
      this.goodAnswerInput=false
      const answer=method(args)
      this.goodAnswerInput=true
      return answer
    } catch(error) {
      console.log(error)
      return [this.teaching.tellBadInput()]
    }
  }

  teach(method, args){
    try{
      const teaching=method(args)
      console.log(teaching)
      this.goodInput=true
      return teaching
    } catch(error) {
      console.log(error)
      return [this.teaching.tellBadInput()]
    }
  }

}

export default new FractionTeacher();
