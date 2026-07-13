import './styles.css';
import "@fontsource/orbitron";
import "@fontsource/orbitron/400.css";

import createCard from './ui/player-card-ui/player-card-ui.js';
import createMDiv from './ui/ship-pl-master.js';
import PlayerSelect from './ui/player-selection-ui/player-selection-ui.js'

import masterBoard from './ui/board-config-ui/board-config-ui.js'

function createApp() {

    // Find a suitable way to pass flow control
    const container             = document.querySelector("#op-sel");
    const playerSelectionScreen = PlayerSelect();
    container.appendChild(playerSelectionScreen.getSelectionScrene());

    document.querySelector("#start-game-button").addEventListener("click", (event) => {

        const playersInfo = playerSelectionScreen.getPlayersInfo();

        console.log(playersInfo);

        const parentDiv = document.querySelector("#op-sel");
        parentDiv.replaceChildren();
        const controlBoard = masterBoard(playersInfo, undefined);
        parentDiv.appendChild(controlBoard.getDisplay());

        event.currentTarget.remove();
    }); 

}

createApp();