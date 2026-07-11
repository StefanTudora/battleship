import NaiveStrategy from './naive-strategy.js'

/*
 * Gunner CPU strategy used in Medium mode
 * Implements hunt and destroy 
 * Based on the Naive implementation + will investigate the search space of the hit
 */
export default class GunnerStrategy extends NaiveStrategy {

    constructor(observableBoard) {
        super(observableBoard);
        this.initStrategySpecific();
    }

    initStrategySpecific() {
        this.searchPoints = new Array();
        this.visited = Array.from({ length: this.rows }, () => Array(this.cols).fill(false));
    }

    executeStrategy() {
        let attackCoord = [-1, -1];
        if (this.searchPoints.length !== 0) {
            // We have coordinates of a knwon enemy vessel
            attackCoord = this.searchPoints.shift();
        } else {
            while (this.coordinates.length > 0) {
                attackCoord = this.coordinates.pop();
                if (this.wasPointVisited(attackCoord) == false) {
                    // Skip all points that have been explored;
                    break;
                }
            }
        }
        this.visitCell(attackCoord);
        const status = this.observableBoard.receiveAttack(attackCoord);
        switch (status) {
            case "Hit":
                this.calibrateTargetingSystem(attackCoord);
                break;
            case "Sunk":
                // The ship has been sunked, dispose of the search points
                this.clearTargetingSystem();
                break;
            case "Miss":
                // Nothing to do here
                break;
        }
    }

    calibrateTargetingSystem(attackCoord) {
        const diff = [-1, 0, 1, 0, -1];
        // Add the neighbouring points to the search
        for (let idx = 0; idx < 4; ++idx) {
            const dx = attackCoord[0] + diff[idx];
            const dy = attackCoord[1] + diff[idx + 1];
            if (Math.min(dx, dy) < 0 || dx >= this.rows || dy >= this.cols || this.wasPointVisited([dx, dy])) {
                // Skip point if out of bounds or already visited
                continue;
            }
            this.searchPoints.push([dx, dy]);
        }
    }

    clearTargetingSystem() {
        this.searchPoints = new Array();
    }

    wasPointVisited(point) {
        return this.visited[point[0]][point[1]];
    }

    visitCell(point) {
        console.log("Visit for: " + point);
        this.visited[point[0]][point[1]] = true;
    }
}