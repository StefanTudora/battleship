
class CPUState extends State {

    constructor(context) {
        this.context = context;
    }

    doAction() {
        // Implement algorithm for state
        return new CheckState(this.context, this);
    }
}

export { CPUState }