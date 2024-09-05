const Structure = require('structure_structure');

class Tower extends Structure {
    constructor(structure) {
        super(structure);
        this.energyRate = 0.6;
    }

    loop() {
        this.checkEnergy()
        if (this.attack()) {
            return;
        }
        if (this.repair()) {
            return;
        }
    }

    repair() {
        const repairTargets = this.structure.room.find(FIND_STRUCTURES, { 
            filter: structure => structure.hits < structure.hitsMax 
                    && structure.structureType != STRUCTURE_WALL
                    && structure.structureType != STRUCTURE_RAMPART
            });
        const repairTarget = repairTargets.sort((a, b) => a.hits - b.hits)[0];
        if (repairTarget == undefined) {
            return false;
        }
        this.structure.repair(repairTarget);
        return true;
    }

    attack() {
        const hostile = this.structure.room.find(FIND_HOSTILE_CREEPS)[0];
        if (hostile == undefined) {
        return false;
        }
        this.structure.attack(hostile);
        return true;
    }
}

module.exports = Tower;