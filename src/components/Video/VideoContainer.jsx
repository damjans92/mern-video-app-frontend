import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import Spinner from '../UI/Spinner'

const Container = styled.div`
  width: 100%;
  padding-top: 56.25%;
  height: 0px;
  position: relative;
`
const VideoFrame = styled.video`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  object-fit: cover;
  border-radius: 12px;
`
const VideoPlaceholder = styled.div`
  display: flex;
  background-color: #575757;
  padding-top: 56.25%;
  place-items: center;
  border-radius: 12px;
  position: relative;
`
const SpinnerContainer = styled.div`
  position: absolute;
  display: flex;
  place-items: center;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
`
const VideoContainer = () => {
  const { currentVideo, loading } = useSelector((state) => state.video)

  if (loading) {
    return (
      <VideoPlaceholder>
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      </VideoPlaceholder>
    )
  } else {
    return (
      <Container>
        <VideoFrame
          src={currentVideo?.videoUrl}
          controls
          onClick={(e) => e.currentTarget.play()}
          poster={currentVideo?.imgUrl}
        />
      </Container>
    )
  }
}

export default VideoContainer
