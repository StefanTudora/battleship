import './game-ui-manager.css'
import GameManager from '../../model/game-state/game-manager.js';
import PlayerState from '../../model/game-state/player-state.js';
import { CheckState } from '../../model/game-state/check-state.js';

/*
 * Game session UI
 */
const GameManagerView = (gameConfigs, advCallback) => {

    let rootView    = undefined;
    let gameManager = undefined;

    const getGameView = () => {

        const mainView = document.createElement('div');
        mainView.classList.add('root-view');

        const gameView = document.createElement('div');
        gameView.classList.add('game-view');

        const context = getContext([gameConfigs[0].player, gameConfigs[1].player]);
        gameManager   = new GameManager(new PlayerState(context), context);

        gameView.append(gameConfigs[0].board.getTileBoard());
        const presenterDisplay = getPlayerControlDisplay();
        gameView.append(presenterDisplay);
        gameView.append(gameConfigs[1].board.getTileBoard());
        updateBoardUI(presenterDisplay, false);

        mainView.appendChild(gameView);

        rootView = mainView;

        gameView.querySelector('.game-view > div:last-of-type').classList.add('zoom', 'attackable');

        return mainView;
    }

    const getPlayerControlDisplay = () => {

        const buttonContainer = document.createElement("div");
        buttonContainer.innerHTML = `
            <input type="checkbox" id="playerPresControl" class="playerPresControl">
            <label for="playerPresControl" class="playerToggle">
                <div>First Player Turn</div>
                <div>Second Player Waits</div>
            </label>
        `;

        const labelDiv = buttonContainer.querySelector('#playerPresControl');
        labelDiv.addEventListener('click', (event) => {
            updateBoardUI(buttonContainer, event.currentTarget.checked);
        });
        return buttonContainer;
    }

    const updateBoardUI = (container, bVal) => {
        let pasive = undefined;
        let active = undefined;
        if (!bVal) {
            container.querySelector('div:first-of-type').textContent = 'First Player Turn';
            container.querySelector('div:last-of-type').textContent  = 'Second Player Waits';

            pasive = container.parentElement.querySelector('.game-view > div:first-of-type');
            active = container.parentElement.querySelector('.game-view > div:last-of-type');

        } else {
            container.querySelector('div:first-of-type').textContent = 'First Player Waits';
            container.querySelector('div:last-of-type').textContent  = 'Second Player Turn';

            active = container.parentElement.querySelector('.game-view > div:first-of-type');
            pasive = container.parentElement.querySelector('.game-view > div:last-of-type');
        }
        pasive.classList.remove('zoom', 'attackable');
        pasive.childNodes.forEach(cell => {
            cell.replaceWith(cell.cloneNode(true));
        });

        active.classList.add('zoom', 'attackable');
        active.childNodes.forEach(cell => {
            if (cell.classList.length > 0) {
                /*
                 * Skip cells marked as hit, miss, border.
                 */
                return;
            }
            cell.addEventListener('click', (event) => {
                const target = event.currentTarget;
                const [x, y] = [Number(target.dataset.row), Number(target.dataset.col)];
                gameManager.provideHumanPlayerCoord([x, y]);
            });
        });
    }

    /*
     * Play the game session
     */
    const playGame = async () => {
        while (gameManager.getState() !== undefined) {
            await gameManager.playGame();
        }
    }

    /*
     * Create context used by the game-manager
     */
    const getContext = (players) => {
        return {
            activePlayer:  players[0],
            waitingPlayer: players[1],
            updateBoard: getUpdateCallBack,
            resetCallback: updateEndGame,

            getActivePlayer() {
                return this.activePlayer;
            },

            getWaitingPlayer() {
                return this.waitingPlayer;
            },

            switchControl() {
                [this.activePlayer, this.waitingPlayer] = [this.waitingPlayer, this.activePlayer];
                rootView.querySelector('#playerPresControl').click();
            },
        }
    }

    const getUpdateCallBack = (point, state) => {
        if (point === undefined || state === undefined) {
            return;
        }
        switch(state) {
            case 'Miss':
                updateCellMiss(point);
                break;
            case 'Hit':
                updateCellHit(point);
                break;
            case 'Sunk':
                updateCellHit(point);
                updateMapSunkRegion(point);
                break;
        }
    }

    const updateCellMiss = (point) => {
        const [x, y] = point;
        const cell   = rootView.querySelector(`.attackable > div[data-row='${x}'][data-col='${y}']`);
        cell.classList.add('cell-miss');
    }

    const updateCellHit = (point) => {
        const [x, y] = point;
        const cell   = rootView.querySelector(`.attackable > div[data-row='${x}'][data-col='${y}']`);
        cell.classList.add('cell-hit');
    }

    const updateMapSunkRegion = (point) => {
        const [x, y]        = point;
        const shipHitPoints = markAndGetShipCells(point);
        const disp          = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
        for (const point of shipHitPoints) {
            /*
             * Extra, mark the border
             */
            for (let idx = 0; idx < disp.length; ++idx) {
                const [dx, dy] = [point[0] + disp[idx][0], point[1] + disp[idx][1]];
                if (Math.min(dx, dy) < 0 || Math.max(dx, dy) >= 10) {
                    continue;
                }
                const cell = rootView.querySelector(`.attackable > div[data-row='${dx}'][data-col='${dy}']`);
                cell.classList.add('cell-border');
            }
        }
    }

    const markAndGetShipCells = (point) => {
        /*
         *  Get all coordinates of the ship hull
         *  Also, mark the ship as sunk
         */
        const result = [];
        const queue  = [point];
        const disp   = [-1, 0, 1, 0, -1];
        while (queue.length > 0) {
            const point = queue.shift();
            const cell  = rootView.querySelector(`.attackable > div[data-row='${point[0]}'][data-col='${point[1]}']`);
            if (!cell.classList.contains('cell-hit')) {
                continue;    
            }
            result.push(point);
            cell.classList.remove('cell-hit');
            cell.classList.add('cell-sunk');
            for (let idx = 0; idx < disp.length - 1; ++idx) {
                const [dx, dy] = [point[0] + disp[idx], point[1] + disp[idx + 1]];
                if (Math.min(dx, dy) < 0 || Math.max(dx, dy) >= 10) {
                    continue;
                }
                queue.push([dx, dy]);
            }
        }
        return result;
    }

    const updateEndGame = () => {

        const newGameButton       = document.createElement("button");
        newGameButton.textContent = 'New Game';
        newGameButton.addEventListener('click', (event) => {
            advCallback();
        });

        const currentView   = rootView;
        const currentBounds = currentView.getBoundingClientRect();

        currentView.appendChild(newGameButton);

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

    return {
        getGameView,
        playGame,
    }
}

export default GameManagerView;