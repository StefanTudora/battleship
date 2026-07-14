/*
 * Meant to be extended
 */ 
class State {

    constructor(context) {
        this.context = context;
    }

    /** Meant to be overwritten */
    doAction() {
        try {
            throw new Error('Executed undefined action');
        } catch (error) {
            console.log(error.message);
        }
    }
}

export { State };