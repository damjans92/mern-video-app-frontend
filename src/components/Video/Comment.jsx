import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import DeleteIcon from '@mui/icons-material/Delete'
import axiosInstance from '../../api'
import { useDispatch, useSelector } from 'react-redux'
import profilePic from '../../assets/profile-pic.png'
import { format } from 'timeago.js'
import { deleteComment } from '../../redux/services/commentService'

const Container = styled.div`
  display: flex;
  gap: 10px;
  margin: 30px 0;
  position: relative;
`
const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${({ theme }) => theme.text};
`

const Name = styled.span`
  font-size: 13px;
  font-weight: 500;
`
const Date = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft};
  margin-left: 5px;
`
const Text = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.text};
`
const Icon = styled.div`
  position: absolute;
  right: 0;
  cursor: pointer;
  display: none;
  ${Container}:hover & {
    display: block;
  }
`
const Comment = ({ comment }) => {
  const [channel, setChannel] = useState({})
  const { currentUser } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchUser = async () => {
      const channelRes = await axiosInstance.get(`users/find/${comment.userId}`)
      setChannel(channelRes.data)
    }
    fetchUser()
  }, [comment.userId])

  const handleDeleteComment = async () => {
    dispatch(deleteComment({ commentId: comment._id }))
  }

  return (
    <Container>
      <Avatar src={channel?.img ? channel.img : profilePic} />
      <Details>
        <Name>
          {channel?.name} <Date>{format(comment.createdAt)}</Date>
        </Name>
        <Text>{comment.desc}</Text>
        {currentUser?._id === comment.userId && (
          <Icon onClick={handleDeleteComment}>
            <DeleteIcon
              sx={{
                color: '#515151',
                transition: '0.2s',
                '&:hover': { color: '#b6b6b6' },
              }}
            />
          </Icon>
        )}
      </Details>
    </Container>
  )
}

export default Comment
