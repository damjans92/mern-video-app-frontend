import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import {
  fetchFailure,
  fetchStart,
  fetchSuccess,
} from '../../redux/slices/videoSlice'
import axiosInstance from '../../api'
import profilePic from '../../assets/profile-pic.png'
import { subscribe } from '../../redux/services/userService'

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`
const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`
const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`
const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`
const ChannelName = styled.span`
  font-weight: 500;
`

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`

const Description = styled.p`
  font-size: 14px;
`
const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`

const ChannelDetails = () => {
  const { currentUser } = useSelector((state) => state.user)
  const { currentVideo, loading, error } = useSelector((state) => state.video)
  const [channel, setChannel] = useState({})

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const path = useLocation().pathname.split('/')[2]
  const videoId = useParams().id

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchStart())
      try {
        const videoRes = await axiosInstance.get(`videos/find/${path}`)
        const channelRes = await axiosInstance.get(
          `users/find/${videoRes.data.userId}`
        )

        dispatch(fetchSuccess(videoRes.data))

        setChannel(channelRes.data)
      } catch (error) {
        dispatch(fetchFailure())
      }
    }
    fetchData()
  }, [path, videoId, dispatch])

  const handleSubscribe = async () => {
    if (!currentUser) {
      navigate('/signin')
    }
    dispatch(subscribe({ channelId: channel._id, currentUser }))
  }

  return (
    <Channel>
      <ChannelInfo>
        <Image src={channel.img ? channel.img : profilePic} />
        <ChannelDetail>
          <Link
            to={`/channel/${channel._id}`}
            state={channel}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <ChannelName>{channel.name}</ChannelName>
          </Link>
          <ChannelCounter>{channel.subscribers} subscribers</ChannelCounter>
          <Description>{currentVideo?.desc}</Description>
        </ChannelDetail>
      </ChannelInfo>
      <ChannelInfo>
        <Subscribe onClick={handleSubscribe}>
          {currentUser?.subscribedUsers?.includes(channel._id)
            ? 'SUBSCRIBED'
            : 'SUBSCRIBE'}
        </Subscribe>
      </ChannelInfo>
    </Channel>
  )
}

export default ChannelDetails
