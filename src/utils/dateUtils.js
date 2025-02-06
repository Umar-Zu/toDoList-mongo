/**
 * @file Date formatting module
 * @module utils/dateFormatter
 * @description Provides a function to return the current date formatted according to the specified locale and options.
 *
 * This module includes a utility function to format the current date as a string, taking into account
 * the desired locale and formatting options.
 *
 * @function getLocalDate
 * @returns {string} The formatted date string.
 */
export const getLocalDate = (
  locale = 'en-US',
  options = { weekday: 'long', month: 'long', day: 'numeric' }
) => {
  return new Date().toLocaleDateString(locale, options);
};
