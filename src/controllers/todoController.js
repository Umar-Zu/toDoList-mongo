import { Item } from '../models/itemSchema.js';
import List from '../models/listSchema.js';
import _ from 'lodash';
import { getLocalDate } from '../utils/dateUtils.js';

/**
 * Creates default items in the to-do list if no items already exist in the database.
 *
 * This function checks if there are any existing items in the `Item` collection. If no items are found,
 * it adds a set of default items to the collection.
 *
 * @async
 * @function createDefaultItems
 * @returns {Promise<Object[]>} A promise that resolves to an array of the default items.
 * @throws {Error} If an error occurs during the database operation.
 */
export const createDefaultItems = async () => {
  const defaultItems = [
    { name: 'Welcome to your todolist!' },
    { name: 'Hit the + to add a new item' },
    { name: '<-- Hit this to delete an item' },
  ];

  try {
    const existingItems = await Item.find();
    if (existingItems.length === 0) {
      await Item.insertMany(defaultItems);
      console.log('Default items added to database!');
    }
    return defaultItems;
  } catch (error) {
    console.error('Error creating default items:', error);
    throw error;
  }
};

/**
 * Handle GET request to render the home page with items from the current date list.
 * If no items are found, create default items and redirect to the home page.
 * @returns {render} Renders 'list' view with current date title and list of found items.
 * @throws {Error} Throws an error if there's an issue fetching items or rendering the view.
 */
export const getHomeItems = async (req, res) => {
  try {
    const foundItems = await Item.find().sort({ createdAt: -1 });

    if (foundItems.length === 0) {
      await createDefaultItems();
      return res.redirect('/');
    }

    res.render('list', {
      currentTitle: getLocalDate(),
      newListItems: foundItems,
    });
  } catch (error) {
    console.error('Error getting home items:', error);
    res.status(500).send('Error loading items');
  }
};

/**
 * Handle GET request for custom list creation or retrieval.
 * @param {string} req.params.customNewList - The name of the custom list to create or retrieve.
 * @returns {render} Renders 'list' view with currentTitle and newListItems.
 * @throws {Error} Throws error if database operation fails or invalid input.
 */
export const getCustomList = async (req, res) => {
  try {
    const customListName = _.capitalize(req.params.customNewList);
    const defaultItems = await createDefaultItems();

    const foundList = await List.findOneAndUpdate(
      { name: customListName },
      { $setOnInsert: { name: customListName, items: defaultItems } },
      { new: true, upsert: true }
    );

    res.render('list', {
      currentTitle: foundList.name,
      newListItems: foundList.items,
    });
  } catch (error) {
    console.error('Error in custom list:', error);
    res.status(500).send('Error loading custom list');
  }
};

/**
 * Handle POST request to add an item to a list or create a new list if necessary.
 * @param {string} req.body.newItem - The name of the new item to add.
 * @param {string} req.body.list - The name of the list to which the item should be added.
 * @returns {redirect} Redirects to the home page or the specific list page after adding the item.
 * @throws {Error} Throws an error if the item cannot be added to the list or if there's a server error.
 */
export const addItem = async (req, res) => {
  const { newItem: itemName, list: listName } = req.body;

  if (!itemName?.trim()) {
    return res.status(400).send('Item name is required');
  }

  const item = new Item({ name: itemName });

  try {
    if (listName === getLocalDate()) {
      await item.save();
      res.redirect('/');
    } else {
      const foundList = await List.findOne({ name: listName });
      if (!foundList) {
        return res.status(404).send('List not found');
      }
      foundList.items.push(item);
      await foundList.save();
      res.redirect('/' + listName);
    }
  } catch (error) {
    console.error('Error adding item:', error);
    res.status(500).send('Error adding item');
  }
};

/**
 * Handle POST request to edit an item's name in a specified list or the current date list.
 * @param {string} req.body.updatedItemId - The ID of the item to update.
 * @param {string} req.body.updatedItemTitle - The new name/title for the updated item.
 * @param {string} req.body.customeListName - The name of the list in which the item exists.
 * @returns {redirect} Redirects to the home page or the specific list page after editing the item.
 * @throws {Error} Throws an error if the item cannot be updated or if there's a server error.
 */
export const editItem = async (req, res) => {
  const {
    updatedItemId,
    updatedItemTitle: newInput,
    customeListName: listName,
  } = req.body;

  if (!updatedItemId || !newInput?.trim()) {
    return res.status(400).send('Item ID and new title are required');
  }

  try {
    // Handling the Default List
    if (listName === getLocalDate()) {
      await Item.findByIdAndUpdate(updatedItemId, { name: newInput });
      res.redirect('/');
    }
    // Handling Custom Lists
    else {
      await List.findOneAndUpdate(
        { name: listName, 'items._id': updatedItemId },
        { $set: { 'items.$.name': newInput } }
      );
      res.redirect('/' + listName);
    }
  } catch (error) {
    console.error('Error editing item:', error);
    res.status(500).send('Error editing item');
  }
};

/**
 * Handle POST request to delete an item from a specified list or the current date list.
 * @param {string} req.body.listName - The name of the list from which the item should be deleted.
 * @param {string} req.body.checkbox - The ID of the item to delete.
 * @returns {redirect} Redirects to the home page or the specific list page after deleting the item.
 * @throws {Error} Throws an error if the item cannot be deleted or if there's a server error.
 */
export const deleteItem = async (req, res) => {
  const { listName: checkedListName, checkbox: checkedItemId } = req.body;

  try {
    if (checkedListName === getLocalDate()) {
      await Item.findByIdAndDelete(checkedItemId);
      res.redirect('/');
    } else {
      await List.findOneAndUpdate(
        { name: checkedListName },
        { $pull: { items: { _id: checkedItemId } } }
      );
      res.redirect('/' + checkedListName);
    }
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).send('Error deleting item');
  }
};
