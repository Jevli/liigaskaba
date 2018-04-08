import config from '../firebaseConfiguration'

import Firebase from 'firebase'
require('firebase/firestore')

const firebaseApp = Firebase.initializeApp(config.fireStore)

export const db = firebaseApp.firestore()
