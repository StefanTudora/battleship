import { Ship } from './ship.js'

/*
 * Class representing the game board with precise ship placements information.
 */
class GameBoard {

    /* Hidden board which details the ship placement */
    #shipPlacement;
    /* Ship count, doubles as a key when inputing new ships */
    #shipCnt;
    /* Registry to keep count of ship states: active or sunk */
    #shipRegistry;

    constructor() {
        /* Main board which opposing players can view, contains Hits and Misses */
        this.#shipPlacement = GameBoard.initBoard(10, 10);
        this.#shipCnt       = 0;
        this.#shipRegistry  = new Map();
    }

    getBoardSize() {
        return [this.#shipPlacement.length, this.#shipPlacement[0].length];
    }

    static initBoard(rows, cols) {
        return Array.from({ length: rows }, () => Array(cols).fill(0));
    }

    /*
     * Add the ship to board
     * @param {start}     - starting point in which the ship is anchored
     * @param {direction} - denotes the axes along which the ships is placed (Ox or Oy)
     * @param {length}    - length of the ship
     */
    addShipToBoard(start, direction, length) {
        // add ship to registry
        this.#shipRegistry.set(++this.#shipCnt, new Ship(length));
        const adv = (point, direction) => direction ? [point[0] + 1, point[1]] : [point[0], point[1] + 1];
        let curr = start;
        for (let idx = 0; idx < length; ++idx) {
            this.#shipPlacement[curr[0]][curr[1]] = this.#shipCnt;
            curr = adv(curr, direction);
        }
    }

    // Check weather the ship can be placed at the desired location
    canBePlaced(start, direction, length) {
        if (start[0] + length - 1 >= 10 && direction) {
            return false;
        }
        if (start[1] + length - 1 >= 10 && !direction) {
            return false;
        }
        const adv  = (point, direction) => direction ? [point[0] + 1, point[1]] : [point[0], point[1] + 1];
        let curr   = start;
        const disp = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]; 
        // A ship will fit if its border can fit on the map
        for (let idx = 0; idx < length; ++idx) {
            for (const df of disp) {
                const [dx, dy] = [curr[0] + df[0], curr[1] + df[1]];
                if (Math.max(dx, dy) >= 10 || Math.min(dx, dy) < 0) {
                    // The border can exit the board. We already checked if the ship fits
                    continue;
                }
                if (this.#shipPlacement[dx][dy] != 0) {
                    return false;
                }
            }
            curr = adv(curr, direction);
        }
        return true;
    }

    /*
     * Process the shot
     * @param {point} - to process
     */
    receiveAttack(point) {
        // Augment the method to let the player know the ship was sunk;
        if (this.#shipPlacement[point[0]][point[1]] == 0) {
            return "Miss";
        }
        const currentShip = this.#getShipFromRegistryByCoord(point);
        currentShip.hit();
        if (currentShip.isSunk()) {
            // remove from the shipRegistry
            this.#shipRegistry.delete(this.#shipPlacement[point[0]][point[1]]);
        }
        this.#shipPlacement[point[0]][point[1]] = 0;
        return "Hit";
    }

    /*
     * Remove sunk ship from registry
     */
    #getShipFromRegistryByCoord(point) {
        return this.#shipRegistry.get(this.#shipPlacement[point[0]][point[1]]);
    }

    /*
     * @return {true} if no ship in registry, {false} otherwise
     */
    allShipsSunk() {
        return this.#shipRegistry.size == 0;
    }

    /*
     * Pretty display of the board
     */
    #prettyPrintBoard() {
        console.log('\n   ' + Array.from({length: this.#shipPlacement[0].length}, (_, i) => i).join(' '));
        console.log('  ' + Array.from({length: 2 * this.#shipPlacement[0].length}, () => '─').join('') + '─');
        for (let idx = 0; idx < this.#shipPlacement.length; idx++) {
            console.log(idx + ' │' + this.#shipPlacement[idx].map(cell => cell === 0 ? '~' : cell).join(' ') + '│');
        }
        console.log('  ' + Array.from({length: 2 * this.#shipPlacement[0].length}, () => '─').join('') + '─\n');
    }
}

export { GameBoard };