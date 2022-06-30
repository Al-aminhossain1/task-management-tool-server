const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, MongoRuntimeError } = require('mongodb');
const cors = require('cors');
require('dotenv').config()

// use middleware

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lz3yk.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        await client.connect()
        const taskCollection = client.db("task-management").collection('tasks');
        console.log('database connected');

        // Post Task
        app.post('/task', async (req, res) => {
            const task = req.body;
            const result = await taskCollection.insertOne(task);
            res.send(result);
        })
        // Get Task
        app.get('/task', async (req, res) => {
            const query = {};
            const cursor = await taskCollection.find(query).toArray();
            res.send(cursor);
        })
    }
    finally {

    }
}
run().catch(console.dir);
app.get('/', (req, res) => {
    res.send('Task management tool server is running and work it');
});
app.listen(port, (req, res) => {
    console.log('server is running');
})