const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    telegramId: {
        type: String,
        required: true,
    },
    username: {
        type: String,
    },
    religion: {
        type: String,
    },
    position: {
        type: String,
    },
});

module.exports = mongoose.model('User', UserSchema);