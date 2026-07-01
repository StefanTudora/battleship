import humanImage from '../assets/human.jpg';
import './player-card-style.css';

const createPlayerCardUI = () => {
    // TODO -> Use dynamic imports, and cache the images for easier use
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
        displayCard.appendChild(getDifficultySelectionDiv());
        return displayCard;
    };

    const getPlayerTypeSelection = (parentDiv) => {
        const playerSelectionDiv = document.createElement("div");
        playerSelectionDiv.classList.add("player-type-sel");
        // Make sure to add appropriate styling
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

    const getDifficultySelectionDiv = () => {
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
            button.addEventListener('click', () => {
                for (const btn of buttonList) {
                    btn.classList.remove('retention');
                }
                button.classList.toggle('retention');
            });
        });
        return diffSelectDiv;
    };

    return { getFullDisplayCard };
};

export default createPlayerCardUI;


