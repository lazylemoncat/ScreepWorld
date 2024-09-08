const Harvester = require('harvest_harvester');

class Room_harvester extends Harvester {
    constructor(creep) {
        super(creep);
    }

    checkHarvesting() {
        if (this.checkGetEnergy()) {
            this.creep.memory.harvesting = false;
        } else if (this.creep.store.getFreeCapacity() == 0) {
            this.creep.memory.harvesting = false;
        } else if (this.creep.store.getUsedCapacity() == 0) {
            this.creep.memory.harvesting = true;
        }
        return this.creep.memory.harvesting;
    }

    checkGetEnergy() {
        const source = Game.getObjectById(this.creep.memory.sourceId);
        if (this.creep.pos.getRangeTo(source) != 1) {
            return false;
        }
        let extension = this.creep.pos.findInRange(FIND_STRUCTURES, 1, {
            filter: structure => structure.structureType == STRUCTURE_EXTENSION
            && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
        })[0];
        if (extension == undefined) {
            return false;
        }
        if (this.getEnergy(extension.store.getFreeCapacity(RESOURCE_ENERGY))) {
            return true;
        }
        return false;
    }

    getEnergy(amount) {
        const container = this.creep.pos.findInRange(FIND_STRUCTURES, 1, {
            filter: structure => structure.structureType == STRUCTURE_CONTAINER
            && structure.store[RESOURCE_ENERGY] >= amount
        })[0];
        if (container == undefined) {
            return false;
        }
        this.creep.withdraw(container, RESOURCE_ENERGY);
        return true;
    }

    transferEnergy() {
        if (this.transferToExtension()) {
            return;
        }
        if (this.transferToContainer()) {
            return;
        }
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