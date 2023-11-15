import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import Button from '../UI/Button'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import profilePic from '../../assets/profile-pic.png'
import ProgressBar from '../Upload/ProgressBar'
import { uploadProfileImage } from '../../firebase/firebaseStorage'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 30px;
  align-items: center;
`
const PhotoPreview = styled.div`
  display: flex;
  justify-content: center;
  cursor: pointer;
  position: relative;
  border-radius: 50%;
  width: 128px;
  height: 128px;
  overflow: hidden;
`
const Edit = styled.div`
  position: absolute;
  width: 100%;
  bottom: 0;
  text-align: center;
  background: rgba(0, 0, 0, 0.4);
  height: 27px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`

const ProfileImage = () => {
  const { currentUser } = useSelector((state) => state.user)
  const [imageToUpload, setImageToUpload] = useState(null)
  const [imagePerc, setImagePerc] = useState(null)
  const [previewImage, setPreviewImage] = useState(
    currentUser.img ? currentUser.img : profilePic
  )

  const fileRef = useRef()
  const dispatch = useDispatch()

  const handleSelectImage = (event) => {
    const file = event.target.files[0]
    setImageToUpload(file)
    const fileReader = new FileReader()
    fileReader.addEventListener('load', () => {
      setPreviewImage(fileReader.result)
    })
    fileReader.readAsDataURL(file)
  }

  const handleUploadImage = () => {
    if (!imageToUpload) {
      toast.error('You have to select an image first')
      return
    }
    uploadProfileImage(imageToUpload, setImagePerc, currentUser._id, dispatch)
  }

  return (
    <Container>
      <input
        type='file'
        id='selectImage'
        accept='image/*'
        hidden
        onChange={handleSelectImage}
        ref={fileRef}
      />

      <PhotoPreview onClick={() => fileRef.current.click()}>
        <img src={previewImage} alt='' />
        <Edit>Edit</Edit>
      </PhotoPreview>
      {imagePerc > 0 && <ProgressBar uploadPerc={imagePerc} />}
      <Button onClick={handleUploadImage} title='Upload' />
    </Container>
  )
}

export default ProfileImage
