function generateMemory(...args) { // args is an array of memory object
    return () => {
      let memory = {};
      for (let arg of args) {
        memory = Object.assign(memory, arg);
      }
      return memory;
    }
  }
  
  module.exports = generateMemory;