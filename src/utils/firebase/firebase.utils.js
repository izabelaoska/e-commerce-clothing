import { initializeApp } from "firebase/app" //initializeApp creates an instance of my app based on some config
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
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

const googleProvider = new GoogleAuthProvider() // there are many different providers - like facebook or github - that is also the reason why the
//providers are like classes
googleProvider.setCustomParameters({
  prompt: "select_account",
})

export const auth = getAuth()
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (
  //creating user instance in the firestore
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return
  const userDocRef = doc(db, "users", userAuth.uid)

  const userSnapshot = await getDoc(userDocRef) //shows if this instance exists in our database, and to access this data

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
        ...additionalInformation,
      })
    } catch (error) {
      console.log("error creating new user", error.message)
    }
  }
  return userDocRef
}

export const createAuthUserWithEmailAndPassword = async (
  email,
  password
) => {
  if (!email || !password) return
  return await createUserWithEmailAndPassword(
    auth,
    email,
    password
  )
}
export const signInAuthUserWithEmailAndPassword = async (
  email,
  password
) => {
  if (!email || !password) return
  return await signInWithEmailAndPassword(
    auth,
    email,
    password
  )
}

export const signOutUser = async () => await signOut(auth)

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback)
