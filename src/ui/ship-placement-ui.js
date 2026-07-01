import './ship-placement-style.css'

const boardPL = () => {

    const createTileBoard = () => {
        // Create the tileBoard for ship placement
        const tileBoard = document.createElement("div");
        tileBoard.classList.add("tile-board");
        for (let row = 0; row < 10 * 10; ++row) {
            const childDiv = document.createElement("div");
            // Add highlight and clear styles
            childDiv.addEventListener("mouseover", getHighlightListener(childDiv));
            childDiv.addEventListener('mouseout', getcleanStyleListener(childDiv));
            tileBoard.appendChild(childDiv);
        }
        console.log(tileBoard.childElementCount);
        return tileBoard;
    };

    const createShipYard = () => {
        // Create selectable shipyard elements
        const shipYard = document.createElement("div");
        return shipYard;
    }

    const getHighlightListener = (node) => {
        return () => {
            const arr = Array.from(node.parentElement.children);
            const idx = arr.indexOf(node);
            // Adapt listener to ship size
            if (idx + 4 * 10 >= 100) {
                console.log('invalid');
                for (let i = idx; i < 100; i += 10) {
                    const elem = arr.at(i);
                    elem.classList.add("invalid");
                }
            } else {
                for (let i = idx; i <= idx + 4 * 10; i += 10) {
                    const elem = arr.at(i);
                    elem.classList.add("valid");
                }
            }
        }
    }

    const getcleanStyleListener = (node) => {
        return () => {
            const arr = Array.from(node.parentElement.children);
            const idx = arr.indexOf(node);
            // Adapt listener to ship size
            for (let i = idx; i < 100 && i <= idx + 4 * 10; i += 10) {
                const elem = arr.at(i);
                elem.classList.remove("valid", "invalid");
            }
        }
    }

    return { createTileBoard };
};

export default boardPL;