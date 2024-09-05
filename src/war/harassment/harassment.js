const { createCreep, generateBodyParts, generateName, generateMemory } = require('createCreep_createCreep');

function harassment(targetRoom, spawnRoom) {
    const harassmenter = Object.values(Game.creeps).find(creep => 
        creep.memory.role === 'harassmenter'
        && creep.memory.targetRoom === targetRoom
    );
    if (harassmenter == undefined) {
        spawnHarassmenter(spawnRoom, targetRoom);
        return;
    }
    if (harassmenter.hits < harassmenter.hitsMax) {
        harassmenter.heal(harassmenter);
        if (harassmenter.pos.roomName == targetRoom) {
            const exit = harassmenter.pos.findClosestByPath(FIND_EXIT);
            harassmenter.moveTo(exit);
            return;
        }
        const exit = harassmenter.pos.findClosestByPath(FIND_EXIT);
        if (harassmenter.pos.getRangeTo(exit) == 0) {
        const centerPos = new RoomPosition(25, 25, harassmenter.pos.roomName);
        const direction = harassmenter.pos.getDirectionTo(centerPos);
        harassmenter.move(direction);
        }
        return;
    }
    if (harassmenter.pos.roomName != targetRoom) {
        harassmenter.moveTo(new RoomPosition(25, 25, targetRoom));
        return;
    }
}

function spawnHarassmenter(room, targetRoom) {
    const spawn = room.find(FIND_MY_SPAWNS)[0];
    const body = generateBodyParts(
        energyAvailable=room.energyAvailable,
        bodyparts=[TOUGH, HEAL, MOVE, MOVE],
        minLength=6,
        maxLength=50,
        isSortBodyParts=true,
    );
    const name = generateName('harassmenter');
    const memory = generateMemory({
        role: 'harassmenter',
        targetRoom: targetRoom,
    });
    createCreep(spawn, room, body, name, memory);        
    return;
}

module.exports = harassment;