const loopRooms = require('loopRoom_loopRooms');
const harassment = require('war_harassment_harassment');
const attack = require('war_attack_attack');
const attackController = require('war_attackController_attackController');
const claim = require('war_claim_claim');

module.exports.loop = function () {
    // 获得pixel
    getPixel();
    // 删除死亡creep的内存
    deleteDeadMemory();
    
    loopRooms();
    attackController('W8S57', 'W8S56');
    claim('W8S58', 'W8S56');
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