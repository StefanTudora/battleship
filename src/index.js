import './styles.css';
import "@fontsource/orbitron";
import "@fontsource/orbitron/400.css";

import createCard from './ui/player-card-ui/player-card-ui.js';
import creatorObj from './ui/ship-placement-ui.js'
import createMDiv from './ui/ship-pl-master.js';
import PlayerSelect from './ui/player-selection-ui/player-selection-ui.js'

function createApp() {

    // Find a suitable way to pass flow control
    const container = document.querySelector("#op-sel");
    container.appendChild(PlayerSelect().getSelectionScrene());

    document.querySelector("#start-game-button").addEventListener("click", (event) => {
        const parentDiv = document.querySelector("#op-sel");
        const player = document.createElement('p');
        parentDiv.replaceChildren();
        parentDiv.appendChild(player);
        const tileDiv = creatorObj().createTileBoard();
        const newDiv = createMDiv().createControlBoard();
        parentDiv.appendChild(newDiv);

        event.currentTarget.remove();
    }); 

}

createApp();