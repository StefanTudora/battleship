import TileBoardCreator from '../ship-placement-ui/ship-placement-ui.js';
import './ship-pl-master.css';

let playerNo = 1;

/*
 *  Parent view of the board with controls
 */
const controlBoard = (advCallback) => {

    let shareConfig    = undefined;
    let tileBoardCache = TileBoardCreator();
    let rootView       = undefined

    const createControlBoard = () => {

        const masterCardDiv = document.createElement("div");

        masterCardDiv.classList.add("master-div");

        masterCardDiv.appendChild(getPlayerPresentation());
        masterCardDiv.appendChild(getPlacementDirControl());
        masterCardDiv.appendChild(getShipCount());

        tileBoardCache.createTileBoard();
        masterCardDiv.appendChild(tileBoardCache.getTileBoard());

        shareConfig = {
            direction: 'HORIZONTAL',
            decrementCallback: () => {
                const display = masterCardDiv.querySelector('div:nth-of-type(2) > p:last-of-type');
                const noShips = display.textContent;
                const value   = parseInt(noShips) - 1;
                display.textContent = value.toString();
                if (value === 0) {
                    /*
                     * Execute finished config callback
                     */
                    advCallback();
                }
            }
        }

        tileBoardCache.attachSharedConfig(shareConfig);

        rootView = masterCardDiv;
    };

    const getControlBoard = () => {
        return rootView;
    }

    const getShipCount = () => {
        const div = document.createElement('div');
        const msg = document.createElement("p");
        const cnt = document.createElement("p");

        div.appendChild(msg);
        div.appendChild(cnt);

        msg.textContent = "Renaining Ships :";
        cnt.textContent = "5";

        return div;
    };

    const getPlayerPresentation = () => {
        const msg       = document.createElement('p');
        msg.textContent = `Board configuration for Player ${playerNo ++}`;
        return msg;
    };

    const getPlacementDirControl = () => {
        const buttonContainer = document.createElement("div");
        buttonContainer.innerHTML = `
            <input type="checkbox" id="toggle" class="toggleCheckbox">
            <label for="toggle" class="toggleContainer">
                <div>Horizontal</div>
                <div>Vertical</div>
            </label>
        `;
        buttonContainer.querySelector('#toggle').addEventListener('click', (event) => {
            /*
             *  Shared state object used in the listeners of the board
             */
            shareConfig.direction = event.currentTarget.checked ? 'VERTICAL' : 'HORIZONTAL';
        });
        return buttonContainer;
    }

    const randomizeBoard = () => {
        tileBoardCache.randomize();
    }

    const getBoardView = () => {
        return tileBoardCache;
    }

    const getBoardViewModelProxy = () => {
        return tileBoardCache.getProxyBoard();
    }

    return { 
        createControlBoard,
        getBoardView,
        getBoardViewModelProxy,
        getControlBoard,
        randomizeBoard,
    };
}

export default controlBoard;