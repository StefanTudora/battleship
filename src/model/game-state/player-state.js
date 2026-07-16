import { CheckState } from './check-state.js';
import { State } from './base-state.js';
import CPUPlayer from '../game-entities/cpu-player.js';

class PlayerState extends State {

    constructor(context) {
        super(context);
    }

    async doAction() {
        const activePlayer = this.context.getActivePlayer();

        if (activePlayer instanceof CPUPlayer) {
            const move = await activePlayer.attackBoard();
            this.context.updateBoard(...move);
        } else {
            // Break the FSM execution and wait for a human player to resume the game;
            return undefined;
        }
        
        return new CheckState(this.context);
    }
}

export default PlayerState;
