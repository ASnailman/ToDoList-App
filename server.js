const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        const db = client.db('todolist_app');
        const tasksCollection = db.collection('tasks');

        // API Endpoint to Add Task
        app.post('/add-task', async (req, res) => {
            const task = req.body;
            console.log('Received task:', task);

            try {
                await tasksCollection.insertOne(task);
                console.log('Task successfully added to database');
                res.status(200).send({ message: 'Task added successfully' });
            } catch (error) {
                console.error('Failed to add task:', error);
                res.status(500).send({ error: 'Failed to add task' });
            }
        });

        // Start the server
        app.listen(port, () => {
            console.log(`Server running on http://localhost:${port}`);
        });

    } catch (err) {
        console.error('Failed to connect to MongoDB:', err);
        process.exit(1);
    }
}

run();
