import React, { useState } from 'react'
import Input from '../UI/Input'
import Button from '../UI/Button'
import { useDispatch, useSelector } from 'react-redux'
import { deleteAccount } from '../../redux/services/userService'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Error from '../UI/Error'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`
const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 10px;
`
const Title = styled.h3`
  text-align: center;
`
const ButtonWrap = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  justify-content: center;
  margin-top: 30px;
`

const DeleteAccountForm = ({ setOpen }) => {
  const { currentUser } = useSelector((state) => state.user)
  const [currentPassword, setCurrentPassword] = useState('')
  const [error, setError] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleDeleteAccount = async () => {
    let errorPassword = ''
    if (!currentPassword.trim()) {
      errorPassword = 'Password is required field'
      setError(errorPassword)
      return
    } else {
      dispatch(
        deleteAccount({
          currentUserId: currentUser._id,
          currentPassword,
          dispatch,
          navigate,
        })
      )
    }
  }
  return (
    <Form onSubmit={handleDeleteAccount}>
      <Title>Type in you password to delete your account</Title>
      <Label>
        Current password
        <Input
          type='password'
          placeholder='Enter current password'
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
      </Label>
      {error && <Error text={error} />}
      <ButtonWrap>
        <Button title='Delete' onClick={handleDeleteAccount} />
        <Button title='Cancel' onClick={() => setOpen(false)} />
      </ButtonWrap>
    </Form>
  )
}

export default DeleteAccountForm
