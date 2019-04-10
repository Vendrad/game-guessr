import { cleanStoryline } from './cleanStoryline';
import { getAliases } from './getAliases';

export const cleanGameResponse = response => {
  const game = {
    id: response.game.id,
    name: response.game.name,
    year: response.y,
    aliases: getAliases(response.game)
  };

  game.storyline = cleanStoryline(response.game.storyline, game.aliases);
  
  return game;
};

export default cleanGameResponse;