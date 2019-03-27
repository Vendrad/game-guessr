class IGDB {
  games = [
    {id: 1, year: 1985, name: 'asdf', storyline: 'asdf-mmm'},
    {id: 2, year: 1985, name: 'shdg', storyline: 'shdg-mmm'},
    {id: 3, year: 1985, name: 'hwet', storyline: 'hwet-mmm'},
    {id: 4, year: 1985, name: 'sejt', storyline: 'sejt-mmm'},
    {id: 5, year: 1985, name: 'setj', storyline: 'setj-mmm'},
    {id: 6, year: 1995, name: 'qaet', storyline: 'qaet-mmm'},
    {id: 7, year: 1995, name: 'akyr', storyline: 'akyr-mmm'},
    {id: 8, year: 1995, name: 'hdfg', storyline: 'hdfg-mmm'},
    {id: 9, year: 1995, name: 'teaj', storyline: 'teaj-mmm'},
    {id: 10, year: 1995, name: 'atej', alternative_names: [{name: 'atej-mmn'}], storyline: 'atej-mmm atej-mmm atej-mmn ate1j-mmm'},
    {id: 11, year: 2005, name: 'eabg', alternative_names: [{name: 'eabg-mmn'}], storyline: 'eabg-mmm eabg-mmm eabg-mmn eab1g-mmm'},
    {id: 12, year: 2005, name: 'aent', alternative_names: [{name: 'aent-mmn'}], storyline: 'aent-mmm aent-mmm aent-mmn aen1t-mmm'},
    {id: 13, year: 2005, name: 'aeij', alternative_names: [{name: 'aeij-mmn'}], storyline: 'aeij-mmm aeij-mmm aeij-mmn aei1j-mmm'},
    {id: 14, year: 2005, name: 'rsoy', alternative_names: [{name: 'rsoy-mmn'}], storyline: 'rsoy-mmm rsoy-mmm rsoy-mmn rso1y-mmm'},
    {id: 15, year: 2005, name: 'rxyk', alternative_names: [{name: 'rxyk-mmn'}], storyline: 'rxyk-mmm rxyk-mmm rxyk-mmn rxy1k-mmm'},
    {id: 16, year: 2015, name: 'kysr', alternative_names: [{name: 'kysr-mmn'}], storyline: 'kysr-mmm kysr-mmm kysr-mmn kys1r-mmm'},
    {id: 17, year: 2015, name: 'sjte', alternative_names: [{name: 'sjte-mmn'}], storyline: 'sjte-mmm sjte-mmm sjte-mmn sjt1e-mmm'},
    {id: 18, year: 2015, name: 'btes', alternative_names: [{name: 'btes-mmn'}], storyline: 'btes-mmm btes-mmm btes-mmn bte1s-mmm'},
    {id: 19, year: 2015, name: 'vare', alternative_names: [{name: 'vare-mmn'}], storyline: 'vare-mmm vare-mmm vare-mmn var1e-mmm'},
    {id: 20, year: 2015, name: 'vwar', alternative_names: [{name: 'vwar-mmn'}], storyline: 'vwar-mmm vwar-mmm vwar-mmn vwa1r-mmm'}
  ]

  getRandom(minYear, maxYear) {
    const subset = this.games.filter((game) => {
      return game.year >= minYear && game.year <= maxYear;
    });

    return subset[Math.floor(Math.random() * subset.length)];
  }
  
  cleanStoryline(game) {
    console.log(game);
    let story = game.storyline;
    const names = this.knownAs(game);

    names.forEach((name) => {
      const regex = new RegExp(this.escapeRegExp(name), 'gmi');
      story = story.replace(regex, '[ ... ]');
    })
    
    return story;
  }

  knownAs(game) {
    let names = [game.name];

    if (typeof game.alternative_names !== 'undefined') {
      game.alternative_names.forEach((alternative_name) => {
        names.push(alternative_name.name);
      })
    }

    return names;
  }

  escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  }
}

export default IGDB;
/*
1980 - 1984 - 135
1985 - 1989 - 549
1990 - 1994 - 839
1995 - 1999 - 791
2000 - 2004 - 816
2005 - 2009 - 1477
2010 - 2014 - 3132
2015 - 2019 - 5209

https://api-v3.igdb.com/release_dates

fields id,game.name,game.alternative_names.name,game.storyline,y;
where y >= 2015 & y < 2020 & game.storyline != null & game.category = 0;
limit 50;
offset 0;

*/