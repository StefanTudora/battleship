import './game-ui-manager.css'
// import GameManager from '../../model/game-state/game-manager';

/*
 * Game session UI
 */
const GameManagerView = (gameConfigs, advCallback) => {

    let rootView = undefined;

    const getGameView = () => {

        const gameView = document.createElement('div');
        gameView.classList.add('game-view');

        gameView.append(gameConfigs[0].board.getTileBoard());
        gameView.append(getPlayerControlDisplay());
        gameView.append(gameConfigs[1].board.getTileBoard());

        rootView = gameView;

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
                cell.addEventListener('click', () => {
                    console.log(`(${cell.dataset.row}, ${cell.dataset.col})`);
                });
            });
        });
        return buttonContainer;
    }


    // const attachControl

    return {
        getGameView,
    }
}

export default GameManagerView;