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

        if (currPlayer['player-type'] == 'CPU') {
            /*
             *  Randomize the board and increment automatically
             */
            currBoard.randomizeBoard();
            increment();
        } else {
            const currView = currBoard.createControlBoard();// This is where the boards are being configured
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
        rootView.appendChild(button);
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
        if (currentPlayer['player-type'] == 'CPU') {
            /*
             * Must also create the strategy for the CPU;
             */
            const strategy      = await import(`../../model/cpu-strategy/${currentPlayer['difficulty'].toLowerCase()}-strategy.js`);
            const StrategyClass = strategy.default;

            /*
             *  Pass strategy to the CPU player type containing proxyBoard;
             */
            playerModel = new PlayerClass(new StrategyClass(getProxyForCurrentPlayer(idx)));
        } else {
            /*
             *  Human player do not require proxy, they interact directly with the board;
             */
            playerModel = new PlayerClass();
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
        return resolvedConfigs;
    }

    return { 
        getDisplay,
        getConfiguration,
    };
}

export default boardConfig;