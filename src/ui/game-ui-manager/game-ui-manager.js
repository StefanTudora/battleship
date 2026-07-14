
/*
 * Game session UI
 */
const GameManagerView = (gameConfigs, advCallback) => {

    let rootView = undefined;

    const getGameView = () => {

        const gameView = document.createElement('div');
        gameView.classList.add('game-view');
        rootView = gameView;

        for (const config of gameConfigs) {
            gameView.append(config.board.getTileBoard());
        }

        return gameView;
    }

    return {
        getGameView,
    }
}

export default GameManagerView;