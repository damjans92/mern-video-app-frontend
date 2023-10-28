export const validateUploadForm = (inputs, setErrors) => {
  const errors = {}

  if (!inputs.title) errors.title = 'Title is a required field'
  if (!inputs.video) errors.video = 'Video is a required field'
  if (!inputs.image) errors.image = 'Thumbnail image is a required field'
  setErrors(errors)
  if (Object.keys(errors).length === 0) {
    return true
  } else {
    return false
  }
}
