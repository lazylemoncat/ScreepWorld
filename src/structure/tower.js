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
        if (this.heal()) {
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

    heal() {
        const healTargets = this.structure.room.find(FIND_MY_CREEPS, {
            filter: creep => creep.hits < creep.hitsMax
        });
        const healTarget = healTargets.sort((a, b) => a.hits - b.hits)[0];
        if (healTarget == undefined) {
            return false;
        }
        if (healTarget.memory.role == 'harassmenter') {
            if (healTarget.body.find(part => part.type == HEAL && part.hits != 0) != undefined) {
                return false;
            }
        }
        this.structure.heal(healTarget);
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