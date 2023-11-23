import React, { useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { signup } from '../../redux/services/userService'
import Error from '../UI/Error'
import Button from '../UI/Button'
import Input from '../UI/Input'
import { Link } from 'react-router-dom'
import { validateSignUp } from './validateForms'

const Form = styled.form`
  display: block;
  max-width: 220px;
  text-align: center;
`
const Title = styled.h1`
  font-size: 24px;
`
const TermsLabel = styled.label`
  display: block;
  width: 100%;
  color: ${({ theme }) => theme.textSoft};
  text-align: left;
  font-size: 14px;
  margin-bottom: 15px;

  > input {
    margin-right: 10px;
  }
`
const SignUpForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [errors, setErrors] = useState({})
  const { loadingSignup } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const handleSignUp = async (e) => {
    e.preventDefault()
    const fields = {
      name,
      password,
      email,
      acceptTerms,
    }
    if (!validateSignUp(fields, acceptTerms, setErrors)) return

    dispatch(signup({ name: name, email: email, password: password }))

    setName('')
    setPassword('')
    setEmail('')
    setAcceptTerms(false)
  }

  return (
    <Form onSubmit={handleSignUp}>
      <Title>Sign up</Title>
      <label htmlFor='username' hidden>
        Username
      </label>
      <Input
        name='username'
        placeholder='username'
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      {errors.name && <Error text={errors.name} />}
      <label htmlFor='email' hidden>
        Email
      </label>
      <Input
        name='email'
        type='email'
        placeholder='email'
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      {errors.email && <Error text={errors.email} />}
      {errors.emailNotValid && <Error text={errors.emailNotValid} />}
      <label htmlFor='password' hidden>
        Password
      </label>
      <Input
        name='password'
        type='password'
        placeholder='password'
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      {errors.password && <Error text={errors.password} />}
      <TermsLabel htmlFor='terms'>
        <input
          type='checkbox'
          id='terms'
          name='terms'
          checked={acceptTerms}
          onChange={() => setAcceptTerms(!acceptTerms)}
        />
        I accept <Link to='/terms-and-conditions'>terms and conditions</Link>
      </TermsLabel>
      {errors.acceptTerms && <Error text={errors.acceptTerms} />}
      <Button type='submit' title='Sign up' disabled={loadingSignup} />
    </Form>
  )
}

export default SignUpForm
