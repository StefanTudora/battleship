import { BoardProxy } from '../model/board-proxy.js';
import { GameBoard } from '../model/gameboard.js';
import './ship-placement-style.css'

// Rename this file and place in it's own folder with the style sheet
// This should be a tile file easy to use 
// Make file modular in order to reuse the tile Board
/*
 * Config view of the board
 */
const boardView = () => {

    const VERTICAL   = "VERTICAL";
    const HORIZONTAL = "HORIZONTAL";

    const tileBoard  = document.createElement("div");
    const gameBoard  = new GameBoard();
    const ships      = [2, 2, 3, 4, 5];
    let sharedConfig = undefined;

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
                // Add highlight/clear styles and placement listener
                childDiv.addEventListener('mouseover', getHighlightListener());
                childDiv.addEventListener('mouseout', getCleanStyleListener());
                childDiv.addEventListener('click', getPlaceShipListener());
            }
        }
    };

    const getTileBoard = () => {
        return tileBoard;
    }

    const getHighlightListener = () => {
        return (event) => {
            const node = event.currentTarget;
            const [currX, currY] = [parseInt(node.dataset.row), parseInt(node.dataset.col)];
            const [cells, style] = getStateOfCurrentPlacement([currX, currY], ships.at(-1), sharedConfig.direction);
            console.log(style);
            for (const cell of cells) {
                cell.classList.add(style);
            }
        }
    }

    const getStateOfCurrentPlacement = (origin, length, direction) => {
        console.log(direction);
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

    const getCleanStyleListener = () => {
        return (event) => {
            const node = event.currentTarget;
            const [currX, currY] = [parseInt(node.dataset.row), parseInt(node.dataset.col)];
            if (sharedConfig.direction === 'HORIZONTAL') {
                for (let colIdx = currY; colIdx < 10 && colIdx < currY + 5; ++colIdx) {
                    const elem = getCell(currX, colIdx);
                    elem.classList.remove("invalid", "valid");
                }
            } else {
                for (let rowIdx = currX; rowIdx < 10 && rowIdx < currX + 5; ++rowIdx) {
                    const elem = getCell(rowIdx, currY);
                    elem.classList.remove("invalid", "valid");
                }
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
            
            const shipLenght = ships.pop();
            sharedConfig.decrementCallback();
            
            // update the model with the ship info
            gameBoard.addShipToBoard([currX, currY], 0, 5);

            // Handle horrizontal case
            const lStack = [];
            if (sharedConfig.direction === 'HORIZONTAL') {
                for (let colIdx = currY; colIdx < currY + shipLenght; ++colIdx) {
                    const elem = getCell(currX, colIdx);
                    elem.classList.add("placement");
                    lStack.push([currX, colIdx]);
                }
            } else {
                for (let rowIdx = currX; rowIdx < currX + shipLenght; ++rowIdx) {
                    const elem = getCell(rowIdx, currY);
                    elem.classList.add("placement");
                    lStack.push([rowIdx, currY]);
                }
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

            if (ships.length === 0) {
                // No more ships to place, avoid undefined behaviour
                detachCellListeners();
            }
        }
    }

    /*
     * Get the cell by dataset coordinates
     */
    const getCell = (x, y) => {
        return tileBoard.querySelector(`div[data-row='${x}'][data-col='${y}']`);
    }

    /*
     * Return the proxy which hides the configuration of the board,
     * but revelas internal states when interacting with it
     */
    const getProxyBoard = () => {
        return new BoardProxy(gameBoard);
    }

    const attachSharedConfig = (config) => {
        sharedConfig = config;
    }

    const detachSharedConfig = () => {
        // detach from the shared object with the parent, no longer needed
        this.sharedConfig = null;
    }

    const detachCellListeners = () => {
        tileBoard.childNodes.forEach(cell => {
            // Remove parasitic valid classList for last added element
            cell.classList.remove('valid');
            // Replace with cloned element
            cell.replaceWith(cell.cloneNode(true));    
        })
    }

    return {
        createTileBoard,
        getTileBoard,
        attachSharedConfig,
        detachSharedConfig,
    };
};

export default boardView;