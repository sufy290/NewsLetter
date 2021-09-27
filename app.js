const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { url } = require("inspector");

const app = express();

app.use(express.static("public"));//this is for using css and image on the server.
app.use(bodyParser.urlencoded({extended: true}));
app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html")
});

app.post("/",function(req,res)
{

        var firstName = req.body.fname;
        var lastName = req.body.lname;
        var email = req.body.email;

        //console.log(firstName, lastName, email );

        var data = {
            members:[
                {
                    email_address : email,
                    status : "subscribed",
                    merge_fields:{
                        FNAME: firstName,
                        LNAME: lastName
                    }
                }
            ]
        };

        var jsonData = JSON.stringify(data);

        const url = "https://us5.api.mailchimp.com/3.0/lists/00f466d08b"
       
        const Options = {
            method:"POST",
            auth: "Sufya1:decd63473c3d24293018ddf49d4099a4-us5"
        }

        const request = https.request(url,Options,function(response){

            if(response.statusCode === 200){
                res.sendFile(__dirname + "/success.html")
            }else{
                res.sendFile(__dirname + "/failure.html")
            }
            response.on("data",function(data){
                console.log(JSON.parse(data));
            })

        })

      request.write(jsonData);
      request.end();
});



app.post("/failure",function(req,res){
    res.redirect("/");
});

app.listen(process.env.PORT || 3000,function(req,res){
    console.log("Server is running on Port 3000");
});  

//Api key
//decd63473c3d24293018ddf49d4099a4-us5

//list Id
//00f466d08b