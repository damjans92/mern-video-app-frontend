import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Input from '../UI/Input'
import Button from '../UI/Button'
import Error from '../UI/Error'
import { useDispatch } from 'react-redux'
import { updateUser } from '../../redux/services/userService'
import { useNavigate } from 'react-router-dom'

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

  const validateUpdateEmail = () => {
    const errorsObj = {}
    if (!currentPassword.trim())
      errorsObj.password = 'Password field is required'
    if (!updatedEmail.trim()) errorsObj.email = 'Email field is required'

    setErrors(errorsObj)

    if (Object.keys(errorsObj).length === 0) {
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
