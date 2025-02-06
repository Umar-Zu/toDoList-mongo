import app from '../../index.js';
import connectDB from '../config/db.js';

/**
 * @file Server startup module
 * @module server/startServer
 * @description Initializes the server and establishes a connection to the MongoDB database.
 *
 * This module connects to the MongoDB database and starts the Express server on the specified port.
 * If an error occurs during the connection or server startup, the process will terminate.
 */
const startServer = async () => {
  try {
    const conn = await connectDB();
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    app.listen(process.env.PORT || 4000, () => {
      console.log(`Server running on port ${process.env.PORT || 4000}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
};

startServer();
