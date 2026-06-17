import { Ship } from './ship.js'

class GameBoard {

    /* Hidden board which details the ship placement */
    #shipPlacement;
    /* Ship count, doubles as a key when inputing new ships */
    #shipCnt;
    /* Registry to keep count of ship states: active or sunk */
    #shipRegistry;

    constructor() {
        /* Main board which opposing players can view, contains Hits and Misses */
        this.board          = GameBoard.initBoard(10, 10);
        this.#shipPlacement = GameBoard.initBoard(10, 10);
        this.#shipCnt       = 0;
        this.#shipRegistry  = new Map();
    }

    static initBoard(rows, cols) {
        return Array.from({ length: rows }, () => Array(cols).fill(0));
    }

    getStateOfPoint(point) {
        return this.board[point[0]][point[1]];
    }

    /*
     * Add the ship to board
     * @start     - starting point in which the ship is anchored
     * @direction - denotes the axes along which the ships is placed (Ox or Oy)
     * @length    - length of the ship
     */
    addShipToBoard(start, direction, length) {
        // add ship to registry
        this.#shipRegistry[++this.#shipCnt] = new Ship(length);
        const adv = (point, direction) => {
            if (direction) {
                return [point[0] + 1, point[1]];
            }
            return [point[0], point[1] + 1];
        };
        let curr = start;
        for (let idx = 0; idx < length; ++idx) {
            this.#shipPlacement[curr[0]][curr[1]] = this.#shipCnt;
            curr = adv(curr, direction);
        }
    }

    /*
     * Attack the current point. If ship is located at point, mark hit, else mark miss.
     * @point - to attack
     */
    receiveAttack(point) {
        const pointState = this.#attackPoint(point);
        switch(pointState) {
            case "Hit":
                this.board[point[0]][point[1]] = 'H';
                break;
            case "Miss":
                this.board[point[0]][point[1]] = 'M';
                break;
        }
        return pointState;
    }

    /*
     * Process what is found at the current location
     * @point - to process
     */
    #attackPoint(point) {
        if (this.#shipPlacement[point[0]][point[1]] == 0) {
            return "Miss";
        }
        // get ship by the cell value
        const currentShip = this.#getShipFromRegistryByCoord(point);
        currentShip.hit();
        if (currentShip.isSunk()) {
            // remove from the shipRegistry
            this.#shipRegistry.delete(this.#shipPlacement[point[1]][point[0]]);
        }
        this.#shipPlacement[point[0]][point[1]] = 0;
        return "Hit";
    }

    /*
     * Remove sunk ship from registry
     */
    #getShipFromRegistryByCoord(point) {
        return this.#shipRegistry[this.#shipPlacement[point[0]][point[1]]];
    }

    /*
     * Return @true if no ship in registry, @false otherwise
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
            console.log(idx + ' │' + this.#shipPlacement[idx].map(cell => cell === 0 ? '~' : 'S').join(' ') + '│');
        }
        console.log('  ' + Array.from({length: 2 * this.#shipPlacement[0].length}, () => '─').join('') + '─\n');
    }

    /*
     * Pretty display of the public board (shows Hits, Misses, and empty cells)
     */
    prettyPrintPublicBoard() {
        console.log('\n   ' + Array.from({length: this.board[0].length}, (_, i) => i).join(' '));
        console.log('  ' + Array.from({length: 2 * this.board[0].length}, () => '─').join('') + '─');
        for (let idx = 0; idx < this.board.length; idx++) {
            console.log(idx + ' │' + this.board[idx].map(cell => cell === 0 ? '~' : cell).join(' ') + '│');
        }
        console.log('  ' + Array.from({length: 2 * this.board[0].length}, () => '─').join('') + '─\n');
    }

}

export { GameBoard };