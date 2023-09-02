// src/app.ts
const express = require('express');
const { Client } = require('cassandra-driver');

const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});


// Cassandra Configuration
const cassandraClient = new Client({
  contactPoints: ['localhost'], // Change this to your Cassandra cluster contact points
  localDataCenter: 'datacenter1', // Change this to your data center
  keyspace: 'your_keyspace', // Change this to your keyspace
});

// Connect to Cassandra
cassandraClient.connect()
  .then(() => {
    console.log('Connected to Cassandra');

    // Start your Express routes here
    app.get('/', (req, res) => {
      // Example route
      res.send('Hello, Cassandra!');
    });

    // Listen on the specified port
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to Cassandra:', error);
  });

// Gracefully shut down the Cassandra connection when the application exits
process.on('SIGINT', () => {
  cassandraClient.shutdown()
    .then(() => {
      console.log('Cassandra connection closed.');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Error closing Cassandra connection:', error);
      process.exit(1);
    });
});