module.exports = (db) =>
  db.model(
    'Outlet',
    db.Schema({
      name: String,
      location: String,
      description: String,
    })
  );