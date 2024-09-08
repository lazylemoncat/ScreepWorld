const loopRooms = require('loopRoom_loopRooms');

module.exports.loop = function () {
  // 获得pixel
  getPixel();
  // 删除死亡creep的内存
  deleteDeadMemory();
  
  loopRooms();
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