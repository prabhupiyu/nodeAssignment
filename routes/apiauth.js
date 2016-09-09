var express = require('express');
var router = express.Router();
var unirest = require('unirest');
var encode={};
var myobject1={};
var getencode={};
var myobject2={};
var searchen={};
/* GET home page. */
router.get('/', function(req, res, next) {
 
    res.render('login', { title: 'Express' });
    
});



var token=function(){
 
     console.log("encoded value: "+encode.encodedValue);
    console.log("encoded value: "+encode.status);
    
   
 };   



router.post('/',function(req,res) {
         
        var api='http://oimps2-dev-rhel6:8080/idaas-oim-service-11g-R2-PS2/oig/v1/users/login';
    
    unirest.post(api)
.headers({'Accept': 'application/json', 'content-type': 'application/x-www-form-urlencoded'})
.send({ "username": req.body.username, "password": req.body.password})
.end(function (response) {
  console.log(response.body);
        encode=response.body;
        token();
        
        if(encode.status=='Success')
        {
            console.log("login successful");
            res.render('main',{myobject1:encode});
        }
        if(encode.status=='Failure')
        {
            console.log("login unsuccessful");
            res.render('login');
        }
        
});
   
     
    });


router.get('/getall',function(req,res){

 var api='http://oimps2-dev-rhel6:8080/idaas-oim-service-11g-R2-PS2/oig/v1/users';
     console.log("\n\nHiii Siddhi");
    
          unirest.get(api)
.headers({'Accept': 'application/json', 'content-type': 'application/x-www-form-urlencoded', "Authorization": encode.encodedValue})
.send()
.end(function (response) {
  console.log(response.body);
        getencode=response.body;
       // token();
        
        if(getencode.status=='Success')
        {
            console.log("getall successful");
            res.render('ops',{myobject2:getencode});
        }
        if(getencode.status=='Failure')
        {
            console.log("action unsuccessful");
            res.render('main',{myobject1:encode} );
        }        
              
}); 
    
  
    
});


router.post('/search', function(req,res){
        
    console.log(req.body);
    var nm=req.body.dispnm.split(" ");
     console.log(nm);
     var api='http://oimps2-dev-rhel6:8080/idaas-oim-service-11g-R2-PS2/oig/v1/users';
   
    
          unirest.get(api)
.headers({'Accept': 'application/json', 'content-type': 'application/x-www-form-urlencoded', "Authorization": encode.encodedValue})
.send()
.query({"filter": "displayName eq "+nm[0]+"::"+nm[1]})
.end(function (response) {
  console.log(response.body);
           
           searchen=response.body;
              
               if(getencode.status=='Success')
        {
            console.log("serach successful");
            res.render('ops',{myobject2:searchen});
        }
        if(getencode.status=='Failure')
        {
            console.log("serach unsuccessful");
            res.render('main',{myobject1:encode} );
        }   
              
}); 
    
  
            });



router.post('/logout',function(req,res){
    
      var api='http://oimps2-dev-rhel6:8080/idaas-oim-service-11g-R2-PS2/oig/v1/users/logout';
          unirest.post(api)
.headers({'Accept': 'application/json', 'content-type': 'application/x-www-form-urlencoded', "Authorization": encode.encodedValue})
.send()
.end(function (response) {
  console.log(response.body);
              
              if(response.body.status=="Success")
              {
                  res.render('login')
              }
              
              if(response.body.status=="Failure")
              {
                  res.render('ops')
              }
              
              
}); 
 
    
});
module.exports = router;