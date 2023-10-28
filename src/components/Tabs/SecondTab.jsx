import React from 'react'
import styled from 'styled-components'

const AboutText = styled.p`
  padding: 50px;
  max-width: 1280px;
  color: ${({ theme }) => theme.text};
`

const SecondTab = ({ channelDesc }) => {
  return <AboutText>{channelDesc}</AboutText>
}

export default SecondTab
