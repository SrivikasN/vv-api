const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const client = new MongoClient(
    process.env.MONGODB_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverApi: ServerApiVersion.v1
    }
);


app.get("/family", (req, res, next) => {
    const members = [];
    client.connect(err => {
        client.db("vamsavriksham")
            .collection("members")
            .find()
            .toArray((err, doc) => {
                if (err) throw err;
                client.close();
                res.json(doc.map(x => x.name));
            });
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});