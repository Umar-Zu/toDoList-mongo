import mongoose from 'mongoose';

/**
 * @file Database connection module
 * @module config/db
 * @description Handles the connection to the MongoDB database.
 *
 * This module establishes a connection to the MongoDB database using Mongoose. If the connection is successful,
 * it returns the connection object. If the connection fails, an error is thrown.
 *
 * @async
 * @function connectDB
 * @returns {Promise<mongoose.Connection>} A promise that resolves to the MongoDB connection object.
 * @throws {Error} If the connection to the database fails.
 */
const connectDB = async () => {
  try {
    // const conn = await mongoose.connect(process.env.MONGO_URI, {
    const conn = await mongoose.connect(
      'mongodb://localhost:27017/todolist_db',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
      }
    );
    return conn;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

export default connectDB;
