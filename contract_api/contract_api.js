var express = require("express");
var app = express();

//var KYC = require("./contract_server.js");
var router = express.Router();

var Web3 = require('web3');

if (typeof web3 !== 'undefined') {
           var web3 = new Web3(web3.currentProvider);
        } else {
            // set the provider you want from Web3.providers
           var web3 = new Web3(new Web3.providers.HttpProvider("http://54.205.136.66:8545/"));
        }


        var walletAddress = web3.eth.accounts[0];
        var contractAddress = "0xbF02eAfF32F0078CDc0F6893a7Bf85aFfE3D9674";


        web3.eth.defaultAccount = walletAddress;


        var KYC_Contract = web3.eth.contract([ { "constant": false, "inputs": [ { "name": "orgAddress", "type": "address" }, { "name": "name", "type": "string" }, { "name": "address1", "type": "string" }, { "name": "address2", "type": "string" }, { "name": "city", "type": "string" }, { "name": "state", "type": "string" }, { "name": "country", "type": "string" }, { "name": "website", "type": "string" }, { "name": "isAdmin", "type": "bool" }, { "name": "isVendor", "type": "bool" }, { "name": "isKycApprovar", "type": "bool" } ], "name": "AddOrg", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "userAddress", "type": "address" }, { "name": "lastName", "type": "string" }, { "name": "firstName", "type": "string" }, { "name": "email", "type": "string" }, { "name": "mobileNumber", "type": "string" }, { "name": "dob", "type": "string" } ], "name": "AddUser", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "userAddress", "type": "address" }, { "name": "orgAddress", "type": "address" } ], "name": "GetUser", "outputs": [ { "name": "lastName", "type": "string", "value": "null" }, { "name": "firstName", "type": "string", "value": "null" }, { "name": "email", "type": "string", "value": "null" }, { "name": "mobileNumber", "type": "string", "value": "null" }, { "name": "dob", "type": "string", "value": "null" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "userAddress", "type": "address" }, { "name": "orgAddress", "type": "address" }, { "name": "aprrovalDoneBy", "type": "string" }, { "name": "approvalType", "type": "string" }, { "name": "approvalInfo", "type": "string" }, { "name": "status", "type": "string" } ], "name": "AddKYCApproval", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "userAddress", "type": "address" } ], "name": "GetUserOrgApprovalMapping", "outputs": [ { "name": "approvedOrgList", "type": "address[]", "value": [] } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "userAddress", "type": "address" }, { "name": "orgAddress", "type": "address" } ], "name": "AddUserOrgApproval", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "orgAddress", "type": "address" } ], "name": "GetOrgInfo2", "outputs": [ { "name": "isAdmin", "type": "bool", "value": false }, { "name": "isVendor", "type": "bool", "value": false }, { "name": "isKycApprovar", "type": "bool", "value": false } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "userAddress", "type": "address" } ], "name": "GetKYCApprovalLength", "outputs": [ { "name": "", "type": "uint256", "value": "0" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "orgAddress", "type": "address" }, { "name": "userAddress", "type": "address" }, { "name": "status", "type": "string" } ], "name": "ChangeKYCApprovalStatus", "outputs": [ { "name": "isChanged", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "userAddress", "type": "address" }, { "name": "orgAddress", "type": "address" } ], "name": "IsOrgApproved", "outputs": [ { "name": "isApproved", "type": "bool", "value": false } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "userAddress", "type": "address" }, { "name": "index", "type": "uint256" } ], "name": "GetKYCApproval", "outputs": [ { "name": "aprrovalDoneBy", "type": "string" }, { "name": "approvalType", "type": "string" }, { "name": "approvalInfo", "type": "string" }, { "name": "status", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "orgAddress", "type": "address" } ], "name": "GetOrgInfo", "outputs": [ { "name": "name", "type": "string", "value": "" }, { "name": "address1", "type": "string", "value": "" }, { "name": "address2", "type": "string", "value": "" }, { "name": "city", "type": "string", "value": "" }, { "name": "state", "type": "string", "value": "" }, { "name": "country", "type": "string", "value": "" }, { "name": "website", "type": "string", "value": "" } ], "payable": false, "stateMutability": "view", "type": "function" } ]);

        var contract = KYC_Contract.at(contractAddress);
        //console.log(contract);

            



         //Contract methods

                app.get('/AddUserOrgApproval/:userAddress/:orgAddress', function(req, res) {
                    

                    unlockAccount();


                    var getData = contract.AddUserOrgApproval.getData(req.params.userAddress,req.params.orgAddress);
                    
                    var gasNeeded = contract.AddUserOrgApproval.estimateGas(req.params.userAddress,req.params.orgAddress,
                     { from: walletAddress });


                    var trxAddr = web3.eth.sendTransaction({to:contractAddress, from:walletAddress, data: getData, 
                        gas: gasNeeded, gasPrice: "180000000000"},function(error,result){
                            if(error){
                                res.send(error);
                            }
                            else{
                                res.send(result);
                            }
                        });


                });



                app.get('/GetUserOrgApprovalMapping/:userAddress', function(req, res){

                    contract.GetUserOrgApprovalMapping(req.params.userAddress,function(error,result){
                        if(error){
                            res.send(error);
                        }   
                        else{
                            res.send(result);
                        }
                    });

                });


                app.get('/AddKYCApproval/:userAddress/:orgAddress/:approvalDoneBy/:approvalType/:approvalInfo/:status', function(req, res) {
                    

                    unlockAccount();


                    var getData = contract.AddKYCApproval.getData(req.params.userAddress,req.params.orgAddress,
                        req.params.approvalDoneBy,req.params.approvalType,req.params.approvalInfo,req.params.status);
                    
                    var gasNeeded = contract.AddKYCApproval.estimateGas(req.params.userAddress,req.params.orgAddress,
                        req.params.approvalDoneBy,req.params.approvalType,req.params.approvalInfo,req.params.status,
                     { from: walletAddress });


                    var trxAddr = web3.eth.sendTransaction({to:contractAddress, from:walletAddress, data: getData, 
                        gas: gasNeeded, gasPrice: "180000000000"},function(error,result){
                            if(error){
                                res.send(error);
                            }
                            else{
                                res.send(result);
                            }
                        });

                    
                });



                app.get('/GetKYCApprovalLength/:userAddress',function(req,res){
                    


                    contract.GetKYCApprovalLength(req.params.userAddress,function(error,result){
                        if(error){
                            res.send(error);
                        }   
                        else{
                            res.send(result);
                        }
                    });


                });



                app.get('/GetKYCApprovalLength/:userAddress/:index',function(req,res){

                    
                    contract.GetKYCApprovalLength(req.params.userAddress, req.params.index, function(error,result){
                        if(error){
                            res.send(error);
                        }   
                        else{
                            res.send(result);
                        }
                    });


                    

                });


                app.get('/ChangeKYCApprovalStatus/:orgAddress/:userAddress/:status',function(req,res){

                    unlockAccount();


                    var getData = contract.ChangeKYCApprovalStatus.getData(req.params.orgAddress, req.params.userAddress, req.params.status);
                    
                    var gasNeeded = contract.ChangeKYCApprovalStatus.estimateGas(req.params.orgAddress, req.params.userAddress, req.params.status,
                     { from: walletAddress });


                    var trxAddr = web3.eth.sendTransaction({to:contractAddress, from:walletAddress, data: getData, 
                        gas: gasNeeded, gasPrice: "180000000000"},function(error,result){
                            if(error){
                                res.send(error);
                            }
                            else{
                                res.send(result);
                            }
                        });



                });



                app.get('/AddUser/:userAddress/:lastname/:firstName/:email/:mobileNumber/:dob',function(req,res){

                    unlockAccount();


                    var getData = contract.AddUser.getData(req.params.userAddress,
                        req.params.lname,req.params.fname,req.params.email,req.params.mno,req.params.dob);
                    
                    var gasNeeded = contract.AddUser.estimateGas(req.params.userAddress,
                        req.params.lname,req.params.fname,req.params.email,req.params.mno,req.params.dob, { from: walletAddress });


                    var trxAddr = web3.eth.sendTransaction({to:contractAddress, from:walletAddress, data: getData, 
                        gas: gasNeeded, gasPrice: "180000000000"},function(error,result){
                            if(error){
                                res.send(error);
                            }
                            else{
                                res.send(result);
                            }
                        });

                    
                
                });




                app.get('/AddOrg/:orgAddress/:name/:address1/:address2/:city/:state/:country/:website/:isAdmin/:isVendor/:isKycApprovar',function(req,res){

                    
                    unlockAccount();


                    var getData = contract.AddOrg.getData(req.params.orgAddress,req.params.name,
                        req.params.address1,req.params.address2,req.params.city,req.params.state,
                        req.params.country,req.params.website,req.params.isAdmin,req.params.isVendor,
                        req.params.isKycApprovar);
                    
                    var gasNeeded = contract.AddOrg.estimateGas(req.params.orgAddress,req.params.name,
                        req.params.address1,req.params.address2,req.params.city,req.params.state,
                        req.params.country,req.params.website,req.params.isAdmin,req.params.isVendor,
                        req.params.isKycApprovar, { from: walletAddress });


                    var trxAddr = web3.eth.sendTransaction({to:contractAddress, from:walletAddress, data: getData, 
                        gas: gasNeeded, gasPrice: "180000000000"},function(error,result){
                            if(error){
                                res.send(error);
                            }
                            else{
                                res.send(result);
                            }
                        });

                });             




                app.get('/GetUser/:userAddress/:orgAddress',function(req,res){

                    
                    contract.GetUser(req.params.userAddress, req.params.orgAddress, function(error,result){
                        if(error){
                            res.send(error);
                        }   
                        else{
                            res.send(result);
                        }
                    });       

                });     




                app.get('/GetOrgInfo2/:orgAddress',function(req,res){


                    contract.GetOrgInfo2(req.params.orgAddress, function(error,result){
                        if(error){
                            res.send(error);
                        }   
                        else{
                            res.send(result);
                        }
                    });    

                });




                app.get('/GetOrgInfo/:orgAddress',function(req,res){

                    contract.GetOrgInfo(req.params.orgAddress, function(error,result){
                        if(error){
                            res.send(error);
                        }   
                        else{
                            res.send(result);
                        }
                    });

                });



                app.get('/IsOrgApproved/:userAddress/:orgAddress',function(req,res){


                    contract.IsOrgApproved(req.params.userAddress, req.params.orgAddress, function(error,result){
                        if(error){
                            res.send(error);
                        }   
                        else{
                            res.send(result);
                        }
                    });
                    

                });

                

                // Tell express to use this router with /api before.
                // You can put just '/' if you don't want any sub path before routes.

                

                // Listen to this Port

                app.listen(3500,function(){
                  console.log("Live at Port 3500");
                });

function unlockAccount(){
        web3.personal.unlockAccount(walletAddress,"vasainc..");
    }
