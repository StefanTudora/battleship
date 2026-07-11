import { Player } from "./player.js";
import { BaseStrategy } from "../cpu-strategy/base-strategy.js";
import { NaiveStrategy } from "../cpu-strategy/naive-strategy.js";
import { GunnerStrategy } from "../cpu-strategy/gunner-strategy.js";
import { CalibratedGunnerStrategy } from "../cpu-strategy/calibrated-gunner-strategy.js";
import { SeasonedGunner } from "../cpu-strategy/seasoned-gunner.js";

class CPUPlayer extends Player {
    
    /*
     * @gameBoard - of CPU
     * @strategy - being used to play
     *           - the possible strategies are:
     *                  -> Base      - a crude implementation prone to missfire
     *                  -> Naive     - a blind space search strategy, no chance for missfire
     *                  -> Gunner    - once hit, will make small adjustments until the ship is sinked,
     *                                 will use the same naive approach until another ship is hit
     *                  -> Admiral   - will make calculated probabilistic guesses and act upon them
     */
    constructor(gameBoard, strategy) {
        super(gameBoard);
        this.playerType = 'cpu';
        /** Implement the strategy - the selection is dificulty based */
        switch (strategy) {
            case "Naive":
                /** Rewrite the code to allow for a dynamic import of the strategy to take place */
                this.strategy = new NaiveStrategy(gameBoard);
                break;
            case "Gunner":
                this.strategy = new GunnerStrategy(gameBoard);
                break;
            case "Calibrated-Gunner":
                this.strategy = new CalibratedGunnerStrategy(gameBoard);
                break;
            case "Seasoned-Gunner":
                this.strategy = new SeasonedGunner(gameBoard);
                break;
            default: 
                this.strategy = new BaseStrategy(gameBoard);
                break;
        }
    }

    attackBoard() {
        this.strategy.executeStrategy();
    }
}

export default CPUPlayer;