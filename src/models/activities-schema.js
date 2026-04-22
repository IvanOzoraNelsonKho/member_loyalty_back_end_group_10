module.exports = (db) =>
  db.model(
    'Activities',
    db.Schema(
      {
        userId: {
          type: db.Schema.Types.ObjectId,
          ref: 'Users',
          required: true,
        },
        title: { type: String, required: true },
        points: { type: Number, required: true },
        description: String,
        date: {
          type: Date,
          default: Date.now,
        },
      },
      { timestamps: true }
    )
  );
