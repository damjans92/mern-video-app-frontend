import React from 'react'
import styled from 'styled-components'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { Tooltip } from 'react-tooltip'
import { toggleEditVideo } from '../../redux/slices/toggleSlice'
import { useDispatch } from 'react-redux'
import { setEditVideoData } from '../../redux/slices/videoSlice'
import { deleteVideo } from '../../redux/services/videoService'

const Container = styled.div`
  display: flex;
  gap: 10px;
  @media screen and (max-width: 600px) {
    justify-content: end;
  }
`
const DeleteButton = styled.div`
  cursor: pointer;
  margin-top: 10px;
`
const EditButton = styled.div`
  cursor: pointer;
  margin-top: 10px;
`

const ActionButtons = React.memo(({ video }) => {
  const dispatch = useDispatch()

  const handleDeleteVideo = async (videoId, imgUrl, videoUrl) => {
    dispatch(deleteVideo({ videoId, imgUrl, videoUrl }))
  }

  const handleOnClickEdit = () => {
    dispatch(setEditVideoData(video))

    dispatch(toggleEditVideo(true))
  }

  return (
    <Container>
      <EditButton onClick={handleOnClickEdit}>
        <EditIcon data-tooltip-id='edit-tooltip' data-tooltip-content='Edit' />

        <Tooltip
          id='edit-tooltip'
          style={{
            backgroundColor: 'rgb(146, 146, 146)',
            color: '#222',
          }}
        />
      </EditButton>
      <DeleteButton
        onClick={() =>
          handleDeleteVideo(video._id, video.imgUrl, video.videoUrl)
        }
      >
        <DeleteIcon
          sx={{
            color: '#b42828',
          }}
          data-tooltip-id='edit-tooltip'
          data-tooltip-content='Delete'
        />
        <Tooltip
          id='delete-tooltip'
          style={{
            backgroundColor: 'rgb(146, 146, 146)',
            color: '#222',
          }}
        />
      </DeleteButton>
    </Container>
  )
})

ActionButtons.displayName = 'ActionButtons'

export default ActionButtons
