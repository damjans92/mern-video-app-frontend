import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Comments from '../components/Video/Comments'
import { useSelector } from 'react-redux'
import Recommendation from '../components/Video/Recommendation'
import useMediaQuery from '../utils/useMediaQuery'
import VideoContainer from '../components/Video/VideoContainer'
import VideoDetails from '../components/Video/VideoDetails'
import ChannelDetails from '../components/Video/ChannelDetails'

const Container = styled.div`
  display: flex;
  gap: 24px;
  @media (max-width: 1024px) {
    flex-direction: column;
  }
`
const Content = styled.div`
  flex: 3.5;
`
const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`

const Hr = styled.hr`
  margin: 15px 0;
  border: 0.5px solid ${({ theme }) => theme.soft};
`

const Video = () => {
  const { currentVideo } = useSelector((state) => state.video)
  const [desktop, setDesktop] = useState(window.innerWidth > 1024)

  const isDesktop = useMediaQuery('(min-width: 1024px)')

  useEffect(() => {
    setDesktop(isDesktop)
  }, [isDesktop])

  return (
    <Container>
      <Content>
        <VideoContainer />

        <Title>{currentVideo?.title}</Title>
        <VideoDetails />
        <Hr />
        <ChannelDetails />

        <Hr />
        {!desktop && <Recommendation tags={currentVideo?.tags} />}
        <Comments videoId={currentVideo?._id} />
      </Content>
      {desktop && <Recommendation tags={currentVideo?.tags} />}
    </Container>
  )
}

export default Video
