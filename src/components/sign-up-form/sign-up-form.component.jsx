import { useState } from "react"
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils"

import FormInput from "../form-input/form-input.component"

import Button from "../button/button.component"
import "./sign-up-form.styles.scss"

const defaultFormFields = {
  //default state
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
}

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(
    defaultFormFields
  )
  const { name, email, password, confirmPassword } =
    formFields

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (password !== confirmPassword) {
      alert("passwords do not match")
      return
    }
    try {
      const { user } =
        await createAuthUserWithEmailAndPassword(
          email,
          password
        )

      await createUserDocumentFromAuth(user, { name })
      resetFormFields()
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Email address already in use")
      } else {
        console.log("error", error)
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
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Name"
          required
          type="text"
          name="name"
          onChange={handleChange}
          value={name}
        />
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
        <FormInput
          label="Confirm password"
          required
          type="password"
          name="confirmPassword"
          onChange={handleChange}
          value={confirmPassword}
        />
        <Button type="submit">Sign up</Button>
      </form>
    </div>
  )
}

export default SignUpForm
