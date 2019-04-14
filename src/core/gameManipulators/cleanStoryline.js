import { escapeRegExp } from '../../helpers';

/**
 * Removes mention of any of the game's aliases from the storyline
 *
 * @param {string} storyline
 * @param {Array} aliases
 */
export const cleanStoryline = (storyline, aliases) => {
  let story = storyline;

  aliases.forEach((name) => {
    const regex = new RegExp(escapeRegExp(name), 'gmi');
    story = story.replace(regex, '[ ... ]');
  });

  return story;
};

export default cleanStoryline;
