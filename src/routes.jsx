import Home from './pages/Home'
import Search from './pages/Search'
import SignIn from './pages/SignIn'
import MyVideos from './pages/MyVideos'
import Account from './pages/Account'
import UserChannel from './pages/UserChannel'
import LikedVideos from './pages/LikedVideos'
import Video from './pages/Video'
import TermsAndConditions from './pages/TermsAndConditions'
import NotFoundPage from './pages/NotFoundPage'

// Route paths
export const HOME = '/'
export const TRENDS = '/trends'
export const SUBSCRIPTIONS = '/subscriptions'
export const SEARCH = '/search'
export const SIGNIN = '/signin'
export const USERVIDEOS = '/uservideos'
export const ACCOUNT = '/account'
export const USER_CHANNEL = '/channel/:id'
export const LIKED_VIDEOS = '/liked-videos'
export const VIDEO = '/video/:id'
export const TERMS = '/terms-and-conditions'
export const NOT_FOUND = '*'

// Routes
export const routes = [
  {
    path: HOME,
    element: <Home type='random' />,
    protected: false,
  },
  {
    path: TRENDS,
    element: <Home type='trend' />,
    protected: false,
  },
  {
    path: SUBSCRIPTIONS,
    element: <Home type='sub' />,
    protected: true,
  },
  {
    path: SEARCH,
    element: <Search />,
    protected: false,
  },
  {
    path: SIGNIN,
    element: <SignIn />,
    protected: false,
  },
  {
    path: USERVIDEOS,
    element: <MyVideos />,
    protected: true,
  },
  {
    path: ACCOUNT,
    element: <Account />,
    protected: true,
  },
  {
    path: USER_CHANNEL,
    element: <UserChannel />,
    protected: true,
  },
  {
    path: LIKED_VIDEOS,
    element: <LikedVideos />,
    protected: true,
  },
  {
    path: VIDEO,
    element: <Video />,
    protected: false,
  },
  {
    path: TERMS,
    element: <TermsAndConditions />,
    protected: false,
  },
  {
    path: NOT_FOUND,
    element: <NotFoundPage />,
    protected: false,
  },
]
