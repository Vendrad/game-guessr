import { cleanStoryline } from './cleanStoryline';
import * as Helpers from '../../helpers';
import { mockCR } from '../../helpers/testing';

const response = {
  id: 1,
  game: {
    id: 100,
    name: 'Test',
    alternative_names: [
      { name: 'Testy' },
      { name: 'Tester' },
      { name: 'Testy The Tester' },
    ],
    storyline: 'Test follows the story of Testy The Tester.',
  },
  y: 2000,
};

const cleaned = {
  aliases: ['Test', 'Tester', 'Tester', 'Testy The Tester'],
  id: 100,
  name: 'Test',
  storyline: '[ ... ] follows the story of [ ... ]y The [ ... ]er.',
  year: 2000,
};

describe('gameManipulators : cleanStoryline()', () => {
  it('should remove Aliases from the storyline.', () => {
    const mock = jest.fn(name => name);
    Helpers.escapeRegExp = mock;

    expect(cleanStoryline(response.game.storyline, cleaned.aliases)).toEqual(
      cleaned.storyline
    );

    mockCR(mock);
  });
});
