import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import SignInForm from '../components/SignIn/SignInForm'
import Error from '../components/UI/Error'
import SignUpForm from '../components/SignIn/SignUpForm'

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 20px 50px;
  gap: 10px;
`
const More = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`
const Links = styled.div`
  margin-left: 50px;
`
const LinkStyled = styled(Link)`
  margin-left: 30px;
  text-decoration: none;
  color: ${({ theme }) => theme.textSoft};
`
const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.507);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99;
`
const ModalWrapper = styled.div`
  width: 400px;
  height: 100px;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  overflow-y: auto;
  justify-content: center;
  text-align: center;
`
const ModalButton = styled.div`
  display: block;
  margin: 0 auto;
  margin-top: 20px;
  width: 100px;
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`
const Close = styled.div`
  right: 10px;
  top: 10px;
  cursor: pointer;
  position: absolute;
`

const SignIn = () => {
  const [open, setOpen] = useState(false)
  const { message } = useSelector((state) => state.user)

  const dispatch = useDispatch()
  const isLoggedIn = useSelector((state) => state.user.currentUser)
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/')
    }
  }, [isLoggedIn, dispatch, navigate])

  return (
    <>
      <Container>
        <Wrapper>
          <SignInForm />
          <SignUpForm />
        </Wrapper>
        <More>
          English(USA)
          <Links>
            <LinkStyled>Privacy</LinkStyled>
            <LinkStyled to='/terms-and-conditions' target='_blank'>
              Terms
            </LinkStyled>
          </Links>
        </More>
      </Container>
      {open && (
        <ModalContainer>
          <ModalWrapper>
            {message && <Error text={message} />}
            <Close onClick={() => setOpen(false)}>X</Close>
            <ModalButton onClick={() => setOpen(false)}>OK</ModalButton>
          </ModalWrapper>
        </ModalContainer>
      )}
    </>
  )
}

export default SignIn
