const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);
var db = admin.firestore();

exports.importGames = functions.https.onRequest((request, response) => {
  const games = request.body.games;
  let done = 0
  console.log('Games: ' + games.length)
  games.forEach(game => {
    db.collection('games')
    .add(game)
    .then(ref => {
      done++
      console.log('Added document with ID: ', ref.id, done);
    }).catch(err => {
      console.log(err)
    });
  });
  response.send('Adding files')
});
