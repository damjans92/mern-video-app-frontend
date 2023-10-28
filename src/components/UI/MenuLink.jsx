import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const NavLinkStyled = styled(NavLink)`
  text-decoration: none;
  color: inherit;
  display: inline-block;
  width: 100%;
  transition: 0.2s;
  border-radius: 12px;
  padding: 3px 0;
  &:hover {
    background-color: ${({ theme }) => theme.navActiveBg};
  }
  &.active {
    background-color: ${({ theme }) => theme.navActiveBg};
  }
  &.active:hover {
    background-color: ${({ theme }) => theme.navActiveBgHover};
  }
  &:focus {
    background-color: ${({ theme }) => theme.navActiveBgHover};
  }
`
const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  padding: 7.5px 10px;
`

const MenuLink = ({ to, icon, text }) => {
  return (
    <NavLinkStyled to={to}>
      <Item>
        {icon} {text}
      </Item>
    </NavLinkStyled>
  )
}

MenuLink.propTypes = {
  to: PropTypes.string.isRequired, // URL for the link
  icon: PropTypes.node.isRequired, // React element for the icon (e.g., an SVG icon)
  text: PropTypes.string.isRequired, // Text to display next to the icon
}

export default MenuLink
