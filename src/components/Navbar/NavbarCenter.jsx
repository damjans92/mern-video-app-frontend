import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Tooltip } from 'react-tooltip'
import styled from 'styled-components'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import { useDispatch, useSelector } from 'react-redux'
import { toggleSearchOff, toggleSearchOn } from '../../redux/slices/toggleSlice'

const Search = styled.div`
  width: 40%;
  position: absolute;
  left: 0px;
  right: 0px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  border: 1px solid #555;
  border-radius: 40px;
  color: ${({ theme }) => theme.text};
  @media screen and (max-width: 768px) {
    display: ${(props) => (props.$opensearch ? 'flex' : 'none')};
    z-index: 2;
    width: calc(100% - 80px);
    left: auto;
    right: 20px;
    background: ${({ theme }) => theme.bg};
  }
`
const Input = styled.input`
  width: 100%;
  border: none;
  background: transparent;
  outline: none;
  font-size: 16px;
  color: ${({ theme }) => theme.text};
`
const SearchMobile = styled.div`
  display: none;
  color: ${({ theme }) => theme.text};
  margin-left: auto;
  margin-right: 15px;
  cursor: pointer;
  @media screen and (max-width: 768px) {
    display: block;
  }
  > svg {
    font-size: 24px;
  }
`

const NavbarCenter = () => {
  const { openSearchMobile } = useSelector((state) => state.toggle)
  const dispatch = useDispatch()
  const [q, setQ] = useState('')
  const navigate = useNavigate()

  const handleSearchKeydown = async (e) => {
    if (e.key === 'Enter') {
      toggleSearchOff(false)
      navigate(`/search?q=${q}`)
    }
  }

  return (
    <>
      <Search $opensearch={openSearchMobile}>
        <Input
          placeholder='Search'
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={handleSearchKeydown}
        />
        <SearchOutlinedIcon
          onClick={() => navigate(`/search?q=${q}`)}
          style={{ cursor: 'pointer' }}
          data-tooltip-id='search-tooltip'
          data-tooltip-content='Search'
        />
        <Tooltip
          id='search-tooltip'
          style={{ backgroundColor: 'rgb(146, 146, 146)', color: '#222' }}
        />
      </Search>
      <SearchMobile onClick={() => dispatch(toggleSearchOn())}>
        <SearchOutlinedIcon className='search-icon' />
      </SearchMobile>
    </>
  )
}

export default NavbarCenter
