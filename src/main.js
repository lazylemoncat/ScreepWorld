const transfer = require('transfer_transfer');
const harvest = require('harvest_harvest');
const upgrade = require('upgrade_upgrade');
const build = require('build_build');
const loopStructures = require('structure_loopStructures');
const EnergyQueue = require('messageQueue_energyQueue');

module.exports.loop = function () {
  // 获得pixel
  getPixel();
  // 删除死亡creep的内存
  deleteDeadMemory();
  
  for (roomName in Game.rooms) {
    let room = Game.rooms[roomName];
    transfer(room);
    harvest(room);
    upgrade(room);
    build(room);
    loopStructures(room);
  }
}

function deleteDeadMemory() {
  for(let name in Memory.creeps) {
    if(!Game.creeps[name]) {
      delete Memory.creeps[name];
    }
  }
}

// 当bucket攒满则获得Pixel
function getPixel() {
  // 私服没有Game.cpu.generatePixel指令
  if (Game.cpu.generatePixel && Game.cpu.bucket == 10000) {
    Game.cpu.generatePixel();
  }
}
