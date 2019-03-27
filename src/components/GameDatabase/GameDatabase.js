import IGDB from './IGDB/IGDB';

class GameDatabase {
  
  database;

  constructor() {
    this.database = new IGDB();
  }
  
  getRandom (minYear, maxYear) {
    const game = this.database.getRandom(minYear, maxYear);
    game.cleanStoryline = this.database.cleanStoryline(game);
    return game;
  }

}

export default GameDatabase;