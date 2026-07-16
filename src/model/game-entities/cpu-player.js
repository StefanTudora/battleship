import { Player } from "./player.js";
import { BaseStrategy } from "../cpu-strategy/base-strategy.js";

class CPUPlayer extends Player {
    
    delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    /*
     * @gameBoard - of CPU
     * @strategy  - being used to play
     */
    constructor(strategy, gameBoard) {
        super(gameBoard);
        this.strategy   = strategy;
        this.playerType = 'cpu';
    }

    async attackBoard() {
        
        await this.delay(650);
        const result = this.strategy.execute();
        await this.delay(350);
        return result;
    }
}

export default CPUPlayer;