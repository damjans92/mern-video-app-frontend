import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Modal from '../Modal'
import EditForm from './EditForm'
import { toggleEditVideo } from '../../redux/slices/toggleSlice'

const EditModalContainer = () => {
  const { openEditVideo } = useSelector((state) => state.toggle)
  const dispatch = useDispatch()

  return (
    <div>
      <Modal
        open={openEditVideo}
        onClose={() => dispatch(toggleEditVideo(false))}
      >
        <EditForm />
      </Modal>
    </div>
  )
}

export default EditModalContainer
