import React from 'react'
import styled from 'styled-components'

const ContainerInput = styled.input`
  border: 1px solid ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  min-height: 20px;
  background-color: transparent;
  min-width: 220px;
  margin-bottom: 10px;
`

const Input = (props) => {
  return <ContainerInput {...props} />
}

export default Input
