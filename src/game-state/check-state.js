import { PlayerState } from './player-state.js'
import { FinalState } from './final-state.js'
import { State } from './base-state.js';

class CheckState extends State {

    constructor(context) {
        super(context);
    }

    doAction() {
        // Check if we have a winner and terminate game
        if (this.context.getActivePlayer().hasWon()) {
            return new FinalState(this.context);
        }
        // Switch control and keep playing
        this.context.switchControl();
        return new PlayerState(this.context);
    }
}

export { CheckState };