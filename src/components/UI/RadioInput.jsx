import React from 'react'
import styled from 'styled-components'

const Label = styled.label`
  color: ${({ theme }) => theme.textSoft};
  font-size: 16px;
  font-weight: 400;
  margin-right: 7px;
  -webkit-tap-highlight-color: transparent;
  cursor: pointer;
`

const Input = styled.input`
  margin: 0;
  visibility: hidden;

  &:checked + span {
    border: 2px solid #f4b400;
  }
  &:checked + span:after {
    opacity: 1;
  }
`

const Span = styled.span`
  left: -8px;
  top: 4px;
  cursor: pointer;
  width: 16px;
  height: 16px;
  border: 2px solid #9a9a9a;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  &::after {
    content: '';
    width: 10px;
    height: 10px;
    background: #f4b400;
    position: absolute;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    transition: opacity 0.2s;
  }
`

const RadioInput = ({ name, id, value, onChange, checked, text }) => {
  return (
    <Label htmlFor={id}>
      <Input
        type='radio'
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        checked={checked}
      />
      <Span />
      {text}
    </Label>
  )
}

export default RadioInput
