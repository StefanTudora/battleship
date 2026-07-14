import { Player } from "./player.js";
import { BaseStrategy } from "../cpu-strategy/base-strategy.js";

class CPUPlayer extends Player {
    
    /*
     * @gameBoard - of CPU
     * @strategy  - being used to play
     */
    constructor(strategy, gameBoard) {
        super(gameBoard);
        this.strategy   = strategy;
        this.playerType = 'cpu';
    }

    attackBoard() {
        this.strategy.execute();
    }
}

export default CPUPlayer;