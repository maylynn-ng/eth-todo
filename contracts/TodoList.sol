pragma solidity ^0.5.0;

// running truffle compile will compile contracts and make a build with json files

contract TodoList { 
  uint public taskCount = 0; 
  // uint: unsigned integer - means can't be negative
  // state variable - written to the blockchain. state of blockchain changes whenever this does.
  // public means that we can read this from the task list

  // we can define our own data type with `struct`
  struct Task {
    uint id;
    string content;
    bool completed;
  }

  // this is another state variable
  mapping(uint => Task) public tasks; 
  // mapping is like a hash, store a key/value pair
  // will act like a database for us
  // uint will store the Task 
  // can't just grab them all, you'd have to grab them one by one using the uint

  // how to create an event
  // good to have to know what's happened
  event TaskCreated(uint id, string content, bool completed);

  event TaskUpdated(uint id, string content, bool completed);

  // constructor function: 
  // will be called whenever the smart contract is run for the first time (whenever it's deployed)
  // can add default things to do 
  constructor() public {
    createTask("Do smart contract & solidity tutorial");
  }

  function createTask(string memory _content) public {
    taskCount++;
    tasks[taskCount] = Task(taskCount, _content, false);
    emit TaskCreated(taskCount, _content, false);
  }

  function toggleCompleted(uint _id) public {
    Task memory _task = tasks[_id];
    _task.completed = !_task.completed;
    tasks[_id] = _task;
    emit TaskUpdated(_task.id, _task.content, _task.completed);
  }

}