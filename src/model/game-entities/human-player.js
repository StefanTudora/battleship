import { Player } from "./player.js";

class HumanPlayer extends Player {

    constructor(gameBoard) {
        super(gameBoard);
        this.playerType = 'human';
        this._solver    = undefined;
    }

    attackBoard() {
        if (this._solver !== undefined) {
            throw new Error('Human player is already executing')
        }

        return new Promise((resolve) => {
            this._solver = resolve;
        });
    }

    resolveMove(point) {
        if (this._solver === undefined) {
            throw new Error('No pending move for Human Player')
        }

        /*
         *  Attack the board 
         */
        const [state, _] = this.board.receiveAttack(point);

        const solver = this._solver;
        this._solver = undefined;
        solver([point, state]);
    }
}

export default HumanPlayer;