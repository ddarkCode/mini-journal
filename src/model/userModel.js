const { Schema, model } = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const { journalSchema } = require('./journalModel');

const userSchema = new Schema({
  username: String,
  password: String,
  journals: [journalSchema],
  googleId: String,
  googleProfile: Object,
});

userSchema.plugin(findOrCreate);

module.exports = model('User', userSchema);
