import * as Helpers from '.';

/**
 * Random tests are split between three separate test
 * suites as mocking the global object interferes otherwise
 */
describe('Helpers : randBetweenInclusive()', () => {
  const mockMathHigh = Object.create(global.Math);
  mockMathHigh.random = () => 0.999999999;
  global.Math = mockMathHigh;

  it('should be able to hit the upper bound.', () => {
    expect(Helpers.randBetweenInclusive(1, 8)).toEqual(8);
  });
});
