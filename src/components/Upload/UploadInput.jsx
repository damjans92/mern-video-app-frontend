import React from 'react'
import styled from 'styled-components'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import Input from '../UI/Input'

const Container = styled.div`
  border: 1px solid ${({ theme }) => theme.border};
  padding: 10px;
  display: flex;
  justify-content: center;
`

const LabelUpload = styled.label`
  cursor: pointer;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.textSoft};
  padding: 10px;
`
const MaxSize = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`
const UploadInput = ({ fileType, onChange }) => {
  return (
    <>
      <Container>
        <LabelUpload>
          {fileType === 'video' && (
            <>
              <FileUploadIcon style={{ fontSize: '40px' }} />
              Upload Video
              <Input
                id='video'
                type='file'
                accept='video/*'
                name='video'
                hidden
                onChange={onChange}
              />
            </>
          )}
          {fileType === 'image' && (
            <>
              <FileUploadIcon style={{ fontSize: '40px' }} />
              Upload Image
              <Input
                id='image'
                type='file'
                accept='image/*'
                name='image'
                hidden
                onChange={onChange}
              />
            </>
          )}
        </LabelUpload>
      </Container>
      {fileType === 'image' && <MaxSize>Max image size: 5MB</MaxSize>}
      {fileType === 'video' && <MaxSize>Max video size: 500MB</MaxSize>}
    </>
  )
}

export default UploadInput
