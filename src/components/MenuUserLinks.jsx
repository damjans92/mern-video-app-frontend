import React from 'react'
import MenuLink from './UI/MenuLink'
import VideoLibraryOutlinedIcon from '@mui/icons-material/VideoLibraryOutlined'
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import { Link } from 'react-router-dom'
import { USERVIDEOS, USER_CHANNEL, LIKED_VIDEOS } from '../routes'
import styled from 'styled-components'

const Login = styled.div``
const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  margin-top: 10px;
  font-weight: 500;
  cursor: pointer;
`
const Hr = styled.hr`
  margin: 15px 0;
  border: 0.5px solid ${({ theme }) => theme.soft};
`

const MenuUserLinks = ({ currentUser }) => {
  if (!currentUser) {
    return (
      <>
        <Login>
          Sign in to upload and like videos, comment, and subscribe.
          <Link to='signin' style={{ textDecoration: 'none' }}>
            <Button>
              <AccountCircleOutlinedIcon />
              SIGN IN
            </Button>
          </Link>
        </Login>
        <Hr />
      </>
    )
  }

  return (
    <>
      <MenuLink
        to={USERVIDEOS}
        icon={<VideoLibraryOutlinedIcon />}
        text='Your Videos'
      />
      <MenuLink
        to={USER_CHANNEL.replace(':id', currentUser._id)}
        icon={<AccountBoxOutlinedIcon />}
        text='Your Channel'
      />
      <MenuLink to={LIKED_VIDEOS} icon={<ThumbUpIcon />} text='Liked Videos' />
      <Hr />
    </>
  )
}

export default MenuUserLinks
