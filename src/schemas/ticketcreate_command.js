const { Schema, model } = require('mongoose');
const modmailSchema = new Schema({
    UserId: String,
    ChannelId: String,
    Reason: String
})

module.exports = model('Ticketcreate', modmailSchema, 'ticketcreate')