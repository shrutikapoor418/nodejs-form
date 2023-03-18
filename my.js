// // const express=require("express");
// // const bodyParser=require("body-parser");
// // const request=require("request");
// // const https=require("https");
// // const app=express();
// // app.use(express.static("public"));
// // app.use(bodyParser.urlencoded({extended:true}));
// //
// // app.get("/",function(req,res){
// //   res.sendFile(__dirname+"/index.html");
// // });
// // app.post("/",function(req,res){
// // var email=req.body.mail;
// // var passw=req.body.pass;
// // var zipp=req.body.zip;
// // var address=req.body.add;
// // var cityy=req.body.city;
// // //console.log(email+" "+passw+" "+zipp+" "+address+" "+cityy);
// // var data={
// //   members:[
// //     {
// //       email_add:email,
// //       status:"subscribed",
// //       merge_fields:{
// //       EMAIL:email,
// //       PASSWORD:passw
// //       }
// //     }
// //   ]
// // };
// // var jsonData=JSON.stringify(data);
// // const url = "https://us11.api.mailchimp.com/3.0/lists/f867202123/members";
// // const options={
// //   method:"post",
// //   auth:"shrutu:329601ce07cf809a1e4d2264e0e96812-us11"
// // }
// // const request=https.request(url,options,function(response){
// // response.on("data",function(data){
// //   console.log(JSON.parse(data));
// // })
// // })
// // request.write(jsonData);
// // request.end();
// // });
// // app.listen(4000,function(){
// //   console.log("sys running");
// // });
// // // list id
// // //
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(express.static("css"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const email = req.body.mail;
  const passw = req.body.pass;
  const name = req.body.name;
  const quest = req.body.ques;
  // console.log(email + " " + passw + " " + zipp + " " + address + " " + cityy);
  //api key:
  const data = {
    email_address: email,
    status: "subscribed",
    merge_fields: {
      EMAIL: email,
      PASSWORD: passw,
    NAME: name,
      //ADD: address,
      QUESS: quest,
    },
  };
  const jsonData = JSON.stringify(data);

  const url =
    "https://us10.api.mailchimp.com/3.0/lists/be814e9e6d/members/";
  const options = {
    method: "POST",
    auth: "shrutu:973d17756e4ba627e34247e00e6e66dd-us10",
  };

  const request = https.request(url, options, function (response) {
    response.on("data", function (data) {
      console.log(JSON.parse(data));
      if (JSON.parse(data).status === "subscribed") {
        res.sendFile(__dirname + "/success.html");
      } else {
        res.sendFile(__dirname + "/failure.html");
      }
    });
  });

  request.write(jsonData);
  request.end();
});

app.post("/failure", function (req, res) {
  res.redirect("/");
});

app.listen(4002, function () {
  console.log("Server is running on port 4002");
});
