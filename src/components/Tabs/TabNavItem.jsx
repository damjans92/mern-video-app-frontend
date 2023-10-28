import React from 'react'
import styled from 'styled-components'

const Container = styled.li`
  display: inline-block;
  text-align: center;
  width: 130px;
  height: 30px;
  font-weight: bold;
  text-transform: uppercase;
  border-bottom: 2px solid
    ${(props) => (props.$activeTab ? props.theme.text : 'transparent')};
  color: ${(props) => (props.$activeTab ? props.theme.text : 'gray')};
  transition: 0.3s;
  cursor: pointer;
`

const TabNavItem = ({ id, title, activeTab, setActiveTab }) => {
  const handleClick = () => {
    setActiveTab(id)
  }

  return (
    <Container $activeTab={activeTab} onClick={handleClick}>
      {title}
    </Container>
  )
}

export default TabNavItem
