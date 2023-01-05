const { Schema, model } = require('mongoose');
const modmailSchema = new Schema({
    _id: Schema.Types.ObjectId,
    UserId: String,
    ChannelId: String,
    Reason: String
})

module.exports = model('Ticketcreate', modmailSchema, 'ticketcreate')