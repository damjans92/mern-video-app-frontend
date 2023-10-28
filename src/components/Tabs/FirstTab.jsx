import React from 'react'
import styled from 'styled-components'
import Card from '../UI/Card'

const VideoWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: flex-start;
`

const FirstTab = ({ videos }) => {
  return (
    <VideoWrapper>
      {videos.map((video) => (
        <Card key={video._id} video={video} />
      ))}
    </VideoWrapper>
  )
}

export default FirstTab
