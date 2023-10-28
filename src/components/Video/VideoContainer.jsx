import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

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
  width: 100%;
  place-items: center;
  border-radius: 12px;
`

const VideoContainer = () => {
  const { currentVideo, loading, error } = useSelector((state) => state.video)

  if (loading) {
    return (
      <VideoPlaceholder>
        <p>LOADING...</p>
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
