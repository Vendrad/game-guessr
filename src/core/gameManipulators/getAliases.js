/**
 * Using the API game object, produces a best
 * guess list of possible aliases the game may have.
 *
 * @param {Object} game
 */
export const getAliases = (game) => {
  // First alias is the primary name for the game
  const names = [game.name];

  // If alternative_names is present on the object, add them to the list
  if (game.alternative_names !== undefined) {
    game.alternative_names.forEach((alternativeName) => {
      names.push(alternativeName.name);
    });
  }

  // If the first word is longer than 3 characters, add it to the list
  const firstWord = game.name.substr(0, game.name.indexOf(' '));
  if (firstWord !== '' && firstWord.length > 3) names.push(firstWord);

  return names;
};

export default getAliases;
