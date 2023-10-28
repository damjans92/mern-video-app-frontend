import React from 'react'
import { Link } from 'react-router-dom'
import {
  toggleNavMobile,
  toggleSearchOff,
} from '../../redux/slices/toggleSlice'
import styled from 'styled-components'
import TubeLand from '../../assets/logo.png'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import MenuIcon from '@mui/icons-material/Menu'
import { useDispatch, useSelector } from 'react-redux'

const NavLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`
const CloseSearch = styled.div`
  color: ${({ theme }) => theme.text};
  cursor: pointer;
`
const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
`

const MenuButton = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  > svg {
    font-size: 30px;
  }
  @media screen and (min-width: 1280px) {
    display: none;
  }
`
const Img = styled.img`
  height: 25px;
`

const NavbarLeft = () => {
  const { openNavMobile } = useSelector((state) => state.toggle)
  const { openSearchMobile } = useSelector((state) => state.toggle)
  const dispatch = useDispatch()

  return (
    <NavLeft>
      {!openSearchMobile ? (
        <>
          <MenuButton onClick={() => dispatch(toggleNavMobile(!openNavMobile))}>
            <MenuIcon />
          </MenuButton>
          <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
            <Logo>
              <Img src={TubeLand} />
              TubeLand
            </Logo>
          </Link>
        </>
      ) : (
        <CloseSearch>
          <ArrowBackIcon onClick={() => dispatch(toggleSearchOff())} />
        </CloseSearch>
      )}
    </NavLeft>
  )
}

export default NavbarLeft
