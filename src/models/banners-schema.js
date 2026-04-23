module.exports = (db) =>
  db.model(
    'Banners',
    db.Schema(
      {
        title: { type: String, required: true },
        image: { type: String, required: true },
        description: { type: String, default: '' },
        isActive: { type: Boolean, default: true },
      },
      { timestamps: true }
    )
  );
