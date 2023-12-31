import React, { useState } from 'react'
import styled from 'styled-components'
import Input from '../UI/Input'
import Button from '../UI/Button'
import Error from '../UI/Error'
import axiosInstance from '../../api'
import { toast } from 'react-toastify'
import { updatePassword } from 'firebase/auth'
import { auth } from '../../firebase'
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/services/userService'
import { useNavigate } from 'react-router-dom'
import { reauthenticate } from '../../firebase/firebaseAuth'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`
const Title = styled.h3`
  text-align: center;
`
const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 10px;
`
const PasswordChangeForm = ({ updatedPassword, setUpdatePassword }) => {
  const [currentPassword, setCurrentPassword] = useState('')
  const [errors, setErrors] = useState({})
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleEditPassword = async (e) => {
    e.preventDefault()

    if (!validateResetPassword()) {
      return
    } else {
      try {
        const newPassword = updatedPassword.password

        await reauthenticate(currentPassword)
        await updatePassword(auth.currentUser, newPassword)

        const res = await axiosInstance.put(
          `auth/reset`,
          {
            password: updatedPassword.password,
          },
          { withCredentials: true }
        )
        if (res.status === 200) {
          toast.success('Password changed. Please sign in again.')
          dispatch(logout({ navigate }))
        }
      } catch (error) {
        toast.error(error.message)
      }
    }
  }

  const validateResetPassword = () => {
    const errorObj = {}
    if (!updatedPassword.password.trim())
      errorObj.password = 'Password field is required'
    if (!updatedPassword.confirmPassword.trim())
      errorObj.confirmPassword = 'Confirm password field is required'
    if (updatedPassword.password !== updatedPassword.confirmPassword) {
      errorObj.mustMatch = 'Passwords must match!'
    }
    setErrors(errorObj)

    if (Object.keys(errorObj).length === 0) {
      return true
    } else {
      return false
    }
  }

  return (
    <Form onSubmit={handleEditPassword}>
      <Title>Change password</Title>
      <Label>
        Current password
        <Input
          type='password'
          placeholder='Enter current password'
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
      </Label>
      <Label>
        New password
        <Input
          type='password'
          placeholder='Enter new password'
          value={updatedPassword.password}
          onChange={(e) =>
            setUpdatePassword((prev) => ({
              ...prev,
              password: e.target.value,
            }))
          }
        />
      </Label>
      {errors.password && <Error text={errors.password} />}
      <Label>
        Confirm new password
        <Input
          type='password'
          placeholder='Re-enter new password'
          value={updatedPassword.confirmPassword}
          onChange={(e) =>
            setUpdatePassword((prev) => ({
              ...prev,
              confirmPassword: e.target.value,
            }))
          }
        />
      </Label>
      {errors.confirmPassword && <Error text={errors.confirmPassword} />}
      {errors.mustMatch && <Error>{errors.mustMatch}</Error>}
      <Button type='submit' style={{ marginLeft: 'auto' }} title='Save' />
    </Form>
  )
}

export default PasswordChangeForm
