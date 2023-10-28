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

const UploadButton = styled.button`
  background-color: #559adb;
  font-weight: 500;
  font-size: 16px;
  width: max-content;
  color: #292929;
  border: none;
  border-radius: 20px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
  margin: 0 auto;
`
const CameraImg = styled.img`
  margin: 0 auto;
  width: 150px;
`
const TitleUpload = styled.h2`
  font-weight: normal;
  color: ${({ theme }) => theme.text};
  text-align: center;
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
