import {addAFraction} from './AddFractiontoFraction'

/*
test('2+2=4', () => {
  expect(2+2).toBe(4)
});
*/

test('1/4+1/3', () => {
  expect(addAFraction(['addAFraction', 'f', '1', 'f', '4', 's', '1', 's', '3'])).toBe([])
});