import mongoose from 'mongoose';
import { Schema } from 'mongoose';

/**
/**
 * @file Item schema module
 * @module models/itemSchema
 * @description Defines the structure of an item document in the database.
 *
 * This module defines the schema for an individual item in a to-do list, including properties for the item’s name 
 * and the timestamp of when the item was created.
 * 
 * @typedef {Object} ItemSchema
 * @property {string} name - The name of the item. Required, trimmed, and between 1-200 characters.
 * @property {Date} createdAt - The timestamp when the item was created. Defaults to the current date.
 */
const itemSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Item name is required'],
    trim: true,
    minlength: [1, 'Item name must not be empty'],
    maxlength: [200, 'Item name must not exceed 200 characters'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Item = mongoose.model('Item', itemSchema);
export { itemSchema, Item };
