const { Schema, model } = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');
const passportLocalMongoose = require('passport-local-mongoose');

const { journalSchema } = require('./journalModel');

const userSchema = new Schema({
  username: String,
  password: String,
  journals: [journalSchema],
  googleId: String,
  googleProfile: Object,
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

module.exports = model('User', userSchema);
