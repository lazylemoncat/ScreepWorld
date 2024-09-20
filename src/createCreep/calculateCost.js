function calculateCost(bodyParts) {
    return bodyParts.reduce((cost, part) => cost + BODYPART_COST[part], 0);
}

module.exports = calculateCost;