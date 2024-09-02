const Structure = require('structure_structure');

class Tower extends Structure {
    constructor(structure) {
        super(structure);
    }

    loop() {
        if (this.attack()) {
            return;
        }
        if (this.repair()) {
            return;
        }
    }

    repair() {
        const repairTarget = this.structure.room.find(FIND_STRUCTURES, { 
            filter: structure => structure.hits < structure.hitsMax 
                    && structure.structureType != STRUCTURE_WALL
                    && structure.structureType != STRUCTURE_RAMPART
            })[0];
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