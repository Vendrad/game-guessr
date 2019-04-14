import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';
import { encodeUrlString } from '../../../helpers';

import GameAutoCompleteItem from './GameAutoCompleteItem/GameAutoCompleteItem';

import styles from './GameAutoComplete.module.scss';

/**
 * Component to display the game search autocomplete list
 *
 * Uses Axios to make API calls for games matching the input prop
 *
 * @return {null} if no items are found
 * @return {JSX} if items are found
 */
class GameAutoComplete extends Component {
  state = {
    autoCompleteItems: [],
  };

  /**
   * Immediately search for games given the input prop when this component mounts
   */
  componentDidMount() {
    const { input } = this.props;
    this.searchGames(input);
  }

  /**
   * Search for new games if the component
   * is updated, unless the input has not changed.
   * @param {*} prevProps
   * @param {*} prevState
   */
  componentDidUpdate(prevProps, prevState) {
    const { input } = this.props;
    const { input: prevInput } = prevProps;

    if (input === prevInput) return;

    this.searchGames(input);
  }

  /**
   * Clean up any Axios connections when the component unmounts
   */
  componentWillUnmount() {
    this.axiosSource
      && this.axiosSource.cancel(
        'GameAutoComplete - Cleanup: Request no longer needed.',
      );
  }

  /**
   * Ensure the correct callbacks occur when a
   * specific game has been selected from the list
   */
  autoCompleteItemWasClickedHandler = (game) => {
    this.setState({
      autoCompleteItems: [],
    });

    const { autoCompleteItemWasClicked } = this.props;

    autoCompleteItemWasClicked(game);
  };

  /**
   * Adds the API data response to the list
   * of games appropriate to the search input
   * @param {*} games
   */
  searchGamesResponseHandler(games) {
    let items = [];

    if (games.length !== 0) items = games;

    this.setState({ autoCompleteItems: items });
  }

  /**
   * Search for games given the input string
   *
   * This will immediately cancel any previous searches that might be open
   */
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

  /**
   * Axios source
   *
   * Used for cancelling open connections via CancelToken
   */
  axiosSource;

  render() {
    const { autoCompleteItems } = this.state;
    if (autoCompleteItems.length === 0) return null;

    return (
      <div className={styles.GameAutoComplete}>
        <div className={styles.GameAutoCompleteInner}>
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
