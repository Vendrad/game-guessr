import * as Helpers from '.';

describe('Helpers : randBetweenInclusive()', () => {

  const mockMath = Object.create(global.Math);
  mockMath.random = () => 0.5;
  global.Math = mockMath;
  
  it('should provide a number in the middle of min and max', () => {
    expect(Helpers.randBetweenInclusive(1, 7)).toEqual(4);
  });

  it('should provide a number in the middle of min and max rounded up', () => {
    expect(Helpers.randBetweenInclusive(1, 8)).toEqual(5);
  });
  
});