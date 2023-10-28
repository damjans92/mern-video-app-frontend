import React, { useEffect } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  color: ${({ theme }) => theme.text};

  > h1 {
    font-size: 6rem;
  }
`

const NotFoundPage = () => {
  console.log('not found')
  useEffect(() => {}, [])
  return (
    <Container>
      <h1>404</h1>
      <p>Page not found</p>
    </Container>
  )
}

export default NotFoundPage
