export const getAliases = (game) => {
  const names = [game.name];

  if (game.alternative_names !== undefined) {
    game.alternative_names.forEach((alternativeName) => {
      names.push(alternativeName.name);
    });
  }

  const firstWord = game.name.substr(0, game.name.indexOf(' '));
  if (firstWord !== '' && firstWord.length > 3) names.push(firstWord);

  return names;
};

export default getAliases;
