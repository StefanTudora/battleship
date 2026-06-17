import { CheckState } from './check-state.js';
import { State } from './base-state.js';

class HumanState extends State {

    constructor(context) {
        super(context);
    }

    doAction() {
        // Use the context and attack the opposing player -> for development
        const opposingPlayer = this.context.getNonControllingPlayer();
        const board = opposingPlayer.getBoard();

        let x = 0, y = 0;
        // Keep generating a number whilst the selected point is zero
        console.log("Tried attcking for: ");
        while (board.getStateOfPoint([x = Math.floor(Math.random() * 10), y = Math.floor(Math.random() * 10)]) != 0) {
            console.log([x, y]);
        };
        board.receiveAttack([x, y]);
        console.log([x, y])

        console.log(opposingPlayer.type)
        this.context.transferControl();

        return new CheckState(this.context);
    }
}

export { HumanState };