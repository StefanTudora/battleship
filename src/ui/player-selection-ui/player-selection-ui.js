// Make sure to import the player UI card here
import PlayerCard from '../player-card-ui/player-card-ui.js'
import './player-selection-ui.css'

const PlayerSelectionScreen = (advCallback) => {

    let rootPane     = undefined;
    let firstPlayer  = undefined;
    let secondPlayer = undefined;

    const getSelectionView = () => {

        const selectionScrene = document.createElement('div');
        const playerSelMsg    = document.createElement('p');
        playerSelMsg.textContent = 'Player Select';
        selectionScrene.classList.add('player-sel');

        firstPlayer  = PlayerCard().getFullDisplayCard("LEFT");
        secondPlayer = PlayerCard().getFullDisplayCard("RIGHT");
        
        selectionScrene.append(playerSelMsg);
        selectionScrene.appendChild(firstPlayer);
        selectionScrene.appendChild(secondPlayer);

        const button = document.createElement('button');
        button.textContent = 'Start Game';
        button.addEventListener('click', () => {
            advCallback(getPlayersInfo())
        });

        selectionScrene.appendChild(button);

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

    return { 
        getSelectionView, 
        getPlayersInfo, 
    };
}

export default PlayerSelectionScreen;