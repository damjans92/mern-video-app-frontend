import React, { useEffect } from 'react'
import styled from 'styled-components'
import MyVideosTable from '../components/MyVideos/MyVideosTable'

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding-top: 50px;
  width: 100%;
`

const MyVideos = () => {
  useEffect(() => {
    console.log('first')
  }, [])

  return (
    <>
      <Container>
        <br />
        <Wrapper>
          <MyVideosTable />
        </Wrapper>
      </Container>
    </>
  )
}

export default MyVideos
