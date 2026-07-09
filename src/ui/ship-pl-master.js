import TileBoardCreator from './ship-placement-ui.js';
import './ship-pl-master.css';

// This object should handle the creation of the gameboard and ship placement
// The object must recive the player info
// After bot players finished this portion of the init, they must swap boards
const controlBoard = () => {

    let shareConfig = undefined;

    const createControlBoard = () => {

        const masterCardDiv = document.createElement("div");

        masterCardDiv.classList.add("master-div");

        masterCardDiv.appendChild(getPlayerPresentation());

        masterCardDiv.appendChild(getPlacementDirControl()); 

        masterCardDiv.appendChild(getPlayerPresentation());

        const tileBoard = TileBoardCreator()
        masterCardDiv.appendChild(tileBoard.createTileBoard());

        // Initialize the sharedConfigObj
        shareConfig = {
            direction: 'HORIZONTAL',
            length: 5,
        }

        tileBoard.attachSharedConfig(shareConfig);

        return masterCardDiv;
    }

    // TODO -> write better code
    const getPlayerPresentation = () => {
        const div = document.createElement('div');
        const plP = document.createElement("p");
        const cnt = document.createElement("p");

        div.appendChild(plP);
        div.appendChild(cnt);
        plP.textContent = "Renaining Ships :";

        cnt.textContent = "5";

        return div;
    }

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
            // Use share state obj to manipulate the highlighting direction
            shareConfig.direction = event.currentTarget.checked ? 'VERTICAL' : 'HORIZONTAL';
            console.log(shareConfig.direction);
        });
        return buttonContainer;
    }

    return { createControlBoard };
}

export default controlBoard;