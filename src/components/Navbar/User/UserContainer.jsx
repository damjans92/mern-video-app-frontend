import React, { useState } from 'react'
import styled from 'styled-components'
import UserDropdown from './UserDropdown'
import Avatar from './Avatar'

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`

const UserContainer = () => {
  const [openUserMenu, setOpenUserMenu] = useState(false)

  return (
    <Container onClick={() => setOpenUserMenu(!openUserMenu)}>
      <Avatar />
      <UserDropdown isOpen={openUserMenu} />
    </Container>
  )
}

export default UserContainer
