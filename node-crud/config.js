const path = require('path');
const basePath = path.join(__dirname, '.');

module.exports = {
  basePath,
  dbUrl: 'mongodb://localhost:27017',
  dbName: 'crudDemo'
};
