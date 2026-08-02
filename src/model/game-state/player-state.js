import { CheckState } from './check-state.js';
import { State } from './base-state.js';
import CPUPlayer from '../game-entities/cpu-player.js';

class PlayerState extends State {

    constructor(context) {
        super(context);
    }

    async doAction() {
        const activePlayer = this.context.getActivePlayer();
        const [move, state] = await activePlayer.attackBoard();
        
        if (move === undefined || state === undefined) {
            return;
        }
        
        this.context.updateBoard(move, state);
        return new CheckState(this.context);
    }
}

export default PlayerState;
