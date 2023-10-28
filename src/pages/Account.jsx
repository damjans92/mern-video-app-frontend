import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import Modal from '../components/Modal'
import Input from '../components/UI/Input'
import Button from '../components/UI/Button'
import PasswordChangeForm from '../components/Account/PasswordChangeForm'
import ProfileImage from '../components/Account/ProfileImage'
import { deleteAccount, updateUser } from '../redux/services/userService'
import { useNavigate } from 'react-router-dom'

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`
const Wrapper = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  padding-top: 50px;
  width: 100%;
`
const AccountWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
  padding: 50px 30px;
  background: gray;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.border};
`
const AccountInfo = styled.div`
  display: flex;
  gap: 20px;
  flex-direction: column;
  margin-top: 30px;
`

const Edit = styled.div`
  position: absolute;
  width: 100%;
  bottom: 0;
  text-align: center;
  background: rgba(0, 0, 0, 0.4);
  height: 27px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`
const ButtonPassword = styled.button`
  text-transform: uppercase;
  background-color: transparent;
  border: none;
  font-size: 14px;
  color: #4d6dff;
  margin-left: auto;
  cursor: pointer;
`
const ButtonDelete = styled(ButtonPassword)`
  color: red;
`
const DescWrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`
const Desc = styled.textarea`
  border: 1px solid ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  min-width: 220px;
  font-size: 13px;
`
const MaxChars = styled.div`
  font-size: 14px;
  color: #858585;
  position: absolute;
  bottom: 5px;
  right: 20px;
`
const Label = styled.label`
  width: 100px;
  display: inline-block;
  color: ${({ theme }) => theme.text};
  position: relative;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`
const DeleteAccount = styled.div`
  padding-top: 30px;
  color: red;
`
const ButtonWrap = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  justify-content: center;
  margin-top: 30px;
`
const Account = () => {
  const { currentUser } = useSelector((state) => state.user)

  const [open, setOpen] = useState(false)
  const [modalType, setModalType] = useState(null)
  const [updatedUsername, setUpdateUsername] = useState(currentUser.name)
  const [updatedEmail, setUpdatedEmail] = useState(currentUser.email)
  const [updatedDesc, setUpdateDesc] = useState(currentUser.desc)
  const [updatedPassword, setUpdatePassword] = useState({
    password: '',
    confirmPassword: '',
  })

  const [errors, setErrors] = useState({})
  const maxChars = 1000

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const openModalHandler = (modalType) => {
    setOpen(true)
    setModalType(modalType)
  }

  const handleEdit = async (e) => {
    e.preventDefault()

    dispatch(
      updateUser({
        currentUser,
        updateData: { updatedUsername, updatedEmail, updatedDesc },
      })
    )
  }
  const handleDeleteAccount = async () => {
    dispatch(
      deleteAccount({ currentUserId: currentUser._id, dispatch, navigate })
    )
  }
  return (
    <Container>
      <Wrapper>
        <AccountWrap>
          <ProfileImage />
          <AccountInfo>
            <Form onSubmit={handleEdit}>
              <Label>Username</Label>
              <Input
                type='text'
                placeholder='Username'
                value={updatedUsername}
                onChange={(e) => setUpdateUsername(e.target.value)}
              />
              <Label>Description</Label>
              <DescWrap style={{ position: 'relative' }}>
                <Desc
                  name='desc'
                  maxLength={1000}
                  rows={5}
                  value={updatedDesc}
                  placeholder='Write something about yourself...'
                  onChange={(e) => setUpdateDesc(e.target.value)}
                />
                <MaxChars>
                  {updatedDesc?.length} / {maxChars}
                </MaxChars>
              </DescWrap>

              <Label>Email</Label>

              <Input
                type='text'
                placeholder='Email'
                value={updatedEmail}
                onChange={(e) => setUpdatedEmail(e.target.value)}
              />
              <ButtonPassword
                onClick={() => openModalHandler('passwordModal')}
                type='button'
              >
                Change password
              </ButtonPassword>
              <ButtonDelete
                onClick={() => openModalHandler('deleteAccountModal')}
                type='button'
              >
                Delete Account
              </ButtonDelete>
              <Button title='Save' type='submit' />
            </Form>
          </AccountInfo>
        </AccountWrap>
        <Modal open={open} onClose={() => setOpen(false)}>
          {modalType === 'passwordModal' && (
            <PasswordChangeForm
              updatedPassword={updatedPassword}
              setUpdatePassword={setUpdatePassword}
              errors={errors}
            />
          )}
          {modalType === 'deleteAccountModal' && (
            <DeleteAccount>
              Do you want to delete your account permanently?
              <ButtonWrap>
                <Button title='Delete' onClick={handleDeleteAccount} />
                <Button title='Cancel' onClick={() => setOpen(false)} />
              </ButtonWrap>
            </DeleteAccount>
          )}
        </Modal>
      </Wrapper>
    </Container>
  )
}

export default Account
