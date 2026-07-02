import './ship-placement-style.css'

// Rename this file and place in it's own folder with the style sheet
// This should be a tile file easy to use 
// Make file modular in order to reuse the tile Board
const boardPL = () => {

    const VERTICAL = "vertical";
    const HORIZONTAL = "horizontal";

    // Main div containing tile borad cells
    const tileBoard = document.createElement("div");

    const createTileBoard = () => {
        // Create the tileBoard for ship placement
        tileBoard.classList.add("tile-board");
        for (let row = 0; row < 10; ++row) {
            for (let col = 0; col < 10; ++col) {
                const childDiv = document.createElement("div");
                tileBoard.appendChild(childDiv);
                // Set the coordinates for the cell
                childDiv.dataset.row = row;
                childDiv.dataset.col = col;
                // Add highlight and clear styles
                childDiv.addEventListener('mouseover', getHighlightListener());
                childDiv.addEventListener('mouseout', getcleanStyleListener());
                childDiv.addEventListener('click', getPlaceShipListener());
            }
        }
        console.log(tileBoard.childElementCount);
        return tileBoard;
    };

    // TODO -> expanded further when base functionalities are stable
    // Meant to work with a drag and drop feature
    const createShipYard = () => {
        // Create selectable shipyard elements
        const shipYard = document.createElement("div");
        return shipYard;
    }

    const getHighlightListener = () => {
        return (event) => {
            const node = event.currentTarget;
            const [currX, currY] = [parseInt(node.dataset.row), parseInt(node.dataset.col)];
            const [cells, style] = getStateOfCurrentPlacement([currX, currY], 5, HORIZONTAL);
            for (const cell of cells) {
                cell.classList.add(style);
            }
        }
    }

    const getStateOfCurrentPlacement = (origin, length, direction) => {
        const [currX, currY] = origin;
        const cells = [];
        let cellStyle = 'valid';
        if (direction === HORIZONTAL) {
            const maxSize = Math.min(currY + length, 10);
            for (let idx = currY; idx < maxSize; ++idx) {
                cells.push(getCell(currX, idx));
            }
        } else if (direction === VERTICAL) {
            const maxSize = Math.min(currX + length, 10);
            for (let idx = currX; idx < maxSize; ++idx) {
                cells.push(getCell(idx, currY));
            }
        }
        if (cells.some(node => node.classList.length > 0) || cells.length !== length) {
            // Either we exceed board or overlap a ship
            cellStyle = 'invalid';
        }
        return [cells, cellStyle];
    }

    const getcleanStyleListener = () => {
        return (event) => {
            const node = event.currentTarget;
            const [currX, currY] = [parseInt(node.dataset.row), parseInt(node.dataset.col)];
            for (let colIdx = currY; colIdx < 10 && colIdx < currY + 5; ++colIdx) {
                const elem = getCell(currX, colIdx);
                elem.classList.remove("invalid", "valid");
            }
        }
    }

    const getPlaceShipListener = () => {
        return (event) => {
            const node = event.currentTarget;
            if (Array.from(node.classList).indexOf('invalid') !== -1) {
                return;
            }
            const [currX, currY] = [parseInt(node.dataset.row), parseInt(node.dataset.col)];

            // Handle horrizontal case
            const lStack = [];
            for (let colIdx = currY; colIdx < currY + 5; ++colIdx) {
                const elem = getCell(currX, colIdx);
                elem.classList.add("placement");
                lStack.push([currX, colIdx]);
            }

            const dir = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

            while (lStack.length > 0) {
                const [x, y] = lStack.pop();
                for (let i = 0; i < 8; ++i) {
                    const dx = x + dir[i][0];
                    const dy = y + dir[i][1];
                    if (Math.max(dx, dy) >= 10 || Math.min(dx, dy) < 0) {
                        continue;
                    }
                    const dCell = getCell(x + dir[i][0], y + dir[i][1]);
                    if (dCell.classList.length > 0) {
                        continue;
                    }
                    dCell.classList.add("space");
                }
            }
        }
    }

    const getCell = (x, y) => {
        return tileBoard.querySelector(`div[data-row='${x}'][data-col='${y}']`);
    }

    return { createTileBoard };
};

export default boardPL;