import './styles.css';
import "@fontsource/orbitron";
import "@fontsource/orbitron/400.css";

import createCard from './ui/player-card-ui.js';

function insertPlayerCard() {
    const { getFullDisplayCard } = createCard();
    const playerCard1 = getFullDisplayCard("LEFT");
    const playerCard2 = getFullDisplayCard("RIGHT");
    const container = document.querySelector("#player-sel");
    if (!container) return;
    container.appendChild(playerCard1);
    container.appendChild(playerCard2);
}

insertPlayerCard();