# CSCI2720_Backend

## node index.js

GET     /user                               get all user include name & pw
GET     /user/:userid                       get user info
PUT     /user/:userid                       update a user

POST    /user/login                 body: username password
POST    /user/login/admin           body: username password

GET     /user/favouriteVenues/:userId            get user fav Location
POST    /user/favouriteVenues/:userId/:venueId   add loc
DELETE  /user/favouriteVenues/:userId/:venueId   delete loc

GET     /comment/:venueId                               get all comments with venue id
POST    /comment/:userId/:venueId   body: content       add new comment
DELETE  /comment/:commentId                             delete comment id

GET     /event                              get all event
GET     /event/eventId                      get by event id
GET     /event/venue/:venueId               get events by venue id

POST    /event                              add new event
PUT     /event/eventId                      update a event
DELETE  /event/eventId                      delete a event

GET     /venue                              get all venues
GET     /venue/:venueId                     get by venue id
GET     /venue/search?keyword={}            get venues by searching

POST    /venue                              add new venue
PUT     /venue/venueId                      update a venue
DELETE  /venue/venueId                      delete a venue