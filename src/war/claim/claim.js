const { createCreep, generateBodyParts, generateName, generateMemory } = require('createCreep_createCreep');

function claim(targetRoom, spawnRoom) {
    claimController(targetRoom, spawnRoom);
    buildSpawn(targetRoom, spawnRoom);
}

function claimController(targetRoom, spawnRoom) {
    const room = Game.rooms[targetRoom];
    if (room != undefined && room.controller.my) {
        return;
    }
    const claimer = Object.values(Game.creeps).filter(creep => 
        creep.memory.role === 'claimer'
        && creep.memory.targetRoom === targetRoom
    )[0];
    if (claimer == undefined) {
        spawnClaimer(spawnRoom, targetRoom);
        return;
    }
    if (claimer.pos.roomName != targetRoom) {
        claimer.moveTo(new RoomPosition(25, 25, targetRoom));
        return;
    }
    const controller = claimer.room.controller;
    if (claimer.claimController(controller) == ERR_NOT_IN_RANGE) {
        claimer.moveTo(controller);
    }
    return;
}

function spawnClaimer(spawnRoom, targetRoom) {
    const room = Game.rooms[spawnRoom];
    const spawn = room.find(FIND_MY_SPAWNS)[0];
    const body = () => [CLAIM, MOVE];
    const name = generateName('claimer');
    const memory = generateMemory({
        role: 'claimer',
        targetRoom: targetRoom,
    });
    createCreep(spawn, room, body, name, memory);        
    return;
}

function buildSpawn(targetRoom, spawnRoom) {
    const room = Game.rooms[targetRoom];
    if (room == undefined || !room.controller.my) {
        return;
    }
    const spawn = room.find(FIND_MY_SPAWNS)[0];
    if (spawn != undefined) {
        return;
    }
    const builder = Object.values(Game.creeps).filter(creep => 
        creep.memory.role === 'builder'
        && creep.memory.targetRoom === targetRoom
    )[0];
    if (builder == undefined) {
        spawnBuilder(spawnRoom, targetRoom);
        return;
    }
    if (builder.pos.roomName != targetRoom) {
        builder.moveTo(new RoomPosition(25, 25, targetRoom));
        return;
    }
    if (builder.store.getUsedCapacity(RESOURCE_ENERGY) == 0) {
        const source = builder.pos.findClosestByPath(FIND_SOURCES);
        if (builder.harvest(source) == ERR_NOT_IN_RANGE) {
            builder.moveTo(source);
        }
        return;
    }
    const constructionSite = room.find(FIND_CONSTRUCTION_SITES)[0];
    if (constructionSite == undefined) {
        return;
    }
    if (builder.build(constructionSite) == ERR_NOT_IN_RANGE) {
        builder.moveTo(constructionSite);
    }
    return;
}

function spawnBuilder(spawnRoom, targetRoom) {
    const room = Game.rooms[spawnRoom];
    const spawn = room.find(FIND_MY_SPAWNS)[0];
    const body = generateBodyParts(
        energyAvailable=room.energyCapacityAvailable,
        bodyparts=[WORK, CARRY, MOVE],
    );
    const name = generateName('builder');
    const memory = generateMemory({
        role: 'builder',
        targetRoom: targetRoom,
    });
    createCreep(spawn, room, body, name, memory);        
    return;
}

module.exports = claim;