import FractionTeaching from '../mathteachings/FractionTeaching';
import Fraction from '../math/Fraction'
import PrimeFactorization from '../math/PrimeFactorization';
import Product from '../math/Product';
import ListUtility from '../../utilities/ListUtility';
import {fractionLatex} from './../FractionTeacher'
import {fractionSolution} from './../Solutions/FractionSolutions'


const teaching = FractionTeaching;

//tells lesson or creates a fraction and simplifies it
export const fromNumeratorAndDenominator=(args)=> {
  let mathObject = new Fraction()
  if (args === undefined) {
    mathObject = undefined
    let initialization = teaching.fromNumeratorAndDenominator()
    let lesson = [
      initialization,
    ]
    return lesson
  }
  validateParams(args)
  mathObject.createFromNumAndDenom([args[2], args[4]])
  let initialization = teaching.fromNumeratorAndDenominator(
    parseInt(args[2]), parseInt(args[4]), fractionLatex(parseInt(args[2]), parseInt(args[4]))
  )
  let simplification = simplify([args[2], args[4]])
  let lesson = [
    initialization,
    simplification
  ]
  return lesson
}

function simplify(args) {
  let primeFactorsTeaching=[]
  let mathObject = new Fraction()
  mathObject.createFromNumAndDenom([args[0], args[1]])
  let numerator = parseInt(args[0])
  let denominator = parseInt(args[1])
  if (isNaN(numerator) || isNaN(denominator)) {
    mathObject = null
    return []
  }
  else if (numerator === 0 && denominator === 0) {
    primeFactorsTeaching.push(teaching.indeterminate(
      fractionLatex(numerator, denominator))
    )
    primeFactorsTeaching.push('indeterminate')
    return primeFactorsTeaching
  } else if (denominator === 0) {
    primeFactorsTeaching.push(teaching.undefined(
      parseInt(args[0]), fractionLatex(numerator, denominator)
    ))
    primeFactorsTeaching.push('undefined')
    return primeFactorsTeaching
  } else if (denominator === 1) {
    primeFactorsTeaching.push(teaching.denominatorIs1(
      numerator, fractionLatex(numerator, denominator)
    ))
    primeFactorsTeaching.push(fractionLatex(numerator, 1))
    return primeFactorsTeaching
  } else if (numerator === 1) {
    primeFactorsTeaching.push(teaching.numeratorIs1(
      denominator, fractionLatex(1, denominator)
    ))
    primeFactorsTeaching.push(fractionLatex(numerator, denominator))
    return primeFactorsTeaching
  } else if (denominator === numerator) {
    mathObject.createFromNumAndDenom([1, 1])
    primeFactorsTeaching.push(teaching.numeratorEqualsDenominator(
      numerator, denominator,
      fractionLatex(1, 1)
    ))
    primeFactorsTeaching.push(fractionLatex(numerator, denominator))
    return primeFactorsTeaching
  } else if (denominator % numerator === 0) {
    mathObject.createFromNumAndDenom([1, denominator / numerator])
    primeFactorsTeaching.push(teaching.denominatorModNumeratorIs0(
      numerator, denominator, fractionLatex(1, denominator / numerator), denominator / numerator
    ))
    primeFactorsTeaching.push(fractionLatex(1, denominator/numerator))
    return primeFactorsTeaching
  } else if (numerator % denominator === 0) {
    mathObject.createFromNumAndDenom([numerator / denominator, 1])
    primeFactorsTeaching.push(teaching.numeratorModDenominatorIs0(
      numerator, denominator, numerator / denominator
    ))
    primeFactorsTeaching.push(fractionLatex(numerator/denominator, 1))
    return primeFactorsTeaching
  } else if (!PrimeFactorization.absVal100_000_000OrLess(numerator)
    || !PrimeFactorization.absVal100_000_000OrLess(denominator)) {
    let disclaimer = [teaching.tryToSimplify]
    disclaimer.push(teaching.tooLargeToSimplify)
    return disclaimer
  } else {
    const nArray = PrimeFactorization.getPrimeFactorsUnder100_000_000(numerator);
    const dArray = PrimeFactorization.getPrimeFactorsUnder100_000_000(denominator);
    let primes = null;
    primes = ListUtility.elementsInCommon(nArray, dArray);
    const gcf = Product.getProductOfList(primes);
    mathObject.numerator /= gcf;
    mathObject.denominator /= gcf;
    primeFactorsTeaching = teaching.getPrimeFactors(
      numerator, nArray,
      denominator, dArray)
    primeFactorsTeaching.push('{br}')
    if (primes.length > 0) {
      primeFactorsTeaching.push(teaching.tellPrimesInCommon(primes))
      primeFactorsTeaching.push('{br}')
      primeFactorsTeaching.push(teaching.tellGCF(gcf, primes.length > 1))
      primeFactorsTeaching.push('{br}')
      primeFactorsTeaching.push(teaching.divideByGCF(
        numerator, denominator, gcf,
        mathObject.numerator, mathObject.denominator
      ))
    } else {
      primeFactorsTeaching.push(teaching.tellNoPrimesInCommon(primes))
    }
    primeFactorsTeaching.push(
      teaching.tellSimplestFormHeading
    )
    primeFactorsTeaching.push(
      teaching.tellFraction(
        mathObject.numerator, mathObject.denominator, fractionLatex(mathObject.numerator, mathObject.denominator))
    )
    primeFactorsTeaching.push(fractionLatex(mathObject.numerator, mathObject.denominator))
    return primeFactorsTeaching
  }
}

function validateParams(args){
  if (isNaN(parseInt(args[2]))||isNaN(parseInt(args[4]))){
    throw Error("Bad Input")
  }
}

export const fromNumeratorAndDenominatorProblem=function fromNumeratorAndDenominatorProblem(args) {
  validateParams(args)
  return {problem: [[`{str-c}numerator: ${args[2]}`], [`{str-c}denominator: ${args[4]}`]],
  solutions: fractionSolution}
}