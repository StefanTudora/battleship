import { NaiveStrategy } from './naive-strategy'

/*
 * Gunner CPU strategy used in Medium mode
 * Based on the Naive implementation + will investigate the search space of the hit
 */
class GunnerStrategy extends NaiveStrategy {

    constructor(observableBoard) {
        super(observableBoard);
    }

    // For now it will inherit the methods from the base class
}