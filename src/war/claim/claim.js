const { createCreep, generateBodyParts, generateName, generateMemory } = require('createCreep_createCreep');

function claim(targetRoom) {
    const claimer = Object.values(Game.creeps).find(creep => creep.memory.role === 'claimer');
    if (claimer == undefined) {
        spawnClaimer(Game.rooms['E29N3']);
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
            break;
    }
}

function spawnClaimer(room) {
    const spawn = room.find(FIND_MY_SPAWNS)[0];
    const body = generateBodyParts(
        energyAvailable=room.energyAvailable,
        bodyparts=[CLAIM, MOVE],
        maxLength=2,
    );
    const name = generateName('claimer');
    const memory = generateMemory({
        role: 'claimer',
    });
    createCreep(spawn, room, body, name, memory);        
    return;
}

module.exports = claim;