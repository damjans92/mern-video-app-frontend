import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { format } from 'timeago.js'
import styled from 'styled-components'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'
import { dislike, like } from '../../redux/services/videoService'

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`
const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`

const VideoDetails = () => {
  const { currentUser } = useSelector((state) => state.user)
  const { currentVideo, loading, error } = useSelector((state) => state.video)
  const dispatch = useDispatch()

  const handleDislike = async () => {
    dispatch(
      dislike({
        currentUserId: currentUser._id,
        currentVideoId: currentVideo._id,
      })
    )
  }

  const handleLike = async () => {
    dispatch(
      like({ currentUserId: currentUser._id, currentVideoId: currentVideo._id })
    )
  }

  return (
    <Details>
      <Info>
        {currentVideo?.views} views &#x2022;
        {format(currentVideo?.createdAt)}
      </Info>
      <Buttons>
        <Button onClick={handleLike}>
          {currentVideo?.likes?.includes(currentUser?._id) ? (
            <ThumbUpIcon />
          ) : (
            <ThumbUpOutlinedIcon />
          )}
          {currentVideo?.likes?.length}
        </Button>
        <Button onClick={handleDislike}>
          {currentVideo?.dislikes?.includes(currentUser?._id) ? (
            <ThumbDownIcon />
          ) : (
            <ThumbDownOutlinedIcon />
          )}
          Dislike
        </Button>
      </Buttons>
    </Details>
  )
}

export default VideoDetails
