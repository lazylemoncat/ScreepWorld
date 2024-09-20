const calculateCost = require('createCreep_calculateCost');

function generateBodyParts(
    energyAvailable, // energy available
    bodyParts=[WORK, CARRY, MOVE], // array of body parts
    minLength=1, // min length of body parts
    maxLength=50, // max length of body parts
    isSortBodyParts=false, // bool of sort body parts
    bodyPartSortPriority=[TOUGH, ATTACK, RANGED_ATTACK, HEAL, CLAIM, WORK, CARRY, MOVE] // array of body part sort priority
  ) {
    return () => {
        let resBodyParts = repeatBodyParts(
            bodyParts, 
            energyAvailable, 
            minLength=1,
            maxLength=maxLength,
            startCosts=0,
        );
        if (isSortBodyParts) {
            resBodyParts = sortBodyParts(resBodyParts, bodyPartSortPriority);
        }
        return resBodyParts;
    }
}
  
function repeatBodyParts(bodyParts, energyAvailable, minLength=1, maxLength=50, startCosts=0) {
    let cost = calculateCost(bodyParts);
    let costSum = startCosts;
    let resBodyParts = [];
    while (costSum + cost <= energyAvailable) {
        costSum += cost;
        if (resBodyParts.length + bodyParts.length > maxLength) {
            break;
        }
        resBodyParts.push(...bodyParts);
    }
    if (resBodyParts.length < minLength) {
        return [];
    }
    return resBodyParts;
}
  
function sortBodyParts(bodyParts, bodyPartSortPriority) {
    return bodyParts.sort((a, b) => {
        return bodyPartSortPriority.indexOf(a) - bodyPartSortPriority.indexOf(b);
    });
}
  
module.exports = generateBodyParts;