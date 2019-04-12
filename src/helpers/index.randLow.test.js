import * as Helpers from '.';

describe('Helpers : randBetweenInclusive()', () => {
  const mockMathHigh = Object.create(global.Math);
  mockMathHigh.random = () => 0;
  global.Math = mockMathHigh;

  it('should be able to hit the lower bound.', () => {
    expect(Helpers.randBetweenInclusive(1, 8)).toEqual(1);
  });
});
