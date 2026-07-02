import TileBoardCreator from './ship-placement-ui.js';
import './ship-pl-master.css';

const getMasterPlacement = () => {

    const getMasterCard = () => {

        const masterCardDiv = document.createElement("div");

        masterCardDiv.classList.add("master-div");

        masterCardDiv.appendChild(getPlayerPresentation());

        masterCardDiv.appendChild(getPlacementDirControl());

        masterCardDiv.appendChild(getPlayerPresentation());

        masterCardDiv.appendChild(TileBoardCreator().createTileBoard());

        return masterCardDiv;
    }

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
        const btn = document.createElement("button");
        btn.textContent = "Big Button";
        return btn;
    }


    return { getMasterCard };

}

export default getMasterPlacement;