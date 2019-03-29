import { escapeRegExp } from '../helpers';

export function cleanGameResponse(response) {
  const game = {
    id: response.game.id,
    name: response.game.name,
    year: response.y,
    aliases: knownAs(response.game)
  };

  game.storyline = cleanStoryline(response.game.storyline, game.aliases);
  
  return game;
};

const cleanStoryline = (storyline, aliases) => {
  let story = storyline;

  aliases.forEach((name) => {
    const regex = new RegExp(escapeRegExp(name), 'gmi');
    story = story.replace(regex, '[ ... ]');
  })
  
  return story;
};

const knownAs = game => {
  let names = [game.name];

  if (typeof game.alternative_names !== 'undefined') {
    game.alternative_names.forEach((alternative_name) => {
      names.push(alternative_name.name);
    })
  }

  const firstWord = game.name.substr(0, game.name.indexOf(' '));
  if (firstWord !== '' && firstWord.length > 3) names.push(firstWord);

  return names;
};

export function igdbEscapeString(string) {
  return string
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"');
}