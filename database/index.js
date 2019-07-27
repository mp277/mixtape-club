const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const findOrCreate = require('mongoose-findorcreate');

/**
 * Mongoose required to connect to db as well as organize schema
 * Autoincrement required to maintain order for playlists stored
 * FindorCreate required to save information if not found on db or retrieve if found
 */

/**
 * Connection made using mongoose to connect to mongoDB stored on local machine
 */

mongoose.connect('mongodb://localhost/mtc', { useNewUrlParser: true });

/**
 *Renaming connection to save time on calls to database
 */

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('MongoDB Connected');
});

/**
 *  initializing auto increment on the database
 */

autoIncrement.initialize(db);

/**
 * Schema for playlist created using mongoose
 * findOrCreate and autoIncrement added to the schema via plugin
 * Renaming new playlist to aid in function calls
 */

const playlistSchema = new mongoose.Schema({
  id: Number,
  userId: String,
  aSideLinks: String,
  bSideLinks: String,
  aTitles: String,
  bTitles: String,
  tapeDeck: String,
  tapeLabel: String,
  isPublic: {
    type: Boolean,
    default: false,
  },
  views: {
    type: Number,
    default: 0,
  },
});
playlistSchema.plugin(findOrCreate);
playlistSchema.plugin(autoIncrement.plugin, 'playlist');
const Playlist = mongoose.model('Playlist', playlistSchema);

/**
 * Schema for user created using mongoose
 * findOrCreate added to the schema via plugin
 * renaming new user to aid in function calls
 */

const userSchema = new mongoose.Schema({
  id: Number,
  googleId: String,
  displayName: String,
});
userSchema.plugin(findOrCreate);
const User = mongoose.model('User', userSchema);

/**
 * findCreate uses the findOrCreate plugin to check if document is created
 * creates a new document if none match its inputs
 * retrieves document if match is found
 * @param {*} googleInfo {object} googleInfo is an object passed through with the profile.id
 * @param {*} callback used to give information back to function calling findCreate
 */

const findCreate = (googleInfo, callback) => {
  const { googleId, displayName } = googleInfo;
  User.findOrCreate({ googleId, displayName }, (err, user, created) => {
    if (created === true) {
      console.log(`User ${googleId} was created: ${displayName}`);
      callback(null, user);
    } else {
      User.findOrCreate({ googleId, displayName }, (err, user, created) => {
        if (created === false) {
          console.log(`User ${displayName} exists`);
          // user is the model
          callback(null, user);
        }
      });
    }
  });
};

/**
 * storePlaylist saves playlist model to database
 * @param {*} plDetails {object} information taken from state of Mixtape-player
 * @param {*} callback used to give information back to function calling storePlaylist
 */

const storePlaylist = (plDetails, callback) => {
  // plDetails is an object with all of our columns needing to be saved
  // when sending in request, please be sure  to include all fields, all are stings.
  const {
    userId, aSideLinks, bSideLinks, aTitles, bTitles, tapeDeck, tapeLabel, isPublic,
  } = plDetails;
  const playlistInfo = new Playlist({
    userId,
    aSideLinks,
    bSideLinks,
    aTitles,
    bTitles,
    tapeDeck,
    tapeLabel,
    isPublic,
  });
  playlistInfo.save((err) => {
    if (err) {
      callback(err);
    } else {
      callback('Success');
    }
  });
};

/**
 * retrievePlaylist used to get information from playlist model in database
 * @filter {object} filter to sort through column names in database
 * @param {*} callback used to give information back to function calling retrievePlaylist
 */

const retrievePlaylist = (filter, callback) => {
  Playlist.findOne(filter, (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(data);
    }
  });
};

/**
 * getAllPlaylist is designed to retrieve all playlists for a particular user
 * information is then passed to mixtape-player to present info to user after login
 * @param {*} filter {object} filter to sort through column names in database
 * @param {*} callback used to give information back to function calling getAllPlaylists
 */

const getAllPlaylists = (filter, callback) => {
  Playlist.find(filter, (err, data) => {
    if (err) {
      // console.log('error', err);
      callback(err);
    } else {
      // console.log('data', data);
      callback(null, data);
    }
  });
};

/**
 * updatePlaylist is a stretchgoal that was created at start of project
 * @param {*} filter filter to sort through column names in database
 * @param {*} update information to be updated on model
 * @param {*} callback used to give information back to function calling updatePlaylist
 */

const updatePlaylist = async function (filter, update, callback) {
  // see how params should be passed in
  // new:true allows the data to be the document AFTER the update is made
  // should be dynamic for whatever info is passed
  // const filter = { userId: 'franco3445' };
  // const update = { tapeDeck: 'green' };
  const data = await Playlist.findOneAndUpdate(filter, update, { new: true });
  callback(data);
};


module.exports.findCreate = findCreate;
module.exports.Playlist = Playlist;
module.exports.User = User;
module.exports.storePlaylist = storePlaylist;
module.exports.updatePlaylist = updatePlaylist;
module.exports.retrievePlaylist = retrievePlaylist;
module.exports.getAllPlaylists = getAllPlaylists;
