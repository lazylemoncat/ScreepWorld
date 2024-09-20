const { createCreep, generateBodyParts, generateName, generateMemory } = require('createCreep_createCreep');

function build(room) {
    let builder = room.find(FIND_MY_CREEPS, {
        filter: creep => creep.memory.role == 'builder'
    })[0];
    const constructionSite = room.find(FIND_CONSTRUCTION_SITES)[0];
    if (builder == undefined) {
        if (constructionSite == undefined) {
            return;
        }
        const spawn = room.find(FIND_MY_SPAWNS)[0];
        const body = generateBodyParts(
            energyAvailable=room.energyAvailable,
            bodyparts=[WORK, CARRY, MOVE],
        );
        const name = generateName('builder');
        const memory = generateMemory({
            role: 'builder',
        });
        createCreep(spawn, room, body, name, memory);
        return;
    }
    if (constructionSite == undefined) {
        return;
    }
    if (builder.store.getUsedCapacity() == 0) {
        const storedStructure = builder.room.find(FIND_STRUCTURES, {
            filter: structure => structure.structureType == STRUCTURE_CONTAINER
            || structure.structureType == STRUCTURE_SPAWN
        })[0];
        if (storedStructure == undefined) {
            return;
        }
        if (builder.withdraw(storedStructure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            builder.moveTo(storedStructure);
        }
        return;
    }
    if (builder.build(constructionSite) == ERR_NOT_IN_RANGE) {
        builder.moveTo(constructionSite);
    }
}

module.exports = build;