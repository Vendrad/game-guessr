import { escapeRegExp } from '../../helpers';

export const cleanStoryline = (storyline, aliases) => {
  let story = storyline;

  aliases.forEach((name) => {
    const regex = new RegExp(escapeRegExp(name), 'gmi');
    story = story.replace(regex, '[ ... ]');
  });

  return story;
};

export default cleanStoryline;
