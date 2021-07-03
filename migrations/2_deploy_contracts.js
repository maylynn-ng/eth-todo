const TodoList = artifacts.require('./TodoList.sol');
// artifacts.require grabs it in a way it can understand

// Migration:
// whenever you deploy, you change the blockchain state
// you need to migrate the changes to the blockchain
// need numbers so they know what order to run these in

module.exports = function (deployer) {
  deployer.deploy(TodoList);
};
