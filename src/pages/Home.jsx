import React, { useEffect, useState } from 'react'
import Card from '../components/UI/Card'
import { styled } from 'styled-components'
import axiosInstance from '../api'
import { toast } from 'react-toastify'
import Spinner from '../components/UI/Spinner'

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: flex-start;
`
const EndText = styled.p`
  background-color: ${({ theme }) => theme.bgLighter};
  padding: 10px;
  border-radius: 12px;
  width: 100%;
  text-align: center;
  color: ${({ theme }) => theme.textSoft};
`
const Home = ({ type }) => {
  const [videos, setVideos] = useState([])
  const [skip, setSkip] = useState(0)
  const [isEnd, setIsEnd] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setVideos([])
    setSkip(0)
  }, [type])

  useEffect(() => {
    fetchVideos()
  }, [skip, type])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  })

  const fetchVideos = async () => {
    setLoading(true)
    try {
      const res = await axiosInstance.get(
        `videos/${type}?skip=${skip}&limit=5`,
        {
          withCredentials: true,
        }
      )

      if (res.data?.length === 0) {
        setIsEnd(true)
      }

      setVideos((prevVideos) => [...prevVideos, ...res.data])
      setLoading(false)
    } catch (error) {
      toast.error(error.message)
      setLoading(false)
    }
  }

  const handleScroll = (e) => {
    if (
      window.innerHeight + Math.round(window.scrollY) >=
      document.body.offsetHeight
    ) {
      setSkip(videos?.length)
    }
  }

  return (
    <Container onScroll={handleScroll}>
      {videos.map((video, index) => (
        <Card key={index} video={video} />
      ))}
      {loading && <Spinner />}
      {videos.length > 0 && isEnd && <EndText>No more videos to show</EndText>}
      {videos.length == 0 && (
        <EndText>You haven&apos;t subscribed to a channel yet.</EndText>
      )}
    </Container>
  )
}

export default Home
