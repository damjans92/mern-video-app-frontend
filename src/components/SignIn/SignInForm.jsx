import React, { useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { signInWithGoogle, signin } from '../../redux/services/userService'
import { validateSignIn } from './validateForms'
import Button from '../UI/Button'
import Error from '../UI/Error'
import Input from '../UI/Input'

const Form = styled.form`
  display: block;
  max-width: 220px;
  text-align: center;
`
const Title = styled.h1`
  font-size: 24px;
`
const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
`

const SignInForm = () => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.user)

  const handleLogin = async (e) => {
    e.preventDefault()
    const fields = {
      name,
      password,
    }
    if (!validateSignIn(fields, setErrors)) return

    dispatch(signin({ name, password }))
  }

  return (
    <Form>
      <Title>Sign in</Title>
      <SubTitle>to continue to TubeLand</SubTitle>
      <Input placeholder='username' onChange={(e) => setName(e.target.value)} />
      {errors.name && <Error text={errors.name} />}
      <Input
        type='password'
        placeholder='password'
        onChange={(e) => setPassword(e.target.value)}
      />
      {errors.password && <Error text={errors.password} />}
      {errors.wrongCredentials && <Error text={errors.wrongCredentials} />}
      <Button onClick={handleLogin} title='Sign in' disabled={loading} />
      <Title>or</Title>
      <Button
        onClick={() => dispatch(signInWithGoogle())}
        title='Sign in with Google'
      />
    </Form>
  )
}

export default SignInForm
