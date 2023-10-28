import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import profilePic from '../../../assets/profile-pic.png'
import { Tooltip } from 'react-tooltip'

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`
const AvatarImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
`
const Name = styled.span`
  @media screen and (max-width: 1280px) {
    display: none;
  }
`

const Avatar = () => {
  const { currentUser } = useSelector((state) => state.user)

  return (
    <Container>
      <AvatarImage
        src={currentUser.img ? currentUser.img : profilePic}
        data-tooltip-id='acccount-tooltip'
        data-tooltip-content='Account'
      />
      <Tooltip
        id='account-tooltip'
        style={{
          backgroundColor: 'rgb(146, 146, 146)',
          color: '#222',
        }}
      />
      <Name>{currentUser.name}</Name>
    </Container>
  )
}

export default Avatar
