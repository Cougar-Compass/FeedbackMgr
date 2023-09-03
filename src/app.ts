// src/app.ts
const express = require('express');
const { Client } = require('cassandra-driver');

const app = express();
const port = 3003;

import { Request, Response } from 'express';

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

app.get('/', (re: Request, res: Response) => {
  res.send('Hello world!');
});

// Cassandra Configuration
const client = new Client({
  contactPoints: ['localhost', '172.17.0.2'], 
  localDataCenter: 'datacenter1', 
  keyspace: 'university_of_houston',
});

// Connect to the Cassandra cluster
client.connect()
  .then(() => {
    console.log('Connected to Cassandra cluster');
  })
  .catch((err: Error) => {
    console.error('Error connecting to Cassandra:', err);
  });

  