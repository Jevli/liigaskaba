import _ from 'lodash'
import {db} from './firebase'

const teamsDb = db.collection('teams')

const countValues = (team) => {
  team.games = team.wins + team.draws + team.loses
  team.points = team.wins * 3 + team.draws
  team.goaldifference = team.for - team.agains
  return team
}

export const getTeamsInOrder = async () => {
  return new Promise((resolve, reject) => {
    teamsDb.get()
      .then(res => {
        let teams = []
        res.forEach(doc => {
          let team = countValues(doc.data())
          team.id = doc.id
          teams.push(team)
        })
        resolve(_.orderBy(
          teams,
          ['points', 'goaldifference', 'for'],
          ['desc', 'desc', 'desc']
        ))
      })
      .catch(err => {
        reject(err)
      })
  })
}
