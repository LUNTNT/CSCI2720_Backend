const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EventSchema = mongoose.Schema({
    id : {type: Number, required: true , unique: true},
    titlee: { type: String, required: true },
    predateE: { type: String},
    progtimee: { type: String},
    venueid: { type: Schema.Types.ObjectId, ref: 'project_venues', required: true },
    pricee: { type: String},
    desce: { type: String},
    urle: { type: String},
    remarke: { type: String},
    enquiry: { type: String},
    presenterorge: { type: String},
});
const Event = mongoose.model('project_events', EventSchema);

const VenueSchema = mongoose.Schema({
    id : {type: Number, required: true , unique: true},
    venuec: { type: String},
    venuee: { type: String, required: true },
    latitude: { type: String},
    longitude: { type: String},
});
const Venue = mongoose.model('project_venues', VenueSchema);

const UserSchema = mongoose.Schema({
    id : {type: Number, required: true , unique: true},
    username: {type: String, required: true , unique: true},
    password: { type: String, required: true },
    userType: { type: String, required: true },
    favouriteVenues: { type: [mongoose.Schema.Types.ObjectId], ref: 'project_venues'},
});
const User = mongoose.model('project_users', UserSchema);

const CommentSchema = mongoose.Schema({
    id: {type: Number, required: true , unique: true},
    content : {type: String, required: true , unique: true},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'project_users'},
    venue: {type: mongoose.Schema.Types.ObjectId, ref: 'project_venues'},
});
const Comment = mongoose.model('project_comments', CommentSchema);

module.exports = {Event, Venue, User, Comment}