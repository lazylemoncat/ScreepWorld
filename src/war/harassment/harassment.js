const { createCreep, generateBodyParts, generateName, generateMemory } = require('createCreep_createCreep');

function harassment(targetRoomName, spawnRoomName, nums=4) {
    const harassmenters = Object.values(Game.creeps).filter(creep => 
        creep.memory.role === 'harassmenter'
    );
    if (harassmenters.length < nums) {
        spawnHarassmenter(spawnRoomName, targetRoomName);
    }
    for (const harassmenter of harassmenters) {
        runHarassmenter(harassmenter, targetRoomName);
    }
}

function spawnHarassmenter(spawnRoomName, targetRoomName) {
    const room = Game.rooms[spawnRoomName];
    const spawn = room.find(FIND_MY_SPAWNS)[0];
    const body = generateBodyParts(
        energyAvailable=room.energyCapacityAvailable,
        bodyparts=[HEAL, HEAL, MOVE],
        minLength=1,
        maxLength=50,
        isSortBodyParts=true,
    );
    const name = generateName('harassmenter');
    const memory = generateMemory({
        role: 'harassmenter',
        targetRoom: targetRoomName,
    });
    createCreep(spawn, room, body, name, memory);        
    return;
}

function runHarassmenter(harassmenter, targetRoomName) {
    if (harassmenter.hits < harassmenter.hitsMax) {
        harassmenter.heal(harassmenter);
        if (harassmenter.pos.roomName == targetRoomName) {
            const exit = harassmenter.pos.findClosestByPath(FIND_EXIT);
            harassmenter.moveTo(exit);
            return;
        }
        const exit = harassmenter.pos.findClosestByPath(FIND_EXIT);
        if (harassmenter.pos.getRangeTo(exit) <= 3) {
            const centerPos = new RoomPosition(25, 25, harassmenter.pos.roomName);
            const direction = harassmenter.pos.getDirectionTo(centerPos);
            harassmenter.move(direction);
        }
        return;
    }
    if (harassmenter.pos.roomName != targetRoomName) {
        harassmenter.moveTo(new RoomPosition(25, 25, targetRoomName));
        return;
    }
}

module.exports = harassment;