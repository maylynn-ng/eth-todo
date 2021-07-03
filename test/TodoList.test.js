const todoList = artifacts.require('./TodoList.sol');

contract('TodoList', accounts => {
  before(async () => {
    this.todoList = await todoList.deployed();
  });

  it('deploys successfully', async () => {
    const address = await this.todoList.address;
    assert.notEqual(address, 0x0);
    assert.notEqual(address, '');
    assert.notEqual(address, null);
    assert.notEqual(address, undefined);
  });

  it('lists tasks', async () => {
    const taskCount = await this.todoList.taskCount();
    const task = await this.todoList.tasks(taskCount);
    assert.equal(task.id.toNumber(), taskCount.toNumber());

    assert.equal(task.content, 'Do smart contract & solidity tutorial');
    assert.equal(task.completed, false);
    assert.equal(taskCount, 1);
  });
});
