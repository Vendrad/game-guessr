import * as Helpers from '.';

describe('Helpers : escapeRegExp()', () => {
  it('should ready a string for injection into a regexMatch 1.', () => {
    expect(Helpers.escapeRegExp('test string')).toEqual('test string');
  });

  it('should ready a string for injection into a regexMatch 2.', () => {
    expect(Helpers.escapeRegExp('\\\\\\\\//////')).toEqual(
      '\\\\\\\\\\\\\\\\//////'
    );
  });

  it('should ready a string for injection into a regexMatch 3.', () => {
    expect(Helpers.escapeRegExp('[]')).toEqual('\\[\\]');
  });

  it('should ready a string for injection into a regexMatch 4.', () => {
    expect(Helpers.escapeRegExp('.*+?^${}()|')).toEqual(
      '\\.\\*\\+\\?\\^\\$\\{\\}\\(\\)\\|'
    );
  });

  it('should ready a string for injection into a regexMatch 5.', () => {
    expect(Helpers.escapeRegExp('\\')).toEqual('\\\\');
  });
});

describe('Helpers : truncateString()', () => {
  it('should return the given string if the truncation length is long enough.', () => {
    expect(Helpers.truncateString('test string', 500)).toEqual('test string');
  });

  it('should return a truncated version with ellipses if truncation length is lower than the string.', () => {
    expect(Helpers.truncateString('test string', 1)).toEqual('t...');
  });

  it('should still work with a 0 length string.', () => {
    expect(Helpers.truncateString('', 1)).toEqual('');
  });

  it('if the length is below 0 it should return an empty string.', () => {
    expect(Helpers.truncateString('test string', -10)).toEqual('');
  });
});

describe('Helpers : encodeUrlString()', () => {
  it('should ready a string for use in a url.', () => {
    expect(Helpers.encodeUrlString('!"£$%^&*()_+/./\\zx,mFG}{~@:})')).toEqual(
      '!%22%C2%A3$%25%5E&*()_+%20.%20%5Czx,mFG%7D%7B~@:%7D)'
    );
  });
});
