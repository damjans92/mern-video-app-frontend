import React from 'react'
import styled from 'styled-components'
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined'
import UserContainer from './UserContainer'
import { toggleOpenUpload } from '../../../redux/slices/toggleSlice'
import { useDispatch } from 'react-redux'

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  color: ${({ theme }) => theme.text};
  position: relative;
`

const User = () => {
  const dispatch = useDispatch()

  return (
    <Container>
      <VideoCallOutlinedIcon
        onClick={() => dispatch(toggleOpenUpload(true))}
        style={{ cursor: 'pointer', fontSize: '33px' }}
        data-tooltip-id='upload-tooltip'
        data-tooltip-content='Upload video'
      />

      <UserContainer />
    </Container>
  )
}

export default User
