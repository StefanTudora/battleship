import { CheckState } from './check-state.js';
import { State } from './base-state.js';
import { CPUPlayer } from '../model/cpu-player.js';

class PlayerState extends State {

    constructor(context) {
        super(context);
    }

    doAction() {
        const activePlayer = this.context.getActivePlayer();

        if (activePlayer instanceof CPUPlayer) {
            activePlayer.attackBoard();    
        } else {
            // Break the FSM execution and wait for a human player to resume the game;
            return undefined;
        }
        
        return new CheckState(this.context);
    }
}

export { PlayerState };
