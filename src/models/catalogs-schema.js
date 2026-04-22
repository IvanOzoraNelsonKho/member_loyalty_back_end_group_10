module.exports = (db) =>
  db.model(
    'Catalogs',
    db.Schema(
      {
        name: { type: String, required: true },
        description: String,
        price: { type: Number, required: true },
        options: {
          ice: {
            type: [String],
            default: ['normal ice', 'no ice', 'less ice'],
          },
          sugar: {
            type: [String],
            default: ['normal sugar', 'less sugar', 'extra sugar'],
          },
          temperature: {
            type: [String],
            default: ['Cold', 'Hot'],
          },
          size: {
            type: [String],
            default: ['Large', 'Regular', 'Small'],
          },
        },
        isActive: {
          type: Boolean,
          default: true,
        },
      },
      { timestamps: true }
    )
  );
