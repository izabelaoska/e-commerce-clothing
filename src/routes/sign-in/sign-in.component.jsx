import { signInWithGooglePopup } from "../../utils/firebase/firebase.utils"

import { createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils"

const SignIn = () => {
  const logGoogleUser = async () => {
    // const { user } = await signInWithGooglePopup()
    // createUserDocumentFromAuth(user)
    const { user } = await signInWithGooglePopup() //creating user instance in the firestore
    const userDocRef = await createUserDocumentFromAuth(
      user
    )
  }
  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>
        Sign in with Google Popup
      </button>
    </div>
  )
}

export default SignIn
