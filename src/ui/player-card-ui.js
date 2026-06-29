
function PlayerCardCreate() {
    return {
        // Determine corect arguments for creating the card
        // Make sure the file presents its own style sheet
        // Use dynamic imports, and cache the images for easier use 

        getFullDisplayCard(/* Do we need extra arguments ?*/) {
            const displayCard = document.createElement('div');
            displayCard.appendChild(getPlayerTypeSelection());
            displayCard.appendChild(getCharDisplay());
            displayCard.appendChild(getDifficultySelectionDiv());
            return displayCard;
        },

        getPlayerTypeSelection() {
            const playerSelectionDiv = document.createElement("div");
            // Make sure to add appropriate styling
            playerSelectionDiv.innerHTML = `
                <p>Choose Player<p>
                <button>Human</button>
                <button>CPU</button>
            `;
            const buttonList = document.querySelectorAll(".player-type-sel button");
            buttonList.forEach(button => {
                button.addEventListener('click', () => {
                    for (const btn of buttonList) {
                        btn.classList.remove('retention');
                    }
                    button.classList.toggle('retention');
                });
            });
            return playerSelectionDiv;
        },

        getCharDisplay() {
            const displayImg = document.createElement("img");
            displayImg.setAttribute('src', "./assets/human.jpg");
            return displayImg;
        },

        getDifficultySelectionDiv() {
            const diffSelectDiv = document.createElement("div");
            diffSelectDiv.innerHtml = `
                <p>Difficulty</p>
                <button>Easy</button>
                <button>Medium</button>
                <button>Hard</button>
            `;
            const buttonList = document.querySelectorAll(".diff-sel button");
            buttonList.forEach(button => {
                button.addEventListener('click', () => {
                    for (const btn of buttonList) {
                        btn.classList.remove('retention');
                    }
                    button.classList.toggle('retention');
                });
            });
            return diffSelectDiv;
        }

    }
}

