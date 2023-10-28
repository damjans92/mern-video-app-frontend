import React from 'react'
import styled from 'styled-components'

const Container = styled.span`
  color: #aa1a1a;
  display: block;
  margin-bottom: 5px;
  &::first-letter {
    text-transform: capitalize;
  }
`

const Error = ({ text }) => {
  return <Container>{text}</Container>
}

export default Error
