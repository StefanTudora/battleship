// Make sure to import the player UI card here
import PlayerCard from '../player-card-ui/player-card-ui.js'

const PlayerSelectionScreen = () => {

    let rootPane = undefined;

    const getSelectionScrene = () => {

        const selectionScrene = document.createElement('div');
        selectionScrene.setAttribute('id', 'player-sel');

        const firstPlayer  = PlayerCard().getFullDisplayCard("LEFT");
        const secondPlayer = PlayerCard().getFullDisplayCard("RIGHT");

        selectionScrene.appendChild(firstPlayer);
        selectionScrene.appendChild(secondPlayer);

        rootPane = selectionScrene;
        return selectionScrene;
    }

    const getPlayersInfo = () => {
        let info = {};
        // This should pass the info of the players
        rootPane.childNodes.forEach(child => {
            // Get selected player
            const selPlayer = document.querySelector('.player-sel > .retention').textContent;
            // Get the difficulty selection info
            if (selPlayer === 'CPU') {
                const selDifficulty = document.querySelector('.diff-sel > .retention').textContent;
            }
        });
        return JSON.stringify(info);
    }

    return { getSelectionScrene };
}

export default PlayerSelectionScreen;