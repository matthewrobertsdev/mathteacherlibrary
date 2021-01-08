import Fraction from '../math/Fraction';
import FractionTeaching from '../mathteachings/FractionTeaching';
import {addAFraction, initAddAFraction, tryToSimplify} from './AddFractiontoFraction'
import {fractionLatex} from './../FractionTeacher'
import PrimeFactorization from '../math/PrimeFactorization'
import ListUtility from '../../utilities/ListUtility'

const teaching=FractionTeaching

test('add a fraction teaching', () => {
  expect(JSON.stringify(addAFraction())).toBe(JSON.stringify([teaching.addAFraction()]))
})

function expectedAddition(firstNumerator, firstDenominator, secondNumerator, secondDenominator, lcd, sum, factor1, factor2, newNumerator1, 
  newNumerator2) {
  const initialization=initAddAFraction(firstNumerator, firstDenominator, secondNumerator, 
    secondDenominator)
    const fraction1 = new Fraction()
  fraction1.createFromNumAndDenom([firstNumerator, firstDenominator])
  fraction1.simplify()
  const fraction2 = new Fraction()
  fraction2.createFromNumAndDenom([secondNumerator, secondDenominator])
  fraction2.simplify()
  const primes1=PrimeFactorization.getPrimeFactorsUnder100_000_000(fraction1.denominator)
    const primes2=PrimeFactorization.getPrimeFactorsUnder100_000_000(fraction2.denominator)
      const primesUnion=ListUtility.elementsNoDuplicatesInCommon(primes1, primes2)
  const simplification1 = tryToSimplify(firstNumerator, firstDenominator, fraction1)
  const simplification2 = tryToSimplify(secondNumerator, secondDenominator, fraction2)
  const initialization2 = initAddAFraction(fraction1.numerator, fraction1.denominator,
    fraction2.numerator, fraction2.denominator)
    const primesUnionList=teaching.tellPrimesUnion(fraction1.denominator, primes1, 
      fraction2.denominator, primes2, primesUnion, lcd)
      const firstMultiplication=teaching.multiplyFractionsByMultiple(fractionLatex(fraction1.numerator, fraction1.denominator),
        `${fractionLatex(`${fraction1.numerator}\\cdot${factor1}`, `${fraction1.denominator}\\cdot${factor1}`)}
        =${fractionLatex(newNumerator1, lcd)}`, fraction1.numerator, fraction1.denominator, factor1, newNumerator1,
        lcd)
        const secondMultiplication=teaching.multiplyFractionsByMultiple(fractionLatex(fraction2.numerator, fraction2.denominator),
        `${fractionLatex(`${fraction2.numerator}\\cdot${factor2}`, `${fraction2.denominator}\\cdot${factor2}`)}
        =${fractionLatex(newNumerator2, lcd)}`, fraction2.numerator, fraction2.denominator, factor2, newNumerator2,
        lcd)
        const addNumerators=teaching.tellAddNumerators(lcd, newNumerator1, newNumerator2,
          fractionLatex(`${newNumerator1}+${newNumerator2}`, lcd),
          fractionLatex(sum, lcd), sum)
          const fractionSolution=new Fraction()
  fractionSolution.createFromNumAndDenom([sum, lcd])
  fractionSolution.simplify()
  const simplification3=tryToSimplify(sum, lcd,
    fractionSolution)
    const solution=[
    teaching.solutionHeading,
    teaching.tellFraction(fractionSolution.numerator, fractionSolution.denominator,
      fractionLatex(fractionSolution.numerator, fractionSolution.denominator))
  ]
  const expectedResult=JSON.stringify([initialization, [teaching.tellNeedToSimplifyFirst,
    teaching.tryToSimplifyHeading], [teaching.forTheFirstFraction],simplification1, 
    [teaching.forTheSecondFraction], simplification2, [teaching.needLCD],initialization2,
    primesUnionList, teaching.tellLCD(lcd),firstMultiplication, secondMultiplication, addNumerators,
    [teaching.tryToSimplifyHeading], simplification3, solution])
  return expectedResult
}

test('1/4+1/3', () => {
  const result=JSON.stringify(addAFraction(['addAFraction', 'f', '1', 'f', '4', 's', '1', 's', '3']))
  const expectedResult=expectedAddition(1,4,1,3,12,7,3,4,3,4)
  expect(result).toBe(expectedResult)
})

test('2/4+1/3', () => {
  const result=JSON.stringify(addAFraction(['addAFraction', 'f', '2', 'f', '4', 's', '1', 's', '3']))
  const expectedResult=expectedAddition(2,4,1,3,6,5,3,2,3,2)
  expect(result).toBe(expectedResult)
})