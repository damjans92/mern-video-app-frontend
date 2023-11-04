import React from 'react'
import { createPortal } from 'react-dom'
import styled, { keyframes } from 'styled-components'
import CloseIcon from '@mui/icons-material/Close'

const fade = keyframes`
from {
    opacity: 0
  }

  to {
    opacity: 9
  }
`

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.507);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99;
  animation: ${fade} 0.2s ease-in;
`

const Wrapper = styled.div`
  height: auto;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.border};
  padding: 20px;
  padding-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  overflow-y: auto;
  @media screen and (max-width: 640px) {
    top: 100px;
  }
`
const Close = styled.div`
  right: 10px;
  top: 10px;
  cursor: pointer;
  position: absolute;
`

function Modal({ open, children, onClose }) {
  if (!open) return null

  return createPortal(
    <Container>
      <Wrapper>
        <Close onClick={onClose}>
          <CloseIcon />
        </Close>

        {children}
      </Wrapper>
    </Container>,
    document.getElementById('portal')
  )
}

export default Modal
