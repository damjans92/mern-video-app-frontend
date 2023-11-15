import React from 'react'
import styled, { css } from 'styled-components'

const Container = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  font-size: ${(props) => (props.fontSize ? props.fontSize : '14px')};
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
  &:hover {
    background-color: ${({ theme }) => theme.btnHover};
  }

  ${(props) =>
    props.disabled &&
    css`
      cursor: not-allowed;
      background-color: #838383;
      pointer-events: none;
    `}
`

const Button = ({
  title,
  type = 'button',
  onClick,
  fontSize = '14px',
  disabled,
}) => {
  return (
    <Container
      type={type}
      onClick={onClick}
      fontSize={fontSize}
      disabled={disabled}
    >
      {title}
    </Container>
  )
}

export default Button
