import './game-ui-manager.css'
import GameManager from '../../model/game-state/game-manager.js';
import PlayerState from '../../model/game-state/player-state.js';
import { CheckState } from '../../model/game-state/check-state.js';

/*
 * Game session UI
 */
const GameManagerView = (gameConfigs, advCallback) => {

    let rootView    = undefined;
    let gameManager = new GameManager(); 

    const getGameView = () => {

        const gameView = document.createElement('div');
        gameView.classList.add('game-view');

        // Encapsulate the boards in divs with player display messages
        gameView.append(gameConfigs[0].board.getTileBoard());
        gameView.append(getPlayerControlDisplay());
        gameView.append(gameConfigs[1].board.getTileBoard());

        rootView = gameView;

        const context = getContext([gameConfigs[0].player, gameConfigs[1].player]);

        gameManager.setState(new PlayerState(context), context);

        gameView.querySelector('.game-view > div:last-of-type').classList.add('zoom', 'attackable');

        return gameView;
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
        
        buttonContainer.querySelector('#playerPresControl').addEventListener('click', (event) => {
            // Move in its own method
            let pasive = undefined;
            let active = undefined;
            if (!event.currentTarget.checked) {
                buttonContainer.querySelector('div:first-of-type').textContent = 'First Player Turn';
                buttonContainer.querySelector('div:nth-of-type(2)').textContent = 'Second Player Waits';

                pasive = rootView.querySelector('.game-view > div:first-of-type');
                active = rootView.querySelector('.game-view > div:last-of-type');
                
            } else {
                buttonContainer.querySelector('div:first-of-type').textContent = 'First Player Waits';
                buttonContainer.querySelector('div:nth-of-type(2)').textContent = 'Second Player Turn';

                active = rootView.querySelector('.game-view > div:first-of-type');
                pasive = rootView.querySelector('.game-view > div:last-of-type');
            }
            pasive.classList.remove('zoom', 'attackable');
            pasive.childNodes.forEach(cell => {
                cell.replaceWith(cell.cloneNode(true));
            });

            active.classList.add('zoom', 'attackable');
            active.childNodes.forEach(cell => {
                cell.addEventListener('click', (event) => {
                    const target = event.currentTarget;
                    console.log(`Cell at : (${target.dataset.row}, ${target.dataset.col})`);
                    target.classList.add('red-bkg');

                    /*
                     * The current active player is a Human, we need to resume the FSM execution
                     */
                    if (gameManager.getState() === undefined) {
                        gameManager.setState(new CheckState(gameManager.getContext()));
                    }
                });
            });
        });
        return buttonContainer;
    }

    /*
     * Play the session
     * Used to resume in case the game waits for human actions;
     */
    const playGame = async () => {
        while (gameManager.getState() !== undefined) {
            await gameManager.playGameDev();
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

            updateAttackableBoard(x, y) {
                updateBoard(x, y);
            }
            
        }
    }

    const getUpdateCallBack = (x, y) => {
        if (x === undefined || y === undefined) {
            return;
        }
        const cell = rootView.querySelector(`.attackable > div[data-row='${x}'][data-col='${y}']`);
        cell.click();
    }

    return {
        getGameView,
        playGame,
    }
}

export default GameManagerView;