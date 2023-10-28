import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { styled } from 'styled-components'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import UploadForm from '../Upload/UploadForm'
import Modal from '../Modal'
import NavbarLeft from './NavbarLeft'
import User from './User/User'
import NavbarCenter from './NavbarCenter'
import { toggleOpenUpload } from '../../redux/slices/toggleSlice'

const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 60px;
  z-index: 3;
`
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0px 20px;
  position: relative;
`

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const { openUpload } = useSelector((state) => state.toggle)
  const { currentUser } = useSelector((state) => state.user)

  const dispatch = useDispatch()

  return (
    <>
      <Container>
        <Wrapper>
          <NavbarLeft />
          <NavbarCenter />
          {currentUser ? (
            <User setOpen={setOpen} />
          ) : (
            <Link to='signin' style={{ textDecoration: 'none' }}>
              <Button>
                <AccountCircleOutlinedIcon />
                SIGN IN
              </Button>
            </Link>
          )}
        </Wrapper>
      </Container>
      <Modal
        open={openUpload}
        onClose={() => dispatch(toggleOpenUpload(false))}
      >
        <UploadForm setOpen={setOpen} />
      </Modal>
    </>
  )
}

export default Navbar
