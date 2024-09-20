const { createCreep, generateBodyParts, generateName, generateMemory } = require('createCreep_createCreep');

function attackController(targetRoom, spawnRoom) {
    if (Memory.war == undefined || Memory.war.claim == undefined) {
        Memory.war = {
            claim: {},
        };
        Memory.war.claim[targetRoom] = Game.time;
    }
    const claimer = Object.values(Game.creeps).find(creep => 
        creep.memory.role === 'claimer'
        && creep.memory.targetRoom === targetRoom
    );
    if (claimer == undefined) {
        if (Memory.war.claim[targetRoom] + 1000 <= Game.time) {
            spawnClaimer(spawnRoom, targetRoom);
        }
        return;
    }
    if (claimer.pos.roomName != targetRoom) {
        claimer.moveTo(new RoomPosition(25, 25, targetRoom));
        return;
    }
    const controller = claimer.room.controller;
    const res = claimer.claimController(controller);
    switch (res) {
        case ERR_NOT_IN_RANGE:
            claimer.moveTo(controller);
            break;
        case ERR_INVALID_TARGET:
            claimer.attackController(controller);
            claimer.suicide();
            Memory.war.claim[targetRoom] = Game.time;
            break;
        case OK:
            claimer.suicide();
            break;
    }
}

function spawnClaimer(spawnRoom, targetRoom) {
    const room = Game.rooms[spawnRoom];
    const spawn = room.find(FIND_MY_SPAWNS)[0];
    const body = generateBodyParts(
        energyAvailable=room.energyCapacityAvailable,
        bodyparts=[CLAIM, MOVE],
    );
    const name = generateName('claimer');
    const memory = generateMemory({
        role: 'claimer',
        targetRoom: targetRoom,
    });
    createCreep(spawn, room, body, name, memory);        
    return;
}

module.exports = attackController;