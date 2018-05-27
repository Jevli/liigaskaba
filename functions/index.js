const axios = require('axios')
const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp(functions.config().firebase);
var db = admin.firestore()

const baseUrl = 'http://mc.instatfootball.com/api/v1/'
const seasonsUrl = 'seasons?tournament_id=70'
const seasonMatchesUrl = 'matches?locale=en&tournament_id=70&season_id='
const matchUrl = 'matches/'

exports.importGames = functions.https.onRequest((request, response) => {
  const games = request.body.games
  let done = 0
  console.log('Games: ' + games.length)
  games.forEach(game => {
    db.collection('games')
    .add(game)
    .then(ref => {
      done++
      console.log('Added document with ID: ', ref.id, done)
    }).catch(err => {
      console.log(err)
    })
  })
  response.send('Adding files')
})

exports.updateSeasonMatches = functions.https.onRequest((request, response) => {
  const id = request.body.id || 21
  makeInstatQuery(seasonMatchesUrl + id)
  .then((json) => {
    response.status(200).send(json)
  })
  .catch((err) => {
    console.error(err)
    response.status(500).send('Failed to get matches')
  })
})

exports.getInstantSeasons = functions.https.onRequest((request, response) => {
  makeInstatQuery(seasonsUrl)
  .then((json) => {
    response.status(200).send(json)
  })
  .catch((err) => {
    console.error(err)
    response.status(500).send('Failed to get seasons')
  })
})

exports.getInstantSeasonMatches = functions.https.onRequest((request, response) => {
  const id = request.body.seasonId
  if (!id) response.status(300).send('Missing season id.')

  makeInstatQuery(seasonMatchesUrl + id)
  .then((json) => {
    response.status(200).send(json)
  })
  .catch((err) => {
    console.error(err)
    response.status(500).send('Failed to get seasons')
  })
})

exports.getInstantMatch = functions.https.onRequest((request, response) => {
  const id = request.body.matchId
  if (!id) respose.status(300).send('Missing match id.')

  makeInstatQuery(matchUrl + id)
  .then((json) => {
    response.status(200).send(json)
  })
  .catch((err) => {
    console.error(err)
    response.status(500).send('Failed to get seasons')
  })
})

exports.updateStandings = functions.firestore
  .document('games/{gameId}')
  .onUpdate((change, context) => {
    const next = change.after.data()
    const prev = change.before.data()

    const home = {
      id: change.after.id,
      name: next.home,
      for: next.result.home,
      agains: next.result.away
    }

    const away = {
      id: change.after.id,
      name: next.away,
      for: next.result.away,
      agains: next.result.home
    }

    if (prev.result) {
      home.prev = { for: prev.result.home, agains: prev.result.away }
      away.prev = { for: prev.result.away, agains: prev.result.home }
    }

    return Promise.all([createOrUpdateStandingForTeam(home), createOrUpdateStandingForTeam(away)])
      .then( result => console.info(result))
})

const createOrUpdateStandingForTeam = (team) => {
  return new Promise((resolve, reject) => {
    db.collection('teams').doc(team.name)
      .get()
      .then(doc => {
        if (!doc.exists) {
          console.info('Create new document for: ', team.name)

          let data = {
            'wins': team.for > team.agains ? 1 : 0,
            'draws': team.for === team.agains ? 1 : 0,
            'loses': team.for < team.agains ? 1 : 0,
            'for': team.for,
            'agains': team.agains,
            'games': [team.id]
          }

          db.collection('teams').doc(team.name).set(data)
            .then( ref => {
              resolve(data)
            })
            .catch( err => {
              reject(err)
            })

        } else if (doc.data().games.includes(team.id)) {
          console.info('Update match result for: ', team.name)

          let old = doc.data()
          let match = getUpadatedRecord(team.prev, team)
          console.info('Match: ', match)
          
          let data = {
            'wins': old.wins + match.win,
            'draws': old.draws + match.draw,
            'loses': old.loses + match.lose,
            'for': old.for + (team.for - team.prev.for),
            'agains': old.agains + (team.agains - team.prev.agains)
          }

          db.collection('teams').doc(team.name).update(data)
            .then( ref => {
              resolve(data)
            })
            .catch( err => {
              reject(err)
            })

        } else {
          console.info('Add new match for: ', team.name)
          
          let old = doc.data()

          let data = {
            'wins': old.wins + (team.for > team.agains ? 1 : 0),
            'draws': old.draws + (team.for === team.agains ? 1 : 0),
            'loses': old.loses + (team.for < team.agains ? 1 : 0),
            'for': old.for + team.for,
            'agains': old.agains + team.agains,
            'games': old.games.concat([team.id])
          }

          db.collection('teams').doc(team.name).update(data)
            .then( ref => {
              resolve(data)
            })
            .catch( err => {
              reject(err)
            })
            
        }
      })
  })
}

const getUpadatedRecord = (prev, now) => {
  if (prev.for > prev.agains) {
    return {
      win: now.for > now.agains ? 0 : -1,
      draw: now.for === now.agains ? 1: 0,
      lose: now.for < now.agains ? 1: 0
    }
  } else if (prev.for === prev.agains) {
    return {
      win: now.for > now.agains ? 1 : 0,
      draw: now.for === now.agains ? 0: -1,
      lose: now.for < now.agains ? 1: 0
    }
  } else if (prev.for < prev.agains) {
    return {
      win: now.for > now.agains ? 1 : 0,
      draw: now.for === now.agains ? 1: 0,
      lose: now.for < now.agains ? 0: -1
    }
  } else {
    console.error('Something went wrong')
  }
}

const makeInstatQuery = (url) => {
  return new Promise((resolve, reject) => {
    axios.get(baseUrl + url)
      .then(response => {
        console.log(response.headers)
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}