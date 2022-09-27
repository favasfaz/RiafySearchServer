const mongoClient = require('mongodb').MongoClient;

const state = {
  db: null,
};

module.exports.connect = function (done) {
  
  const {CONNECTION_URL,DB_NAME} = process.env;

  mongoClient.connect(CONNECTION_URL, { useUnifiedTopology: true }, (err, data) => {
    if (err) return done(err);

    state.db = data.db(DB_NAME);
    done();
  });
};

module.exports.get = function () {
  return state.db;
};
