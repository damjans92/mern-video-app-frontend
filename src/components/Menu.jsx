import React, { useEffect } from 'react'
import { styled } from 'styled-components'
import TubeLand from '../assets/logo.png'
import HomeIcon from '@mui/icons-material/Home'
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined'
import SubscriptionsOutlinedIcon from '@mui/icons-material/SubscriptionsOutlined'
import SettingsBrightnessOutlinedIcon from '@mui/icons-material/SettingsBrightnessOutlined'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import MenuIcon from '@mui/icons-material/Menu'
import { toggleDarkMode, toggleNavMobile } from '../redux/slices/toggleSlice'
import useMediaQuery from '../utils/useMediaQuery'
import MenuUserLinks from './MenuUserLinks'
import MenuLink from './UI/MenuLink'
import { HOME, TRENDS, SUBSCRIPTIONS } from '../routes'

const Container = styled.div`
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  width: 240px;
  height: 100vh;
  position: fixed;
  top: 0;
  min-height: 100%;
  transform: ${(props) =>
    props.$isOpen ? 'translateX(0px)' : 'translatex(-100%)'};
  transition: transform 0.2s ease-in-out;
  z-index: 99;

  @media screen and (min-width: 1280px) {
    /* height: calc(100vh - 56px); */
    margin-top: 56px;
  }
`
const Wrapper = styled.div`
  padding: 18px 16px;
`
const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: bold;
`
const Img = styled.img`
  height: 25px;
`
const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  padding: 7.5px 10px;
`
const Hr = styled.hr`
  margin: 15px 0;
  border: 0.5px solid ${({ theme }) => theme.soft};
`
const MenuTop = styled.div`
  display: flex;
  align-items: center;
  gap: 25px;
  margin-bottom: 20px;
  @media screen and (min-width: 1280px) {
    display: none;
  }
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
const Overlay = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background: rgba(0, 0, 0, 0.7);
  z-index: 99;
  top: 0;
  visibility: hidden;
  transition: all 0.3s;
  @media screen and (max-width: 1280px) {
    opacity: ${(props) => (props.$isOpen ? '1' : '0')};
    visibility: ${(props) => (props.$isOpen ? 'visible' : 'hidden')};
  }
`
const Copy = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`
const Menu = () => {
  const { currentUser } = useSelector((state) => state.user)
  const { darkMode } = useSelector((state) => state.toggle)
  const { openNavMobile } = useSelector((state) => state.toggle)

  const dispatch = useDispatch()
  const isDesktop = useMediaQuery('(min-width: 1280px)')

  useEffect(() => {
    if (isDesktop) {
      dispatch(toggleNavMobile(true))
    } else {
      dispatch(toggleNavMobile(false))
    }
  }, [isDesktop, dispatch])

  return (
    <div>
      <Overlay
        $isOpen={openNavMobile}
        $isDesktop={isDesktop}
        onClick={() => dispatch(toggleNavMobile(false))}
      />
      <Container $isOpen={openNavMobile} $isDesktop={isDesktop}>
        <Wrapper>
          <MenuTop>
            <MenuButton
              onClick={() => dispatch(toggleNavMobile(!openNavMobile))}
            >
              <MenuIcon />
            </MenuButton>
            <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
              <Logo>
                <Img src={TubeLand} />
                TubeLand
              </Logo>
            </Link>
          </MenuTop>
          <MenuLink to={HOME} icon={<HomeIcon />} text='Home' />
          <MenuLink to={TRENDS} icon={<ExploreOutlinedIcon />} text='Explore' />
          <MenuLink
            to={SUBSCRIPTIONS}
            icon={<SubscriptionsOutlinedIcon />}
            text='Subscriptions'
          />
          <Hr />
          <MenuUserLinks currentUser={currentUser} />

          <Item onClick={() => dispatch(toggleDarkMode())}>
            <SettingsBrightnessOutlinedIcon />
            {darkMode ? 'Light' : 'Dark'} Mode
          </Item>
          <Copy>&copy; {new Date().getFullYear()} TubeLand</Copy>
        </Wrapper>
      </Container>
    </div>
  )
}

export default Menu
