const express = require("express");
const { cp } = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

async function main(){
}

main().catch(console.error);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.static("style"));
app.use(bodyParser.urlencoded());

app.post("/", (req, res) =>{
    const data = req.body;
    const city = data.city;
    const url_api = `http://api.weatherapi.com/v1/current.json?key=9337151fc0db43a6ab025541223105&q=${city}&aqi=no`;
    fetch(url_api)
        .then(res => res.json())
        .then(data => {
            res.render("index", {
                city: data.location.name,
                region: data.location.region,
                temp: data.current.temp_f,
                precipitation: data.current.precip_in,
                condition: data.current.condition.text,
            });
        });
})

app.get("/*", (req, res) => {
    res.render("index", {
    });
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})
