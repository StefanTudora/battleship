import { Player } from "./player.js";

class HumanPlayer extends Player {

    constructor(gameBoard) {
        super(gameBoard);
        this.playerType = 'human';
    }
}

export default HumanPlayer;