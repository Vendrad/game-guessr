import { cleanGameResponse } from './cleanGameResponse';
import * as cleanStoryline from './cleanStoryline';
import * as getAliases from './getAliases';
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

describe('gameManipulators : cleanGameResponse()', () => {
  it('should output with object id,name,year,aliases,storyline.', () => {
    const aliasesMock = jest.fn().mockReturnValue(cleaned.aliases);
    getAliases.getAliases = aliasesMock;

    const storylineMock = jest.fn().mockReturnValue(cleaned.storyline);
    cleanStoryline.cleanStoryline = storylineMock;

    expect(cleanGameResponse(response)).toEqual(cleaned);

    mockCR(aliasesMock);
    mockCR(storylineMock);
  });
});
