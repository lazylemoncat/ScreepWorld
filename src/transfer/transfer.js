const { createCreep, generateBodyParts, generateName, generateMemory } = require('createCreep_createCreep');
const EnergyQueue = require('messageQueue_energyQueue');

function transfer(room) {
    const transferer = room.find(FIND_MY_CREEPS, {
        filter: creep => creep.memory.role == 'transferer'
    })[0];
    if (transferer == undefined) {
        spawnTransferer(room);
        return;
    }
    if (transferer.store.getUsedCapacity() == 0) {
        const container = transferer.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: structure => structure.structureType == STRUCTURE_CONTAINER
            && structure.store.getUsedCapacity(RESOURCE_ENERGY) >= transferer.store.getFreeCapacity()
        });
        if (container == undefined) {
            return;
        }
        if (transferer.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            transferer.moveTo(container);
        }
        return;
    }
    let target;
    if (checkEnergyTarget(transferer)) {
        target = Game.getObjectById(transferer.memory.energyTarget);
    }else {
        const targetObject = getTarget(room, transferer);
        if (targetObject == undefined) {
            return;
        }
        target = Game.getObjectById(targetObject.id);
    }
    if (transferer.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        transferer.moveTo(target);
    }
}

function spawnTransferer(room) {
    const spawn = room.find(FIND_MY_SPAWNS)[0];
    const body = generateBodyParts(
        energyAvailable=room.energyAvailable,
        bodyparts=[CARRY, MOVE],
    );
    const name = generateName('transferer');
    const memory = generateMemory({
        role: 'transferer',
    });
    createCreep(spawn, room, body, name, memory);        
    return;
}

function checkEnergyTarget(transferer) {
    if (transferer.memory.energyTarget == undefined) {
        return false;
    }
    const target = Game.getObjectById(transferer.memory.energyTarget);
    if (target == undefined || target.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
        transferer.memory.energyTarget = undefined;
        return false;
    }
    return true;
}

function getTarget(room, transferer) {
    const targetObject = EnergyQueue.receive("transfer", transferer.store.getFreeCapacity());
    if (targetObject == undefined) {
        return undefined;
    }
    transferer.memory.energyTarget = targetObject.id;
    return targetObject;
}

module.exports = transfer;