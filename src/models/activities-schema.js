module.exports = (db) =>
  db.model(
    'Activities',
    db.Schema({
      title: String,
      points: Number,
      description: String,
      date: {
        type: Date,
        default: Date.now,
      },
    })
  );
