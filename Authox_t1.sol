pragma solidity ^0.4.18;

contract Authox_t1 {
    
    bool boo = false;
    
    struct User{
        string lastName;
        string firstName ;
        string email;
        string mobileNumber ;
        string  dob ;
        bool isKYCApproved ;
        
        
    }
    
    struct KYCAprroval {
        address user;
        address org ;
        string aprrovalDoneBy;
        string approvalType;
        string approvalInfo;
        string status ;
        
        
        
    }
    struct Org {
        string name ;
        string address1 ;
        string address2 ;
        string city ;
        string state ;
        string country ;
        string website ;
        bool isAdmin ;
        bool isVendor ;
        bool isKycApprovar ;
        
        
        
        
    }
    
    struct UserOrgApproval {
        
        address user  ;
        address org  ;
        bool isApproved ;
        
        
    }
    
    
    mapping(address => User) userMap;
    mapping(address => Org ) orgMap;
    mapping(address => KYCAprroval[]) kycApprovalMap; // approvals will be mapped to user address ..
    mapping(address =>  UserOrgApproval[])userArgApprovalMap; // userOrg Approvals will be mapped to user address 
    
    function stringsEqual(string storage _a, string memory _b) internal view returns (bool) {
        bytes storage a = bytes(_a);
        bytes memory b = bytes(_b);
        if (a.length != b.length)
            return false;
// @todo unroll this loop
        for (uint i = 0; i < a.length; i ++)
        if (a[i] != b[i])
            return false;
            return true;
    }

    function stringsEqual2(string memory _a, string memory _b) internal pure returns (bool) {
        bytes memory a = bytes(_a);
        bytes memory b = bytes(_b);
        if (a.length != b.length)
            return false;
// @todo unroll this loop
        for (uint i = 0; i < a.length; i ++)
        if (a[i] != b[i])
            return false;
            return true;
    }

    

    
    // add org approval 
    
    function AddKYCApproval (
        address userAddress  ,
        address orgAddress ,
        string aprrovalDoneBy  ,
        string approvalType ,
        string approvalInfo ,
        string status 
        
        ) public returns (string ){
            
            kycApprovalMap[userAddress].push(KYCAprroval (userAddress,orgAddress,aprrovalDoneBy,approvalType,approvalInfo,status));
            
            
        }
    
    function GetKYCApprovalLength(address userAddress) public view returns (uint) {
        return(kycApprovalMap[userAddress].length );
        
    }
    function GetKYCApprovalLength(address userAddress,uint index) public view returns (string , string , string , string) {
        KYCAprroval storage kyc= kycApprovalMap[userAddress][index] ;
        return(kyc.aprrovalDoneBy,kyc.approvalType,kyc.approvalInfo,kyc.status );
        
        
    }

    
    // this function will be used by mobile wallet when user is first created 
    // first the user public and private address will be created in wallet 
    // and that created address will be passed on here 
    function AddUser( 
        address userAddress ,
        string lastName ,
        string firstName ,
        string email,
        string mobileNumber ,
        string  dob          
        )public returns(  string) {
            
         
        //userMap[userAddress] =  User(lastName,firstName,email,mobileNumber,dob,false ) ;    
        userMap[userAddress].lastName = lastName;
        userMap[userAddress].firstName = firstName;
        userMap[userAddress].email  = email ;
        userMap[userAddress].mobileNumber = mobileNumber;
        userMap[userAddress].dob  = dob;
        
        
        if(stringsEqual2(lastName,userMap[userAddress].lastName )){
            return "success";    
        } else {
            return "fail";
        }
        
        return "fail" ;
        
    }
    
    // this function will be used by admin pannel to create a new organization
    function AddOrg( 
        address  orgAddress,
        string name ,
        string address1 ,
        string address2 ,
        string city ,
        string state ,
        string country ,
        string website ,
        bool isAdmin ,
        bool isVendor ,
        bool isKycApprovar  
         
        )public returns(  string) {
            
         
        orgMap [orgAddress].name = name ;
        orgMap [orgAddress].address1 = address1 ;
        orgMap [orgAddress].address2 = address2 ;
        orgMap [orgAddress].city = city ;
        orgMap [orgAddress].state  = state ;
        orgMap [orgAddress].country = country ;
        orgMap [orgAddress].website = website ;
        orgMap [orgAddress].isAdmin = isAdmin ;
        orgMap [orgAddress].isVendor = isVendor ;
        orgMap [orgAddress].isKycApprovar = isKycApprovar ;
        

             
        if(stringsEqual2(name,orgMap[orgAddress].name)){
            return "success";    
        } else {
            return "fail";
        }
         
        return "fail";
    }
    function GetUser(address userAddress) public view returns(
        string ,
        string  ,
        string ,
        string  ,
        string   
    
        
        ){
        return (
            userMap[userAddress].lastName,
            userMap[userAddress].firstName ,
            userMap[userAddress].email,
            userMap[userAddress].mobileNumber ,
            userMap[userAddress].dob 
            );
        
    }
    function GetOrgInfo2(address orgAddress )public view returns(
        
        bool ,
        bool ,
        bool 
        )
        {
            return (
                orgMap[orgAddress].isAdmin ,
                orgMap[orgAddress].isVendor ,
                orgMap[orgAddress].isKycApprovar  
        
                );
        }
    
    function GetOrgInfo(address orgAddress) public view returns (
        string ,//name ,
        string,// address1 ,
        string,// address2 ,
        string,// city ,
        string, // state ,
        string ,//country ,
        string //website  
            
        
    ){
          
        return(
            
            orgMap[orgAddress].name ,
            orgMap[orgAddress].address1 ,
            orgMap[orgAddress].address2 ,
            orgMap[orgAddress].city ,
            orgMap[orgAddress].state ,
            orgMap[orgAddress].country ,
            orgMap[orgAddress].website  
            
            
            ) ;
          
    }


    
}

