import { initializeApp } from "firebase/app" //initializeApp creates an instance of my app based on some config
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GithubAuthProvider,
  GoogleAuthProvider,
} from "firebase/auth"

import {
  getFirestore,
  doc, //documents inside our database
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

export const db = getFirestore()

export const createUserDocumentFromAuth = async (
  //creating user instance in the firestore
  userAuth
) => {
  const userDocRef = doc(db, "users", userAuth.uid)

  console.log(userDocRef)

  const userSnapshot = await getDoc(userDocRef) //shows if this instance exists in our database, and to access this data
  console.log(userSnapshot)
  console.log(userSnapshot.exists())

  if (!userSnapshot.exists()) {
    // all that happens if our user Shanpshot does not exist
    // if it does not exist then we want to set it inside our database
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      })
    } catch (error) {
      console.log("error creating new user", error.message)
    }
  }
  return userDocRef
}
