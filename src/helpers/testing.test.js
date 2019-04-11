import * as Helpers from '../helpers/testing';

describe('TestingHelpers : mockCR()', () => {
  
  const mock = { mockClear: jest.fn(), mockRestore: jest.fn() };
  
  it('should call mockClear and mockRestore on the given mock.', () => {
    Helpers.mockCR(mock)
    expect(mock.mockClear).toHaveBeenCalledTimes(1);
    expect(mock.mockRestore).toHaveBeenCalledTimes(1);
  });

  it('should return the mock.', () => {
    expect(Helpers.mockCR(mock)).toEqual(mock);
  });

  it('should throw an Error if a mock was not supplied.', () => {
    function catchError() {
      Helpers.mockCR("")
    }
    expect(catchError).toThrow();
  });

});