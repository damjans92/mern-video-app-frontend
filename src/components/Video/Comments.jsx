import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Comment from './Comment'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import profilePic from '../../assets/profile-pic.png'
import { addComment, fetchComments } from '../../redux/services/commentService'

const Container = styled.div``
const NewComment = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
`
const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`
const Form = styled.form`
  width: 100%;
`
const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 7px 0px;
  width: 100%;
  font-size: 16px;
  transition: 0.2s;
  &:focus {
    border-bottom: 1px solid ${({ theme }) => theme.text};
  }
`
const Buttons = styled.div`
  display: flex;
  justify-content: end;
  gap: 15px;
  padding-top: 10px;
  font-size: 16px;
`
const ButtonCancel = styled.button`
  font-size: 16px;
  background-color: transparent;
  font-weight: bold;
  border: none;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
`
const ButtonAdd = styled.button`
  font-size: 16px;
  background-color: #559adb;
  font-weight: bold;
  font-size: 16px;
  width: max-content;
  color: #292929;
  border: none;
  border-radius: 20px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
  &:disabled {
    background-color: #494949;
    color: #979797;
  }
`

const Comments = ({ videoId }) => {
  const { currentUser } = useSelector((state) => state.user)
  const { allComments } = useSelector((state) => state.comments)
  const [newComment, setNewComment] = useState('')
  const [showButtons, setShowButtons] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchComments({ videoId }))
  }, [videoId, dispatch])

  const handleClickComment = (e) => {
    e.preventDefault()
    if (!currentUser) {
      navigate('/signin')
    }
    setShowButtons(true)
  }

  const handleAddComment = async (e) => {
    e.preventDefault()
    if (!newComment.trim().length > 0) return
    dispatch(
      addComment({ currentUserId: currentUser._id, videoId, newComment })
    )
    setNewComment('')
  }

  return (
    <Container>
      <NewComment>
        <Avatar src={currentUser?.img ? currentUser.img : profilePic} />
        <Form onSubmit={handleAddComment}>
          <Input
            placeholder='Add a comment...'
            onChange={(e) => setNewComment(e.target.value)}
            onClick={handleClickComment}
            value={newComment}
          />
          {showButtons && (
            <Buttons>
              <ButtonCancel onClick={() => setShowButtons(false)}>
                Cancel
              </ButtonCancel>
              <ButtonAdd type='submit' disabled={newComment.length == 0}>
                Comment
              </ButtonAdd>
            </Buttons>
          )}
        </Form>
      </NewComment>
      {allComments?.map((comment) => (
        <Comment key={comment._id} comment={comment} />
      ))}
    </Container>
  )
}

export default Comments
