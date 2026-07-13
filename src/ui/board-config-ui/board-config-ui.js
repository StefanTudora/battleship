import BoardView from '../ship-pl-master.js';
import './board-config-ui.css'

// This is where the boards are being configured
const boardConfig = (players, advanceCallback) => {

    const viewList    = [];
    let currentIdx    = -1;
    let playerList    = [];
    let rootView      = undefined;

    const getDisplay = () => {

        playerList = JSON.parse(players);

        const display = document.createElement('div');
        display.classList.add('ship-config');
        rootView = display;
        /*
         *  Create board for each players
         */
        for (let idx = 0; idx < playerList.length; ++idx) {
            viewList.push(BoardView(attachContinueButton));
        }
        increment();
        return display;
    };

    /*
     * Render view if necessary
     * In case of CPU player, the board is randomize the increment is called again
     */
    const renderView = () => {
        const currPlayer = playerList.at(currentIdx);
        const currBoard  = viewList.at(currentIdx);
        console.log(currPlayer);
        if (currPlayer['player-type'] == 'CPU') {
            /*
             *  Randomize the board and increment automatically
             */
            currBoard.randomizeBoard();
            increment();
        } else {
            const currView = currBoard.createControlBoard();
            rootView.appendChild(currView);
        }
    }

    const increment = () => {
        saveConfiguration();
        ++ currentIdx;
        rootView.replaceChildren();
        if (currentIdx < 2) {
            renderView();
        } else {
            /*
             * Execute parent callback to advance the game
             */
            passProxyBoardsToCPU();
            advanceCallback();
        }
    }

    const attachContinueButton = () => {
        const button = document.createElement('button');
        button.textContent = 'Continue';
        button.addEventListener('click', () => {
            increment();
        });
        rootView.appendChild(button);
    }

    const saveConfiguration = () => {

    }

    return { getDisplay };
}

export default boardConfig;