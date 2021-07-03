### CLI Commands

- `truffle compile` will create a build folder and create json files of the contracts

- `truffle migrate` will run the migrations / smart contracts

- `truffle console` to run the cli to check the smart contract that we've deployed to the blockchain
  retrieve smart contract like this:
  `todoList = await TodoList.deployed()`
  `TodoList` is the name of the smart contract, and we're grabbing the deployed version
  we have saved it to the variable `todoList`
  we have to interact with the blockchain asynchronously
  running `todoList` will now show the smart contract
  can treat `todoList` like an object, eg. `todoList.address`

- to grab the state, you have to invoke it, ie. `todoList.taskCount()`
