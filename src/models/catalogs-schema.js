module.exports = (db) =>
  db.model(
    'Catalogs',
    db.Schema({
      name: String,
      description: String,
      price: Number,
    })
  );
