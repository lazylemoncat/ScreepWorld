const generateBodyParts = require('createCreep_generateBodyParts');
const generateName = require('createCreep_generateName');
const generateMemory = require('createCreep_generateMemory');
const calculateCost = require('createCreep_calculateCost');

function createCreep(
  spawn, // spawn object
  room, // room object
  generateBodyParts, // function return an array of body parts
  generateName, // function return a name
  generateMemory, // function return a memory object
  directions=[TOP_RIGHT, RIGHT, BOTTOM_RIGHT], // array of direction
) {
  if (checkSpawning(spawn)) {
    return ERR_BUSY;
  }
  const result = spawn.spawnCreep(
    generateBodyParts(), 
    generateName(), 
    {
      memory: generateMemory(),
      energyStructures: getEnergyStructures(room),
      // directions: directions,
    }
  );
  return result;
}

function checkSpawning(spawn) {
  if (spawn.spawning) {
    return true;
  }
  if (!spawn.memory.spawning) {
    spawn.memory.spawning = Game.time;
    return false;
  }
  if (spawn.memory.spawning == Game.time) {
    return true;
  } else {
    spawn.memory.spawning = Game.time;
    return false;
  }
}

function getEnergyStructures(room) {
  const extensions = room.find(FIND_MY_STRUCTURES, {
    filter: structure => structure.structureType == STRUCTURE_EXTENSION
  });
  const extensionsNearSource = extensions.filter(extensions =>
    extensions.pos.findInRange(FIND_SOURCES, 2).length != 0
  );
  const spawns = room.find(FIND_MY_SPAWNS);
  return extensionsNearSource.concat(extensions).concat(spawns);
}

module.exports = { 
    createCreep, 
    generateBodyParts, 
    generateName, 
    generateMemory, 
    calculateCost 
};