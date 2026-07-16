import './styles.css';
import "@fontsource/orbitron";
import "@fontsource/orbitron/400.css";

import PlayerSelect    from './ui/player-selection-ui/player-selection-ui.js'
import MasterBoard     from './ui/board-config-ui/board-config-ui.js'
import GameManagerView from './ui/game-ui-manager/game-ui-manager.js'

const rootView = document.querySelector("#op-sel");

const createPlayerSelectionView = () => {
    /*
     * Create the player selection UI
     */
    rootView.replaceChildren();
    const playerSelectionView = PlayerSelect(createBoardPlacementView);
    rootView.appendChild(playerSelectionView.getSelectionView());
}

const createBoardPlacementView = (playersInfo) => {
    /*
     * Create the board configuration UI
     */
    rootView.replaceChildren();
    const controlBoardView = MasterBoard(playersInfo, createGameMatchView);
    rootView.appendChild(controlBoardView.getDisplay());
}

const createGameMatchView = (configs) => {
    /*
     * Create the game session UI
     */
    rootView.replaceChildren();
    const gameMatchView = GameManagerView(configs, createPlayerSelectionView);
    rootView.appendChild(gameMatchView.getGameView());
    gameMatchView.playGame();
}

createPlayerSelectionView();