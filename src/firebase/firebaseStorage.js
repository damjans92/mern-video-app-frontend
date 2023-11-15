import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage'
import app from '../firebase'
import { toast } from 'react-toastify'
import { updateUserImg } from '../redux/services/userService'

// Delete image or video
export const deleteFile = async (fileUrl) => {
  const storage = getStorage(app)
  const fileRef = ref(storage, fileUrl)
  try {
    await deleteObject(fileRef)
    console.log(`File ${fileUrl} deleted successfully.`)
  } catch (error) {
    throw error
  }
}

// Upload video
export const uploadFile = async (
  file,
  urlType,
  folder,
  setPercentage,
  setInputs
) => {
  const storage = getStorage(app)
  const fileName = new Date().getTime() + file.name
  const storageRef = ref(storage, folder + fileName)
  const customMetadata = {
    userEmail: 'customValue',
  }

  const uploadTask = uploadBytesResumable(storageRef, file)
  // Listen for state changes, errors, and completion of the upload.
  uploadTask.on(
    'state_changed',
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      setPercentage(Math.round(progress))
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused')
          break
        case 'running':
          console.log('Upload is running')
          break
        default:
          break
      }
    },
    (error) => {
      toast.error('There was an error while uploading video')
    },
    () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log(downloadURL)
        setInputs((prev) => {
          return { ...prev, [urlType]: downloadURL }
        })
      })
    }
  )
}

// Upload profile image
export const uploadProfileImage = async (
  file,
  setPercentage,
  currentUserId,
  currentUserEmail,
  dispatch
) => {
  const storage = getStorage(app)
  const fileName = new Date().getTime() + file.name
  const storageRef = ref(storage, 'images/' + fileName)
  const customMetadata = {
    userEmail: currentUserEmail,
  }

  const uploadTask = uploadBytesResumable(storageRef, file, customMetadata)

  // Listen for state changes, errors, and completion of the upload.
  uploadTask.on(
    'state_changed',
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      setPercentage(Math.round(progress))
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused')
          break
        case 'running':
          console.log('Upload is running')
          break
        default:
          break
      }
    },
    (error) => {
      switch (error.code) {
        case 'storage/unauthorized':
          toast.error(`User doesn't have permission to access the object`)
          break
        case 'storage/canceled':
          toast.error(`User canceled the upload`)
          break
        case 'storage/unknown':
          toast.error(`Unknown error occurred, inspect error.serverResponse`)
          break
      }
    },
    () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('stigao u downlaod')
        const updateImage = async () => {
          dispatch(updateUserImg({ currentUserId, downloadURL }))
        }
        updateImage()
      })
    }
  )
}
