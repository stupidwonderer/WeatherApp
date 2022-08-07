const express= require('express');
const app= express();
const https= require('https');
const bodyParser= require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req,res){
   res.sendFile(__dirname+"/index.html");
   

})

/

app.post("/",function(req,res){
console.log(req.body.place);
query=req.body.place;
const url1="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=b8989c3114db5ec7c48ab1f5d79e9116";
https.get(url1,function(response){
    console.log(response.statusCode);
    response.on("data",function(data){
        const weatherdata= JSON.parse(data);
        const temp=weatherdata.main.temp;
        const desp= weatherdata.weather[0].description;
        const iconname =weatherdata.weather[0].icon;
        const imageurl= ("http://openweathermap.org/img/wn/"+iconname+"@2x.png");
        res.write("<h1>the Temprature in  "+query+ " is "+temp+" K</h1> <br><h1>it seems  "+desp+" there </h1>.");
        res.write("<img src="+imageurl+">")
        res.send();
    })
})
})


app.listen(3000 , function(){
    console.log("Server started At port 3000");
})