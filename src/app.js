const App = {
  loading: false,
  contracts: {},
  load: async () => {
    await App.loadWeb3();
    await App.loadAccount();
    await App.loadContract();
    await App.render();
  },
  // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
  loadWeb3: async () => {
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      window.alert('Please connect to Metamask.');
    }
    // Modern dapp browsers...
    if (window.ethereum) {
      window.web3 = new Web3(ethereum);
      try {
        // Request account access if needed
        await ethereum.enable();
        // Acccounts now exposed
        web3.eth.sendTransaction({
          /* ... */
        });
      } catch (error) {
        // User denied account access...
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = web3.currentProvider;
      window.web3 = new Web3(web3.currentProvider);
      // Acccounts always exposed
      web3.eth.sendTransaction({
        /* ... */
      });
    }
    // Non-dapp browsers...
    else {
      console.log(
        'Non-Ethereum browser detected. You should consider trying MetaMask!'
      );
    }
  },

  loadAccount: async () => {
    // set the current blockchain account
    App.account = (await web3.eth.getAccounts())[0];
  },

  loadContract: async () => {
    // create a javascript version of the smart contract
    const todoList = await $.getJSON('TodoList.json');
    App.contracts.TodoList = TruffleContract(todoList);
    App.contracts.TodoList.setProvider(App.web3Provider);

    // hydrate the smart contract with values from the blockchain
    // (same as the console)
    App.todoList = await App.contracts.TodoList.deployed();
  },

  render: async () => {
    // Prevent double render
    if (App.loading) {
      return;
    }

    App.setLoading(true);

    // render account
    $('#account').html(App.account);
    await App.renderTasks();

    App.setLoading(false);
  },

  renderTasks: async () => {
    // Load total task count from the block chain
    const taskCount = await App.todoList.taskCount();
    const $taskTemplate = $('.taskTemplate');

    // Render out each task with a new task template
    for (let i = 1; i <= taskCount; i++) {
      const task = await App.todoList.tasks(i);
      const { id, content, completed } = task;
      const taskId = id.toNumber();

      const $newTaskTemplate = $taskTemplate.clone();
      $newTaskTemplate.find('.content').html(content);
      $newTaskTemplate
        .find('input')
        .prop('name', taskId)
        .prop('checked', completed);
      // .on('click', App.toggleCompleted);

      if (completed) {
        $('#completedTaskList').append($newTaskTemplate);
      } else {
        $('#taskList').append($newTaskTemplate);
      }

      $newTaskTemplate.show();
    }
  },

  setLoading: boolean => {
    App.loading = boolean;
    const loader = $('#loader');
    const content = $('#content');
    if (boolean) {
      loader.show();
      content.hide();
    } else {
      loader.hide();
      content.show();
    }
  },
};

$(() => {
  $(window).load(() => {
    App.load();
  });
});
