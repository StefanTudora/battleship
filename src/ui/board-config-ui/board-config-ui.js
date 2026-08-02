import BoardView from '../ship-pl-master/ship-pl-master.js';
import './board-config-ui.css'

/*
 * Main View where the player boards are being configured
 */ 
const boardConfig = (players, advCallback) => {

    const viewList    = [];
    let currentIdx    = -1;
    let playerList    = [];
    let rootView      = undefined;
    const configs     = [];

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

        currBoard.createControlBoard();

        if (currPlayer['player-type'] == 'CPU') {
            /*
             *  Randomize the board and increment automatically
             */
            currBoard.randomizeBoard();
            increment();
        } else {
            rootView.appendChild(currBoard.getControlBoard());
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
            executeCallbackAsync();
        }
    }

    const executeCallbackAsync = async () => {
        advCallback(await getConfiguration());
    }

    const attachContinueButton = () => {
        const button = document.createElement('button');
        button.textContent = 'Continue';
        button.addEventListener('click', () => {
            increment();
        });

        const currentView   = rootView.querySelector('div:first-of-type');
        const currentBounds = currentView.getBoundingClientRect();

        rootView.appendChild(button);

        const newBounds = currentView.getBoundingClientRect();
        
        const dx = currentBounds.left - newBounds.left;
        const dy = currentBounds.top  - newBounds.top;

        currentView.animate([
            {
                transform: `translate(${dx}px, ${dy}px)`
            },
            {
                transform: 'translate(0, 0)'
            }
        ], {
            duration: 400,
            easing: 'ease-in-out',
            fill: 'both'
        });
    }

    /*
     * Get the proxy board of the opposing player;
     * Applicable only for the CPU type players;
     */
    const getProxyForCurrentPlayer = (currentIdx) => {
        const opposingPlayerIdx = (currentIdx + 1) & 0b1;
        return viewList[opposingPlayerIdx].getBoardViewModelProxy();
    }

    const saveConfiguration = () => {
        if (currentIdx < 0) {
            return;
        }
        configs.push(createConfiguration(currentIdx));
    }

    /*
     * Create the player config;
     */
    const createConfiguration = async (idx) => {
        const currentPlayer = playerList.at(idx);
        const currentBoard  = viewList.at(idx);
        let playerModel     = undefined;
        const playerImport  = await import(`../../model/game-entities/${currentPlayer['player-type'].toLowerCase()}-player.js`);
        const PlayerClass   = playerImport.default;
        const proxyBoard    = getProxyForCurrentPlayer(idx);
        if (currentPlayer['player-type'] == 'CPU') {
            /*
             * Must also create the strategy for the CPU;
             */
            const strategy      = await import(`../../model/cpu-strategy/${currentPlayer['difficulty'].toLowerCase()}-strategy.js`);
            const StrategyClass = strategy.default;

            /*
             *  Pass strategy to the CPU player type containing proxyBoard;
             */
            playerModel = new PlayerClass(proxyBoard, new StrategyClass(proxyBoard));
        } else {
            /*
             *  Human player do not require proxy/strategy, they interact directly with the board;
             */
            playerModel = new PlayerClass(proxyBoard);
        }
        return {
            player: playerModel,
            board: currentBoard.getBoardView(),
        }
    }

    /*
     * Get the configured game session
     */
    const getConfiguration = async () => {
        const resolvedConfigs = await Promise.all(configs);
        for (const config of resolvedConfigs) {
            /*
             * Clear all links to the control board
             * Clean the applied style classes
             */
            config.board.clearAllCellsOfStyle();
        }
        return resolvedConfigs;
    }

    return { 
        getDisplay,
        getConfiguration,
    };
}

export default boardConfig;