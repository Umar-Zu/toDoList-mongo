import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

/**
 * @file Path configuration module
 * @module config/paths
 * @description Centralized directory path configuration for the application
 *
 * This module dynamically determines important project directories, ensuring
 * that paths are correctly resolved across the application.
 */

const currentDir = dirname(fileURLToPath(import.meta.url));
const rootDir = join(currentDir, '../..');
const srcDir = join(rootDir, 'src');
const publicDir = join(rootDir, 'public');

export const paths = {
  root: rootDir,
  public: publicDir,
  src: srcDir,
  views: join(rootDir, 'src', 'views'),
};
