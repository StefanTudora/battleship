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
        let status = null;
        let border = null;
        if (this.#shipPlacement[point[0]][point[1]] == 0) {
            status = "Miss";
        } else {
            const currentShip = this.#getShipFromRegistryByCoord(point);
            currentShip.hit();
            if (currentShip.isSunk()) {
                // remove from the shipRegistry
                this.#shipRegistry.delete(this.#shipPlacement[point[0]][point[1]]);
                status = "Sunk";
            } else {
                status = "Hit";
            }
            this.#shipPlacement[point[0]][point[1]] = -1;
            if (status == "Sunk") {
                border = this.#getBorderFromPoint(point);
            }
        }
        return [status, border];
    }

    #getBorderFromPoint(point) {
        const disp        = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
        const searchQueue = [];
        const wreckage    = [];
        const wreckageSet = new Set();

        const encode = (x, y) => `${x},${y}`;
        const decode = (key) => key.split(',').map(Number);

        this.#shipPlacement[point[0]][point[1]] = 0;
        searchQueue.push(point);
        wreckageSet.add(encode(point[0], point[1]));

        while (searchQueue.length > 0) {
            const currPnt = searchQueue.shift();
            wreckage.push(currPnt);
            for (let idx = 0; idx < 8; ++idx) {
                const dx = currPnt[0] + disp[idx][0];
                const dy = currPnt[1] + disp[idx][1];
                if (Math.min(dx, dy) < 0 || Math.max(dx, dy) >= 10 || this.#shipPlacement[dx][dy] != -1) {
                    continue;
                }
                this.#shipPlacement[dx][dy] = 0;
                searchQueue.push([dx, dy]);
                wreckageSet.add(encode(dx, dy));
            }
        }

        const borderSet = new Set();
        for (const sunkPoint of wreckage) {
            for (let idx = 0; idx < 8; ++idx) {
                const dx = sunkPoint[0] + disp[idx][0];
                const dy = sunkPoint[1] + disp[idx][1];
                if (Math.min(dx, dy) < 0 || Math.max(dx, dy) >= 10) {
                    continue;
                }
                const key = encode(dx, dy);
                if (wreckageSet.has(key) || borderSet.has(key)) {
                    continue;
                }
                borderSet.add(key);
            }
        }

        return new Set(Array.from(borderSet, decode));
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
    prettyPrintBoard() {
        console.log('\n   ' + Array.from({length: this.#shipPlacement[0].length}, (_, i) => i).join(' '));
        console.log('  ' + Array.from({length: 2 * this.#shipPlacement[0].length}, () => '─').join('') + '─');
        for (let idx = 0; idx < this.#shipPlacement.length; idx++) {
            console.log(idx + ' │' + this.#shipPlacement[idx].map(cell => cell === 0 ? '~' : cell).join(' ') + '│');
        }
        console.log('  ' + Array.from({length: 2 * this.#shipPlacement[0].length}, () => '─').join('') + '─\n');
    }
}

export { GameBoard };