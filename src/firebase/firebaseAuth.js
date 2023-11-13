import {
  EmailAuthProvider,
  createUserWithEmailAndPassword,
  deleteUser,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
  updateProfile,
} from 'firebase/auth'
import { auth } from '../firebase'

// Sign in
export const signInWithFirebase = async (email, password) => {
  const userCredential = signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user
      console.log(user)
    })
    .catch((error) => {
      throw error
    })

  return userCredential
}

// Sign out
export const signOutWithFirebase = async () => {
  signOut(auth)
    .then(() => {})
    .catch((error) => {
      throw error
    })
}

// Sign up
export const signUpWithFirebase = async (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user
    })
    .catch((error) => {
      throw error
    })
}

// Delete account
export const deleteFirebaseUser = async () => {
  try {
    const user = auth.currentUser
    await deleteUser(user)
  } catch (error) {
    throw error
  }
}

// Update email
export const updateFirebaseEmail = async (newEmail) => {
  try {
    const user = auth.currentUser
    await updateEmail(user, newEmail)
  } catch (error) {
    throw error
  }
}

// Update username
export const updateFirebaseProfile = async (newName) => {
  try {
    const user = auth.currentUser
    await updateProfile(auth.currentUser, {
      displayName: newName,
    })
  } catch (error) {
    throw error
  }
}

// Update password
export const reauthenticate = async (currentPassword, newPassword) => {
  try {
    const user = auth.currentUser
    const credential = EmailAuthProvider.credential(user.email, currentPassword)

    await reauthenticateWithCredential(user, credential)

    await updatePassword(auth.currentUser, newPassword)
  } catch (error) {
    throw error
  }
}
