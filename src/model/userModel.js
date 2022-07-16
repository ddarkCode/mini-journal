const { Schema, model } = require('mongoose');

const { journalSchema } = require('./journalModel');

const userSchema = new Schema({
  username: String,
  password: String,
  journals: [journalSchema],
});

module.exports = model('User', userSchema);
