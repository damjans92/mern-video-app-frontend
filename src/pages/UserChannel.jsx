import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosInstance from '../api'
import styled from 'styled-components'
import profilePic from '../assets/profile-pic.png'
import Tabs from '../components/Tabs/Tabs'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  flex-direction: column;
`
const ChannelImage = styled.div`
  border-radius: 50%;
  overflow: hidden;
  width: 170px;
  height: 170px;

  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`
const ChannelInfo = styled.div`
  display: flex;
  margin-top: 30px;
  padding-left: 5%;
  gap: 30px;
`
const ChannelDetails = styled.div`
  color: ${({ theme }) => theme.textSoft};
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 15px;
`
const ChannelName = styled.div`
  color: ${({ theme }) => theme.text};
  font-size: 26px;
`
const About = styled.p`
  max-width: 700px;
  color: ${({ theme }) => theme.textSoft};
`

const UserChannel = () => {
  const [videos, setVideos] = useState([])
  const [channel, setChannel] = useState({})
  const { id } = useParams()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchChannel = async () => {
      setLoading(true)
      try {
        const res = await axiosInstance.get(`users/find/${id}`)
        console.log(res.data)
        setChannel(res.data)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.log(error)
      }
    }
    const fetchChannelVideos = async () => {
      try {
        const res = await axiosInstance.get(`videos/finduservideos/${id}`)
        console.log(res.data)
        setVideos(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchChannel()
    fetchChannelVideos()
  }, [id])
  return (
    <Container>
      <ChannelInfo>
        <ChannelImage>
          <img
            src={channel.img ? channel.img : profilePic}
            alt='User profile image'
          />
        </ChannelImage>
        <ChannelDetails>
          <ChannelName>{channel.name}</ChannelName>
          <span>{channel.subscribers} subscribers</span>
          <About>{channel.desc ? channel.desc : 'No description'}</About>
        </ChannelDetails>
      </ChannelInfo>

      <Tabs videos={videos} channelDesc={channel.desc} />
    </Container>
  )
}

export default UserChannel
