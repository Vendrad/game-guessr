import { getAliases } from './getAliases';

describe('gameManipulators : getAliases()', () => {
  let response;
  let cleaned;

  beforeEach(() => {
    response = {
      id: 1,
      game: {
        id: 100,
        name: 'First Test',
        alternative_names: [
          { name: 'Testy' },
          { name: 'Tester' },
          { name: 'Testy The Tester' },
        ],
        storyline: 'Test follows the story of Testy The Tester.',
      },
      y: 2000,
    };

    cleaned = {
      aliases: ['First Test', 'Testy', 'Tester', 'Testy The Tester', 'First'],
      id: 100,
      name: 'Test',
      storyline: '[ ... ] follows the story of [ ... ]y The [ ... ]er.',
      year: 2000,
    };
  });

  it('should gather a list of possible aliases from the known information.', () => {
    expect(getAliases(response.game)).toEqual(cleaned.aliases);
  });

  it('should return a list even if alternative names is not present in the response', () => {
    delete response.game.alternative_names;
    expect(getAliases(response.game)).toEqual(['First Test', 'First']);
  });

  it('should return a list that excludes the first word of the name if it is 3 or less characters.', () => {
    response.game.name = 'One Test';
    delete response.game.alternative_names;
    expect(getAliases(response.game)).toEqual(['One Test']);
  });
});
