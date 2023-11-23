import React, { useEffect, useState } from 'react'
import axiosInstance from '../../api'
import { useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'
import { toast } from 'react-toastify'
import { validateUploadForm } from './validateUploadForm'
import RadioInput from '../UI/RadioInput'
import Error from '../UI/Error'
import Input from '../UI/Input'
import Button from '../UI/Button'
import ProgressBar from './ProgressBar'
import UploadInput from './UploadInput'
import { uploadFile } from '../../firebase/firebaseStorage'

const Title = styled.h2`
  text-align: center;
  margin: 0;
`

const Desc = styled.textarea`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  font-size: 13px;
  border-radius: 3px;
  padding: 10px;
  min-height: 20px;
  background-color: transparent;
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 600px;
  @media screen and (max-width: 640px) {
    width: auto;
  }
`

const VisibilityWrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.border};
  padding: 10px;
  display: flex;
  justify-content: center;
  padding: 20px;
  gap: 20px;
`

const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 15px;
  position: relative;
`
const MaxChars = styled.div`
  font-size: 14px;
  color: #858585;
  position: absolute;
  bottom: 5px;
  right: 40px;
`
const UploadForm = ({ setOpen }) => {
  const [imagePerc, setImagePerc] = useState(0)
  const [videoPerc, setVideoPer] = useState(0)
  const [inputs, setInputs] = useState({
    title: '',
    desc: '',
    video: undefined,
    image: undefined,
    visibility: 'unpublished',
  })
  const [tags, setTags] = useState([])
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const maxChars = 1000

  const navigate = useNavigate()

  const handleChange = (e, fileType) => {
    if (fileType === 'image' && e.target.files[0].size > 5 * 1024 * 1024) {
      toast.error('File bigger than 5MB is not allowed')
      return false
    }
    if (fileType === 'video' && e.target.files[0].size > 200 * 1024 * 1024) {
      toast.error('File bigger than 200MB is not allowed')
      return false
    }
    const value = e.target.type === 'file' ? e.target.files[0] : e.target.value
    setInputs((prev) => {
      return {
        ...prev,
        [e.target.name]: value,
      }
    })
  }

  const handleTags = (e) => {
    const tags = e.target.value.split(',')
    const tagsTrimmed = tags.map((word) => word.trim())
    setTags(tagsTrimmed)
  }

  useEffect(() => {
    inputs.video &&
      uploadFile(inputs.video, 'videoUrl', 'videos/', setVideoPer, setInputs)
  }, [inputs.video])

  useEffect(() => {
    inputs.image &&
      uploadFile(inputs.image, 'imgUrl', 'images/', setImagePerc, setInputs)
  }, [inputs.image])

  const handleUpload = async (e) => {
    e.preventDefault()

    if (validateUploadForm(inputs, setErrors)) {
      setLoading(true)
      try {
        const obj = {
          ...inputs,
          tags,
        }
        console.log(obj)
        const res = await axiosInstance.post(
          'videos',
          {
            ...inputs,
            tags,
          },
          {
            withCredentials: true,
          }
        )
        res.status === 200 && navigate(`/video/${res.data._id}`)
        setLoading(false)
        setOpen(false)
        toast.success('Video uploaded successfully!')
      } catch (error) {
        setLoading(false)
        toast.error('Error while uploading video')
      }
    }
  }

  return (
    <Form onSubmit={handleUpload}>
      <Title>Upload a New Video</Title>
      <Label>Video </Label>

      {videoPerc > 0 ? (
        <ProgressBar uploadPerc={videoPerc} />
      ) : (
        <UploadInput
          fileType='video'
          onChange={(e) => handleChange(e, 'video')}
        />
      )}
      {errors.video && <Error text={errors.video} />}
      <Label>
        Title
        <Input
          type='text'
          placeholder='Title'
          name='title'
          onChange={handleChange}
        />
      </Label>
      {errors.title && <Error text={errors.title} />}
      <Label>
        Description
        <Desc
          rows={5}
          name='desc'
          placeholder='Write something about yourself...'
          onChange={handleChange}
          maxLength={1000}
        />
        <MaxChars>
          {inputs.desc.length} / {maxChars}
        </MaxChars>
      </Label>
      <Label>
        Tags
        <Input
          type='text'
          placeholder='Separate the tags with commas'
          onChange={handleTags}
        />
      </Label>
      <Label>Thumbnail image</Label>
      {imagePerc > 0 ? (
        <ProgressBar uploadPerc={imagePerc} />
      ) : (
        <UploadInput
          fileType='image'
          onChange={(e) => handleChange(e, 'image')}
        />
      )}
      {errors.image && <Error text={errors.image} />}
      <Label>
        Visibility
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
      </Label>
      <Button type='submit' title='Upload' fontSize='16px' disabled={loading} />
    </Form>
  )
}

export default UploadForm
