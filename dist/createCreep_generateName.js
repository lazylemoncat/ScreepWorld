function generateName(role="creep") {
    return () => {
      return role + Game.time % 100;
    }
  }
  
  module.exports = generateName;