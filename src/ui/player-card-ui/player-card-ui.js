import './player-card-style.css';

const createPlayerCardUI = () => {

    const portraitMap = new Map();
    const displayCard = document.createElement('div');

    const getFullDisplayCard = (placement) => {
        displayCard.classList.add("player-pres");
        switch (placement) {
            case "LEFT":
                displayCard.classList.add("left-extend");
                break;
            case "RIGHT":
                displayCard.classList.add("right-extend");
                break;
        }
        displayCard.appendChild(getCharDisplay());
        displayCard.appendChild(getDifficultySelectionDiv(displayCard));
        displayCard.appendChild(getPlayerTypeSelection(displayCard));
        return displayCard;
    };

    const getPlayerTypeSelection = (displayCard) => {
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
                if (button.classList.contains('retention')) {
                    return;
                }
                for (const btn of buttonList) {
                    btn.classList.remove('retention');
                }
                button.classList.toggle('retention');
                const diffDiv = displayCard.querySelector(".diff-sel");
                if (diffDiv === undefined) {
                    return;
                }
                if (button.textContent === 'CPU') {
                    diffDiv.style.display = 'flex';
                    // Make sure to select the `Easy` difficulty as a placeholder
                    const diffButton = displayCard.querySelector(".diff-sel > button:first-of-type");
                    if (diffButton === null || diffButton === undefined) {
                        return;
                    }
                    diffButton.click();
                } else {
                    diffDiv.style.display = 'none';
                    // Display the human portrait
                    setPlayerPortrait(button.textContent.toLowerCase(), displayCard.querySelector('img'));
                }
            });
        });
        buttonList[0].click();
        return playerSelectionDiv;
    };

    const getCharDisplay = () => {
        const displayImg = document.createElement("img");
        setPlayerPortrait('human', displayImg);
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
                const charPortait = import(`../../assets/${portraitAsset}.png`);
                if (charPortait !== undefined) {
                    resolve(charPortait);
                } else {
                    reject(`Couldn't find the asset labeled ${assetName}`);
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
    };

    // Maybe it's worth moving somewhere else
    const getPlayerModel = async () => {
        // create the player model
        const selectedPlayer = getTextContentOfRetention(displayCard.querySelector('player-type-sel'));
        const playerType     = await import(`../../model/game-entities/${selectedPlayer}-player.js`);
        const PlayerType     = playerType.default; 
        if (selectedPlayer === 'CPU') {
            let strategy     = undefined;
            const difficulty = getTextContentOfRetention(displayCard.querySelector('diff-sel'));
            switch (difficulty) {
                // Make sure to change all this strategy names to make it easier to import
                case 'Easy':
                    strategy = await import('../../model/cpu-strategy/easy-strategy.js');
                    break;
                case 'Medium':
                    strategy = await import('../../model/cpu-strategy/medium-strategy.js');
                    break;
                case 'Hard':
                    strategy = await import('../../model/cpu-strategy/hard-strategy.js');
                    break;
            }
            const Strategy = strategy.default;
            // Modify the strategy to allow the board to be later attached
            return new PlayerType(new Strategy());
        } else {
            return new PlayerType();
        }
    };

    const getTextContentOfRetention = (parentElem) => {
        for (const child of parentElem.childNodes) {
            if (child.classList.contains('retention')) {
                return child.textContent;
            }
        }
        return undefined;
    };

    return { getFullDisplayCard };
};

export default createPlayerCardUI;


