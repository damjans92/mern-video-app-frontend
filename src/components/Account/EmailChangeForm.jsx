import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Input from '../UI/Input'
import Button from '../UI/Button'
import Error from '../UI/Error'
import axiosInstance from '../../api'
import { toast } from 'react-toastify'
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from 'firebase/auth'
import { auth } from '../../firebase'
import { useDispatch } from 'react-redux'
import { logout, updateUser } from '../../redux/services/userService'
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
const EmailChangeForm = ({ currentUser }) => {
  const [currentPassword, setCurrentPassword] = useState('')
  const [updatedEmail, setUpdatedEmail] = useState(currentUser.email)
  const [errors, setErrors] = useState({})
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleEditEmail = async (e) => {
    e.preventDefault()

    if (!validateUpdateEmail()) {
      return
    } else {
      console.log(updatedEmail, currentPassword)
      dispatch(
        updateUser({
          currentUser,
          updateData: { updatedEmail, currentPassword },
        })
      )
    }
  }
  useEffect(() => {
    console.log(updatedEmail)
    console.log(currentPassword)
  }, [updatedEmail, currentPassword])
  const validateUpdateEmail = () => {
    const errorsArr = {}
    if (!currentPassword.trim())
      errorsArr.password = 'Password field is required'
    if (!updatedEmail.trim()) errorsArr.email = 'Email field is required'

    setErrors(errorsArr)

    if (Object.keys(errorsArr).length === 0) {
      return true
    } else {
      return false
    }
  }

  return (
    <Form onSubmit={handleEditEmail}>
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
      {errors.password && <Error text={errors.password} />}
      <Label>
        New email
        <Input
          type='text'
          placeholder='Enter new email'
          value={updatedEmail}
          onChange={(e) => setUpdatedEmail(e.target.value)}
        />
      </Label>
      {errors.email && <Error text={errors.email} />}
      <Button type='submit' style={{ marginLeft: 'auto' }} title='Save' />
    </Form>
  )
}

export default EmailChangeForm
