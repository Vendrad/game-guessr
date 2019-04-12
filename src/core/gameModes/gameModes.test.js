import { slugToApiSlug } from './gameModes';

describe('gameModes : slugToApiSlug()', () => {
  it('should return the correct api slug for the given frontend game mode slug.', () => {
    expect(slugToApiSlug('80')).toEqual('0');
  });

  it('should return false if no match is found.', () => {
    expect(slugToApiSlug('not_going_to_match')).toEqual(false);
  });

  it('should still return the correct value if an integer is given instead of the string.', () => {
    expect(slugToApiSlug(80)).toEqual('0');
  });
});
