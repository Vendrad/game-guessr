import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';
import { encodeUrlString } from '../../../helpers';

import GameAutoCompleteItem from './GameAutoCompleteItem/GameAutoCompleteItem';

import styles from './GameAutoComplete.module.scss';

class GameAutoComplete extends Component {
  state = {
    autoCompleteItems: [],
  };

  componentDidMount() {
    const { input } = this.props;
    this.searchGames(input);
  }

  componentDidUpdate(prevProps, prevState) {
    const { input } = this.props;

    if (input === prevProps.input) return;

    this.searchGames(input);
  }

  componentWillUnmount() {
    this.axiosSource
      && this.axiosSource.cancel(
        'GameAutoComplete - Cleanup: Request no longer needed.',
      );
  }

  autoCompleteItemWasClickedHandler = (game) => {
    this.setState({
      autoCompleteItems: [],
    });

    const { autoCompleteItemWasClicked } = this.props;

    autoCompleteItemWasClicked(game);
  };

  searchGamesResponseHandler(games) {
    let items = [];

    if (games.length !== 0) items = games;

    this.setState({ autoCompleteItems: items });
  }

  searchGames(input) {
    this.axiosSource
      && this.axiosSource.cancel(
        'GameAutoComplete - New Request Started: Request no longer needed.',
      );
    this.axiosSource = Axios.CancelToken.source();

    Axios.get(`games/search/${encodeUrlString(input)}`, {
      cancelToken: this.axiosSource.token,
    })
      .then((response) => {
        this.searchGamesResponseHandler(response.data);
      })
      .catch((thrown) => {
        // if (Axios.isCancel(thrown)) {
        //   console.log('Request canceled', thrown.message);
        // }
      });
  }

  axiosSource;

  render() {
    const { autoCompleteItems } = this.state;
    if (autoCompleteItems.length === 0) return null;

    return (
      <div className={styles.GameAutoComplete}>
        <div>
          <ul>
            {autoCompleteItems.map((item) => {
              const coverUrl = item.cover && item.cover.url && item.cover.url;

              return (
                <GameAutoCompleteItem
                  key={item.id}
                  gameId={item.id}
                  gameName={item.name}
                  gameCover={coverUrl}
                  gameAutoCompleteItemWasClicked={
                    this.autoCompleteItemWasClickedHandler
                  }
                />
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

GameAutoComplete.propTypes = {
  input: PropTypes.string.isRequired,
  autoCompleteItemWasClicked: PropTypes.func.isRequired,
};

export default GameAutoComplete;
