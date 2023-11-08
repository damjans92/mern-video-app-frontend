import { useDispatch } from 'react-redux'
import { logout } from '../redux/services/userService'
import axiosInstance from '../api'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const AxiosInterceptor = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const UNAUTHORIZED = 401
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      const { status } = error.response
      if (status === UNAUTHORIZED) {
        // dispatch(logout({ navigate }))
        toast.info('Your session has expired. Sign in again.')
      }
      return Promise.reject(error)
    }
  )

  return null
}

export default AxiosInterceptor
