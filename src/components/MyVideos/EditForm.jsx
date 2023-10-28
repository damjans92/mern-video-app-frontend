import React, { useState } from 'react'
import { styled } from 'styled-components'
import RadioInput from '../UI/RadioInput'
import Error from '../UI/Error'
import Input from '../UI/Input'
import { useDispatch, useSelector } from 'react-redux'
import { editVideo } from '../../redux/services/videoService'

const Title = styled.h1`
  text-align: center;
`
const Desc = styled.textarea`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  font-size: 14px;
  background-color: transparent;
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 600px;
`
const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  font-size: 18px;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`
const Label = styled.label`
  font-size: 18px;
`
const VisibilityWrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.border};
  padding: 10px;
  display: flex;
  justify-content: center;
  padding: 20px;
  gap: 20px;
`

const EditForm = () => {
  const { editVideoData } = useSelector((state) => state.video)
  const [inputs, setInputs] = useState({
    title: editVideoData.title,
    desc: editVideoData.desc,
    visibility: editVideoData.visibility,
  })
  const [tags, setTags] = useState(editVideoData.tags)
  const [errors, setErrors] = useState({})

  const dispatch = useDispatch()

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  const handleTags = (e) => {
    setTags(e.target.value.split(','))
  }

  const handleEdit = async (e) => {
    e.preventDefault()
    if (!inputs.title.trim().length > 0) {
      setErrors({ title: 'Title field is required' })
      return
    }
    dispatch(editVideo({ inputs, tags, editVideoData }))
  }

  return (
    <Form onSubmit={handleEdit}>
      <Title>Edit video</Title>
      <Label>Title: </Label>
      <Input
        type='text'
        name='title'
        value={inputs.title}
        onChange={handleChange}
      />
      {errors.title && <Error text={errors.title} />}
      <Label>Description: </Label>
      <Desc
        name='desc'
        value={inputs.desc}
        onChange={handleChange}
        maxLength={1000}
      />
      <Label>Tags: </Label>
      <Input
        type='text'
        name='tags'
        placeholder='Separate the tags with commas'
        value={tags}
        onChange={handleTags}
      />
      <Label>Visibility: </Label>
      <VisibilityWrapper>
        <RadioInput
          type='radio'
          name='visibility'
          value='published'
          text='Published'
          checked={inputs.visibility === 'published'}
          onChange={handleChange}
        />
        <RadioInput
          type='radio'
          name='visibility'
          value='unpublished'
          text='Unpublished'
          checked={inputs.visibility === 'unpublished'}
          onChange={handleChange}
        />
      </VisibilityWrapper>
      <Button type='submit'>Save</Button>
    </Form>
  )
}

export default EditForm
