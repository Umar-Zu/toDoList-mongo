import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { itemSchema } from './itemSchema.js';

/**
 * @file List schema module
 * @module models/listSchema
 * @description Defines the structure of a list document in the database.
 *
 * This module defines the schema for a to-do list, including properties for the list's name, items,
 * and the timestamp of when the list was created.
 *
 * @typedef {Object} ListSchema
 * @property {string} name - The name of the list. Required, trimmed, and between 1-50 characters.
 * @property {Array<Object>} items - An array of items in the list, defined using the itemSchema.
 * @property {Date} createdAt - The timestamp when the list was created. Defaults to the current date.
 */
const listSchema = new Schema({
  name: {
    type: String,
    required: [true, 'List name is required'],
    trim: true,
    minlength: [1, 'List name must not be empty'],
    maxlength: [50, 'List name must not exceed 50 characters'],
  },
  items: [itemSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const List = mongoose.model('List', listSchema);
export default List;
