import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  /* background: #f0f0f0; */
  border-radius: 8px;
  width: 100%;
  height: 200px;
  margin-bottom: 20px;
  display: flex;
`

const SkeletonThumb = styled.div`
  width: 160px;
  height: 90px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
`

const SkeletonDetails = styled.div`
  flex: 1;
  padding: 10px;
`

const SkeletonTitle = styled.div`
  height: 20px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  margin-bottom: 10px;
`

const SkeletonViews = styled.div`
  height: 10px;
  width: 60%;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
`

const SkeletonCard = () => {
  return (
    <Container>
      <SkeletonThumb></SkeletonThumb>
      <SkeletonDetails>
        <SkeletonTitle></SkeletonTitle>
        <SkeletonViews></SkeletonViews>
      </SkeletonDetails>
    </Container>
  )
}

export default SkeletonCard
