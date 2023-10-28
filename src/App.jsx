import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import styled, { ThemeProvider } from 'styled-components'
import { darkTheme, lightTheme } from './utils/Theme'
import { ToastContainer } from 'react-toastify'
import { routes } from './routes'
import AxiosInterceptor from './components/AxiosInterceptor'
import Menu from './components/Menu'
import Navbar from './components/Navbar/Navbar'
import 'react-toastify/dist/ReactToastify.css'

import './App.css'

const Container = styled.div`
  display: flex;
`
const Main = styled.div`
  flex: 7;
  background-color: ${({ theme }) => theme.bg};
`
const Wrapper = styled.div`
  padding: 52px 30px;
  min-height: calc(100vh - 60px);
  @media screen and (min-width: 1280px) {
    margin-left: 240px;
  }
  @media screen and (max-width: 992px) {
    padding: 22px 26px;
  }
`

function App() {
  const { darkMode } = useSelector((state) => state.toggle)
  const hasUser = useSelector((state) => state.user.currentUser)

  function RequireAuth({ children, redirectTo }) {
    let isAuthenticated = hasUser
    return isAuthenticated ? children : <Navigate to={redirectTo} />
  }

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <BrowserRouter>
        <ToastContainer
          position='top-center'
          theme={darkMode ? 'dark' : 'light'}
        />
        <AxiosInterceptor />
        <Navbar />
        <Container>
          <Menu />
          <Main>
            <Wrapper>
              <Routes>
                {routes.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      route.protected ? (
                        <RequireAuth redirectTo='/signin'>
                          {route.element}
                        </RequireAuth>
                      ) : (
                        route.element
                      )
                    }
                  />
                ))}
                {/* {routes.map((route, index) => (
                  <Route key={index} path={route.path}>
                    {route.protected ? (
                      <RequireAuth redirectTo='/signin'>
                        {route.element}
                      </RequireAuth>
                    ) : (
                      route.element
                    )}
                  </Route>
                ))} */}
                {/* <Route path='/'>
                  <Route index element={<Home type='random' />} />
                  <Route path='trends' element={<Home type='trend' />} />
                  <Route
                    path='/subscriptions'
                    element={
                      <RequireAuth redirectTo='/signin'>
                        <Home type='sub' />
                      </RequireAuth>
                    }
                  />
                  <Route path='search' element={<Search />} />
                  <Route path='signin' element={<SignIn />} />
                  <Route
                    path='uservideos'
                    element={
                      <RequireAuth redirectTo='/signin'>
                        <MyVideos />
                      </RequireAuth>
                    }
                  />
                  <Route
                    path='account'
                    element={
                      <RequireAuth redirectTo='/signin'>
                        <Account />
                      </RequireAuth>
                    }
                  />
                  <Route
                    path='channel/:id'
                    element={
                      <RequireAuth redirectTo='/signin'>
                        <UserChannel />
                      </RequireAuth>
                    }
                  />
                  <Route
                    path='liked-videos'
                    element={
                      <RequireAuth redirectTo='/signin'>
                        <LikedVideos />
                      </RequireAuth>
                    }
                  />
                  <Route path='video/:id' element={<Video />} />
                </Route>
                <Route
                  path='terms-and-conditions'
                  element={<TermsAndConditions />}
                />
                <Route path='*' element={<NotFoundPage />} /> */}
              </Routes>
            </Wrapper>
          </Main>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  )
}
export default App
