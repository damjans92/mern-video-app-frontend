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
  overflow-x: hidden;
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
              </Routes>
            </Wrapper>
          </Main>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  )
}
export default App
