// CSCI-2720 Project Group 30 Culture Programme

// Group Members:

// 1155141928 Cheuk Chun Lok            

// 1155143453 Shek Wui Lun            

// 1155142754 Chiu Man Ho

// 1155126403 Wong Yu Shing            

// 1155143965 Yau Chun Tung              

// 1155143076 Yeung Sze Ki

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
    venuee: { type: String, required: true },
    coordinate: { type:Object },
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