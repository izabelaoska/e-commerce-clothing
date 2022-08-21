import { initializeApp } from "firebase/app"
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GithubAuthProvider,
  GoogleAuthProvider,
} from "firebase/auth"

import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCM8h7gC83BApYO0U4ThQ2qILKsArWnS-Q",
  authDomain: "crwn-clothing-db-45fa2.firebaseapp.com",
  projectId: "crwn-clothing-db-45fa2",
  storageBucket: "crwn-clothing-db-45fa2.appspot.com",
  messagingSenderId: "9616705068",
  appId: "1:9616705068:web:0544c3240b738b7aa27389",
}

const firebaseApp = initializeApp(firebaseConfig)

const provider = new GoogleAuthProvider()
provider.setCustomParameters({
  prompt: "select_account",
})

export const auth = getAuth()
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, provider)

export const db = () => getFirestore()

export const createUserDocumentFromAuth = async (
  userAuth
) => {
  const userDocRef = doc(db, "users", userAuth.uid)

  console.log(userDocRef)
}
