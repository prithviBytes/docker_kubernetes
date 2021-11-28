const express = require('express');
const redis = require('redis');

const app = express();
const client = redis.createClient();
client.set('visits', 0);


app.get("/", (req, res) => {
    client.get('visits', (err, visits) => {
        res.send(`Number of Visits: ${visits}`)
        client.set('visits', parseInt(visits) + 1)
    })
})

app.listen(8081, () => {
    console.log("App started at 8081")
})