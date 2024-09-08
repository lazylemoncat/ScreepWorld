const { createCreep, generateBodyParts, generateName, generateMemory } = require('createCreep_createCreep');
const RoomTransferer = require('transfer_roomTransferer');

function transfer(room) {
    const transferers = room.find(FIND_MY_CREEPS, {
        filter: creep => creep.memory.role == 'transferer'
    });
    checkSpawn(room, transferers);
    for (const transferer of transferers) {
        const roomTransferer = new RoomTransferer(transferer);
        roomTransferer.loop(transferer);
    }
}

function checkSpawn(room, transferers) {
    if (transferers.length >= 2) {
        return;
    }
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

module.exports = transfer;