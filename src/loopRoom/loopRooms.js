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
        roomLayoutPlanner(room);
        loopRoom(room);
      }
}

function loopRoom(room) {
    transfer(room);
    harvest(room);
    upgrade(room);
    build(room);
    loopStructures(room);
}

module.exports = loopRooms;