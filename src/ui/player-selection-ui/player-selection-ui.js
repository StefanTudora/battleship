// Make sure to import the player UI card here
import PlayerCard from '../player-card-ui/player-card-ui.js'

const PlayerSelectionScreen = () => {

    let rootPane     = undefined;
    let firstPlayer  = undefined;
    let secondPlayer = undefined

    const getSelectionScrene = () => {

        const selectionScrene = document.createElement('div');
        selectionScrene.setAttribute('id', 'player-sel');

        firstPlayer  = PlayerCard().getFullDisplayCard("LEFT");
        secondPlayer = PlayerCard().getFullDisplayCard("RIGHT");

        selectionScrene.appendChild(firstPlayer);
        selectionScrene.appendChild(secondPlayer);

        rootPane = selectionScrene;
        return selectionScrene;
    }

    /*
     * Retrieve information about both players
     */ 
    const getPlayersInfo = () => {
        let info = [];
        [firstPlayer, secondPlayer].forEach(child => {
            const entry      = {};
            const selPlayer  = child.querySelector('.player-type-sel .retention').textContent;
            entry['player-type'] = selPlayer;
            if (selPlayer === 'CPU') {
                const selDifficulty = child.querySelector('.diff-sel .retention').textContent;
                entry['difficulty']  = selDifficulty;
            }
            info.push(entry);
        });
        return JSON.stringify(info);
    }

    return { getSelectionScrene, getPlayersInfo };
}

export default PlayerSelectionScreen;