const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const findOrCreate = require('mongoose-findorcreate');

const pinterestSchema = new Schema({
        pinterestId: String
        // username: String,
        // bio: String,
        // first_name: String,
        // last_name: String,
        // url: String,
        // created_at: String,
        // image: [{}]
});

pinterestSchema.plugin(findOrCreate);
pinterestSchema.set('timestamps', true);

const Pinterest = mongoose.model('Pinterest', pinterestSchema);
module.exports = Pinterest;
