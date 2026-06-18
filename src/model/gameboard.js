import { Ship } from './ship.js'

/*
 * Class representing the game board with precise ship placements information.
 * Each player will hold a referrence to the  enemy board but made visible only throuh a proxy.
 * As such, the players will be able to see only the hits or misses of enemy board.
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
     * @start     - starting point in which the ship is anchored
     * @direction - denotes the axes along which the ships is placed (Ox or Oy)
     * @length    - length of the ship
     */
    addShipToBoard(start, direction, length) {
        // add ship to registry
        this.#shipRegistry.set(++this.#shipCnt, new Ship(length));
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
     * Process the shot
     * @point - to process
     */
    receiveAttack(point) {
        // Augemnt the method to let the player know the ship was sunk;
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
        // console.log("Ship battalion active unit status : " + this.#shipRegistry.size);
        // this.#prettyPrintBoard();
        return "Hit";
    }

    /*
     * Remove sunk ship from registry
     */
    #getShipFromRegistryByCoord(point) {
        return this.#shipRegistry.get(this.#shipPlacement[point[0]][point[1]]);
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