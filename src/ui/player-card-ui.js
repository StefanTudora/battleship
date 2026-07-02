import humanImage from '../assets/human.jpg';
import './player-card-style.css';

const createPlayerCardUI = () => {

    const portraitMap = new Map();

    const getFullDisplayCard = (placement) => {
        const displayCard = document.createElement('div');
        displayCard.classList.add("player-pres");
        switch (placement) {
            case "LEFT":
                displayCard.classList.add("left-extend");
                break;
            case "RIGHT":
                displayCard.classList.add("right-extend");
                break;
        }
        displayCard.appendChild(getPlayerTypeSelection(displayCard));
        displayCard.appendChild(getCharDisplay());
        displayCard.appendChild(getDifficultySelectionDiv(displayCard));
        return displayCard;
    };

    const getPlayerTypeSelection = (parentDiv) => {
        const playerSelectionDiv = document.createElement("div");
        playerSelectionDiv.classList.add("player-type-sel");
        playerSelectionDiv.innerHTML = `
                <p>Choose Player<p>
                <button>Human</button>
                <button>CPU</button>
            `;
        const buttonList = playerSelectionDiv.querySelectorAll("button");
        buttonList.forEach(button => {
            button.addEventListener('click', () => {
                for (const btn of buttonList) {
                    btn.classList.remove('retention');
                }
                button.classList.toggle('retention');
                const diffDiv = parentDiv.querySelector(".diff-sel");
                if (diffDiv === undefined) {
                    return;
                }
                if (button.textContent === 'CPU') {
                    diffDiv.style.display = 'flex';
                    console.log("Show");
                } else {
                    diffDiv.style.display = 'none';
                    console.log("Hide");
                }
            });
        });
        return playerSelectionDiv;
    };

    const getCharDisplay = () => {
        const displayImg = document.createElement("img");
        displayImg.setAttribute('src', humanImage);
        return displayImg;
    };

    const getDifficultySelectionDiv = (displayCard) => {
        const diffSelectDiv = document.createElement("div");
        diffSelectDiv.classList.add("diff-sel");
        diffSelectDiv.innerHTML = `
                <p>Difficulty</p>
                <button>Easy</button>
                <button>Medium</button>
                <button>Hard</button>
            `;
        const buttonList = diffSelectDiv.querySelectorAll("button");
        buttonList.forEach(button => {
            button.addEventListener('click', (event) => {
                const controlElem = event.currentTarget;
                for (const btn of buttonList) {
                    btn.classList.remove('retention');
                }
                controlElem.classList.toggle('retention');
                const assetLabel = controlElem.textContent.toLowerCase();
                setPlayerPortrait(controlElem.textContent.toLowerCase(), displayCard.querySelector('img'));
            });
        });
        return diffSelectDiv;
    };

    const setPlayerPortrait = (portraitAsset, imgElement) => {
        if (!portraitMap.has(portraitAsset)) {
            console.log("Importing the image");
            new Promise((resolve, reject) => {
                const charPortait = import(`../assets/${portraitAsset}.png`);
                if (charPortait !== undefined) {
                    resolve(charPortait);
                } else {
                    reject(`Couldn' find the asset labeled ${assetName}`);
                }
            }).then((portrait) => {
                imgElement.setAttribute('src', portrait.default);
                portraitMap.set(portraitAsset, portrait.default);
            }).catch((errorMsg) => {
                console.log(errorMsg);
            });
        } else {
            imgElement.setAttribute('src', portraitMap.get(portraitAsset));
        }
    }

    return { getFullDisplayCard };
};

export default createPlayerCardUI;


