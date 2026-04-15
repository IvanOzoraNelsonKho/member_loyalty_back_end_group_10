const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const config = require('../core/config');
const logger = require('../core/logger')('app');

// Join the database connection string
let connectionString = config.database.connection;
const dbName = config.database.name;

if (connectionString.includes('?')) {
  // Jika ada parameter (tanda tanya), sisipkan nama database sebelum tanda tanya tersebut
  const parts = connectionString.split('?');
  const base = parts[0].endsWith('/') ? parts[0] : `${parts[0]}/`;
  connectionString = `${base}${dbName}?${parts[1]}`;
} else {
  // Jika tidak ada tanda tanya, cukup gabungkan di akhir
  const base = connectionString.endsWith('/')
    ? connectionString
    : `${connectionString}/`;
  connectionString = `${base}${dbName}`;
}

mongoose.connect(connectionString);

const db = mongoose.connection;
db.once('open', () => {
  logger.info('Successfully connected to MongoDB');
});

const dbExports = {};
dbExports.db = db;

const basename = path.basename(__filename);

fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  )
  .forEach((file) => {
    // eslint-disable-next-line import/no-dynamic-require, global-require
    const model = require(path.join(__dirname, file))(mongoose);
    dbExports[model.modelName] = model;
  });

module.exports = dbExports;
