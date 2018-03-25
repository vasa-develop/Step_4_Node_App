var http = require('http');
var express = require("express");
var app = express();
var url = require("url");





 app.get('/user/:user1/:user2', function(req, res) {

 	var data = {
                        "AddKYCApproval": {
                            "user1": req.params.userAddress,
                            "user2": req.params.orgAddress,
                            "approvalDoneBy": req.params.approvalDoneBy,
                            "approvalType": req.params.approvalType,
                            "approvalInfo": req.params.approvalInfo
                        }
                    };

   console.log(data.AddKYCApproval.user1);
   console.log(data.AddKYCApproval.user2);
});  

app.listen(8080, () => console.log('Example app listening on port 8080!'));