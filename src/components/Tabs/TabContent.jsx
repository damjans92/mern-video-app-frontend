import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  padding-top: 50px;
`
const TabContent = ({ id, activeTab, children }) => {
  return activeTab === id ? <Container>{children}</Container> : null
}

export default TabContent
