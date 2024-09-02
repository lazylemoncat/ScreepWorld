const Harvester = require('harvest_harvester');

class Room_harvester extends Harvester {
    constructor(creep) {
        super(creep);
    }

    transferEnergy() {
        if (this.transferToExtension()) {
            return;
        }
        if (this.transferToContainer()) {
            return;
        }
        this.transferToSpawn();
    }

    transferToExtension() {
        const extension = this.creep.pos.findInRange(FIND_STRUCTURES, 1, {
            filter: structure => structure.structureType == STRUCTURE_EXTENSION
            && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
        })[0];
        if (extension == undefined) {
            return false;
        }
        this.creep.transfer(extension, RESOURCE_ENERGY);
        return true;
    }    

    transferToContainer() {
        const container = this.creep.pos.findInRange(FIND_STRUCTURES, 1, {
            filter: structure => structure.structureType == STRUCTURE_CONTAINER
            && structure.store.getFreeCapacity() > 0
        })[0];
        if (container == undefined) {
            return false;
        }
        if (this.creep.transfer(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            this.creep.moveTo(container);
        }
        return true;
    }

    transferToSpawn() {
        const spawn = this.creep.room.find(FIND_MY_SPAWNS)[0];
        if (this.creep.transfer(spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            this.creep.moveTo(spawn);
        }
    }
}

module.exports = Room_harvester;