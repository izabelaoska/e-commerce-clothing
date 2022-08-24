import { useState } from "react"
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils"

import FormInput from "../form-input/form-input.component"

import Button from "../button/button.component"
import "./sign-in-form.styles.scss"

const defaultFormFields = {
  //default state
  email: "",
  password: "",
}

const SignInForm = () => {
  const [formFields, setFormFields] = useState(
    defaultFormFields
  )
  const { email, password } = formFields

  console.log(formFields)

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const signInWithGoogle = async () => {
    // const { user } = await signInWithGooglePopup()
    // createUserDocumentFromAuth(user)
    const { user } = await signInWithGooglePopup() //creating user instance in the firestore
    await createUserDocumentFromAuth(user)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const response =
        await signInAuthUserWithEmailAndPassword(
          email,
          password
        )
      console.log(response)
      resetFormFields()
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("Password you entered is incorrect")
          break
        case "auth/user-not-found":
          alert("Email address not found")
          break
        default:
          console.log(error)
      }
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormFields({
      ...formFields,
      [name]: value,
    })
  }

  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          required
          type="email"
          name="email"
          onChange={handleChange}
          value={email}
        />
        <FormInput
          label="Password"
          required
          type="password"
          name="password"
          onChange={handleChange}
          value={password}
        />
        <div className="buttons-container ">
          <Button type="submit">Sign in</Button>
          <Button
            type="button"
            onClick={signInWithGoogle}
            buttonType="google"
          >
            Google sign in
          </Button>
        </div>
      </form>
    </div>
  )
}

export default SignInForm
