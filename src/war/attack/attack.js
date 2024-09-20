const { createCreep, generateBodyParts, generateName, generateMemory } = require('createCreep_createCreep');

function attack(targetRoom, spawnRoom) {
    let myCreep = Object.keys(Game.creeps).filter(creep => 
        Game.creeps[creep].memory.role === 'attacker'
        && Game.creeps[creep].memory.targetRoom === targetRoom
    );
    if (myCreep.length < 1) {
        spawnAttacker(spawnRoom, targetRoom);
    }
    for (const creep of myCreep) {
        const attacker = Game.creeps[creep];
        runAttacker(attacker, targetRoom);
    }
}

function spawnAttacker(spawnRoom, targetRoom) {
    const room = Game.rooms[spawnRoom];
    const spawn = room.find(FIND_MY_SPAWNS)[0];
    const body = generateBodyParts(
        energyAvailable=room.energyCapacityAvailable,
        bodyparts=[ATTACK, MOVE],
    );
    const name = generateName('attacker');
    const memory = generateMemory({
        role: 'attacker',
        targetRoom: targetRoom,
    });
    createCreep(spawn, room, body, name, memory);
    return;
}

function runAttacker(creep, targetRoom) {
    const target = new RoomPosition(25, 25, targetRoom);
    if (creep.pos.roomName !== targetRoom) {
        creep.moveTo(target);
        return;
    }
    const hostileCreep = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS);
    if (hostileCreep) {
        if (creep.attack(hostileCreep) == ERR_NOT_IN_RANGE) {
            creep.moveTo(hostileCreep);
        }
        return;
    }
    const hostileStructure = creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES, {
        filter: structure => structure.structureType !== STRUCTURE_CONTROLLER
    });
    if (hostileStructure) {
        if (creep.attack(hostileStructure) == ERR_NOT_IN_RANGE) {
            creep.moveTo(hostileStructure);
        }
        return;
    }
    creep.moveTo(target);
    return;
}

module.exports = attack;