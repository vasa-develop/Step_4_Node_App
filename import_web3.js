var Web3 = require('web3');


if (typeof web3 !== 'undefined') {
           var web3 = new Web3(web3.currentProvider);
        } else {
            // set the provider you want from Web3.providers
           var web3 = new Web3(new Web3.providers.HttpProvider("http://54.205.136.66:8545/"));
        }
module.exports = web3;