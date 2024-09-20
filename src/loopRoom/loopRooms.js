const transfer = require('transfer_transfer');
const harvest = require('harvest_harvest');
const upgrade = require('upgrade_upgrade');
const build = require('build_build');
const loopStructures = require('structure_loopStructures');
const roomLayoutPlanner = require('loopRoom_roomLayoutPlanner_roomLayoutPlanner');

function loopRooms() {
    for (roomName in Game.rooms) {
        let room = Game.rooms[roomName];
        if (room.controller == undefined || room.controller.my == false) {
          continue;
        }
        if (room.find(FIND_MY_SPAWNS).length == 0) {
          continue;
        }
        checkRoomStatus(room);
        // roomLayoutPlanner(room);
        loopRoom(room);
      }
}

function checkRoomStatus(room) {
    if (Memory.rooms[room.name] == undefined) {
        Memory.rooms[room.name] = {};
    }
    let status = "upgrading";
    const site = room.find(FIND_MY_CONSTRUCTION_SITES);
    if (site.length > 0) {
        status =  "building";
    }
    Memory.rooms[room.name].status = status;
}

function loopRoom(room) {
    harvest(room);
    transfer(room);
    build(room);
    upgrade(room);
    loopStructures(room);
}

module.exports = loopRooms;