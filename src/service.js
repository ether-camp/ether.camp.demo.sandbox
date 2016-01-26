define(function() {
  var Web3 = require('web3');
  
  return {
    init: function(username, project) {
      var url = 'https://' + project + '-' + username + '.c9users.io:8081';
      console.log(url);
      this.web3 = new Web3(new Web3.providers.HttpProvider(url));
      return this;
    },
    isConnected: function(cb) {
      this.web3.net.getListening(cb);
    }
  };
});