import config from '../firebaseConfiguration'

import Firebase from 'firebase'
require('firebase/firestore')
require('firebase/functions')

const firebaseApp = Firebase.initializeApp(config)

export const db = firebaseApp.firestore()
export const functions = firebaseApp.functions()
