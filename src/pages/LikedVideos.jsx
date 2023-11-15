import React, { useEffect, useState } from 'react'
import axiosInstance from '../api'
import Card from '../components/UI/Card'

import styled from 'styled-components'
import { toast } from 'react-toastify'

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  width: 100%;
`

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.bgLighter};
  padding: 20px 10px;
  width: 100%;
`
const Row = styled.div`
  display: flex;
  flex-direction: row;
`
const Number = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 15px;
  color: ${({ theme }) => theme.textSoft};
`
const H1 = styled.h1`
  color: ${({ theme }) => theme.text};
`
const H3 = styled.h3`
  color: ${({ theme }) => theme.textSoft};
  text-align: center;
`

const LikedVideos = () => {
  const [videos, setVideos] = useState([])

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axiosInstance.get(`videos/liked`, {
          withCredentials: true,
        })
        setVideos(res.data)
      } catch (error) {
        toast.error(error.message)
      }
    }
    fetchVideos()
  }, [])

  return (
    <Container>
      <H1>Liked Videos</H1>
      <Wrapper>
        {videos.length > 0 ? (
          videos.map((video, index) => (
            <Row key={video._id}>
              <Number>{index + 1}</Number>
              <Card video={video} type='sm' />
            </Row>
          ))
        ) : (
          <H3>You have not liked any videos yet.</H3>
        )}
      </Wrapper>
    </Container>
  )
}

export default LikedVideos
