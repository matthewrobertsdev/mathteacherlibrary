import Fraction from '../math/Fraction';
import FractionTeaching from '../mathteachings/FractionTeaching';
import {addAFraction, initAddAFraction, tryToSimplify} from './AddFractiontoFraction'
import {fractionLatex} from './../FractionTeacher'

const teaching=FractionTeaching

test('add a fraction teaching', () => {
  expect(JSON.stringify(addAFraction())).toBe(JSON.stringify([teaching.addAFraction()]))
})

test('1/4+1/3', () => {
  const result=JSON.stringify(addAFraction(['addAFraction', 'f', '1', 'f', '4', 's', '1', 's', '3']))
  let initialization=initAddAFraction(1, 4, 1, 3)
  let fraction1 = new Fraction()
  fraction1.createFromNumAndDenom([1, 4])
  fraction1.simplify()
  let fraction2 = new Fraction()
  fraction2.createFromNumAndDenom([1, 3])
  fraction2.simplify()
  let simplification1 = tryToSimplify(1, 4, fraction1)
  let simplification2 = tryToSimplify(1, 3, fraction2)
  let initialization2 = initAddAFraction(fraction1.numerator, fraction1.denominator,
    fraction2.numerator, fraction2.denominator)
  let primesUnion=teaching.tellPrimesUnion(fraction1.denominator, [2,2], 
      fraction2.denominator, [3], [2,2,3], 12)
  let firstMultiplication=teaching.multiplyFractionsByMultiple(fractionLatex(fraction1.numerator, fraction1.denominator),
        `${fractionLatex(`${fraction1.numerator}\\cdot${3}`, `${fraction1.denominator}\\cdot${3}`)}
        =${fractionLatex(3, 12)}`, 1, fraction1.denominator, 3, 3,
        12)
  let secondMultiplication=teaching.multiplyFractionsByMultiple(fractionLatex(fraction2.numerator, fraction2.denominator),
        `${fractionLatex(`${fraction2.numerator}\\cdot${4}`, `${fraction2.denominator}\\cdot${4}`)}
        =${fractionLatex(4, 12)}`, 1, fraction2.denominator, 4, 4,
        12)
  let expectedResult=JSON.stringify([initialization, [teaching.tellNeedToSimplifyFirst,
    teaching.tryToSimplifyHeading], [teaching.forTheFirstFraction],simplification1, 
    [teaching.forTheSecondFraction], simplification2, [teaching.needLCD],initialization2,
    primesUnion, teaching.tellLCD(12),firstMultiplication, secondMultiplication])
  expect(result).toBe(expectedResult)
})