import './styles.css';
import "@fontsource/orbitron";
import "@fontsource/orbitron/400.css";

import createCard from './ui/player-card-ui.js';
import creatorObj from './ui/ship-placement-ui.js'
import createMDiv from './ui/ship-pl-master.js';

function insertPlayerCard() {
    const { getFullDisplayCard } = createCard();
    const playerCard1 = getFullDisplayCard("LEFT");
    const playerCard2 = getFullDisplayCard("RIGHT");
    const container = document.querySelector("#player-sel");
    if (!container) return;
    container.appendChild(playerCard1);
    container.appendChild(playerCard2);

    document.querySelector("#start-game-button").addEventListener("click", () => {
        // remove the player selection screen and add the shipyard and board tile
        // const { tileBoardCreator } = createTileBoard();
        const parentDiv = document.querySelector("#op-sel");
        const player = document.createElement('p');
        player.textContent = "Configure player Board";
        parentDiv.replaceChildren();
        parentDiv.appendChild(player);
        const tileDiv = creatorObj().createTileBoard();
        const newDiv = createMDiv().getMasterCard();
        parentDiv.appendChild(newDiv);
    }); 

}

insertPlayerCard();