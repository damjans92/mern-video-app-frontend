import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import VideoLibraryOutlinedIcon from '@mui/icons-material/VideoLibraryOutlined'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import LogoutIcon from '@mui/icons-material/Logout'
import { useDispatch } from 'react-redux'
import { logout } from '../../../redux/services/userService'
import styled from 'styled-components'

const Container = styled.ul`
  position: absolute;
  top: 33px;
  right: 0;
  width: 300px;
  height: auto;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.userDropdown};
  list-style: none;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 0;
  > li {
    &:hover {
      background-color: #818181;
    }
  }
  > li > a {
    color: inherit;
    text-decoration: none;
    padding-left: 20px;
    line-height: 52px;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    gap: 15px;
  }
`

const UserDropdown = ({ isOpen }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout({ navigate }))
  }

  if (isOpen) {
    return (
      <Container>
        <li>
          <Link to='account'>
            <AccountCircleOutlinedIcon />
            Your Account
          </Link>
        </li>
        <li>
          <Link to='uservideos'>
            <VideoLibraryOutlinedIcon />
            Your Videos
          </Link>
        </li>
        <li>
          <Link onClick={() => handleLogout()}>
            <LogoutIcon />
            Log Out
          </Link>
        </li>
      </Container>
    )
  } else {
    return
  }
}

export default UserDropdown
