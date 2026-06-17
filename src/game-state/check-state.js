import { HumanState } from './human-state.js'
import { State } from './base-state.js';

class CheckState extends State {

    constructor(context) {
        super(context);
    }

    doAction() {
        return new HumanState(this.context);
    }
}

export { CheckState };