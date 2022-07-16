const { Schema, model } = require('mongoose');

const journalSchema = new Schema({
  title: String,
  date: String,
  content: String,
});

const Journal = model('Journal', journalSchema);

module.exports = {
  Journal,
  journalSchema,
};
