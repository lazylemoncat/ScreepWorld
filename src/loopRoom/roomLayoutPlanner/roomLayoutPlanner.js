const extensionPlanner = require('loopRoom_roomLayoutPlanner_extensionPlanner');

function roomLayoutPlanner(room) {
    if (room.memory.roomLayoutPlanner == undefined) {
        room.memory.roomLayoutPlanner = {
            level: 1,
            status: "setting",
        };
    }
    setSite(room);
}

function setSite(room) {
    const level = room.memory.roomLayoutPlanner.level;
    extensionPlanner(room, level);
}

module.exports = roomLayoutPlanner;