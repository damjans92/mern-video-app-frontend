import React, { useEffect } from 'react'
import styled from 'styled-components'
import dateFormat from 'dateformat'
import ActionButtons from './ActionButtons'
import { useDispatch, useSelector } from 'react-redux'
import Modal from '../Modal'
import {
  toggleEditVideo,
  toggleOpenUpload,
} from '../../redux/slices/toggleSlice'
import EditForm from './EditForm'
import { fetchMyVideos } from '../../redux/services/videoService'
import Spinner from '../UI/Spinner'
import camera from '../../assets/icons8-video-camera-100.png'
import EditModalContainer from './EditModalContainer'

const VideoTitle = styled.div`
  display: flex;
  gap: 21px;
  @media screen and (max-width: 600px) {
    gap: 21px;
    flex-direction: column;
    justify-content: end;
    align-items: flex-end;
    margin-top: 30px;
  }
`
const Thumb = styled.img`
  width: 150px;
  height: 100px;
  object-fit: cover;
`

const Title = styled.h3`
  min-width: 200px;
  flex: auto;
  max-width: 400px;
  font-weight: 400;
  margin-top: 10px;
`
const TableContainer = styled.div`
  max-height: 600px;
  overflow-y: auto;
`
const Table = styled.table`
  color: ${({ theme }) => theme.text};
  border-collapse: collapse;
  background: ${({ theme }) => theme.bg};
  width: 100%;
`
const THead = styled.thead`
  @media screen and (max-width: 600px) {
    border: none;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }
`
const TBody = styled.tbody``
const TR = styled.tr`
  border: 1px solid ${({ theme }) => theme.border};
  @media screen and (max-width: 600px) {
    border-bottom: 3px solid ${({ theme }) => theme.border};
    display: block;
    margin-bottom: 0.625em;
  }
`
const TH = styled.th`
  padding: 10px;
  font-weight: 600;
  text-align: left;
`
const TD = styled.td`
  padding: 10px;
  text-align: left;
  width: auto;
  vertical-align: top;
  font-size: 14px;
  > span {
    display: block;
    padding-top: 10px;
  }
  @media screen and (max-width: 600px) {
    border-bottom: 1px solid ${({ theme }) => theme.border};
    display: block;
    font-size: 0.8em;
    text-align: right;

    &::before {
      content: attr(data-label);
      float: left;
      font-weight: bold;
      text-transform: uppercase;
    }

    &:last-child {
      border-bottom: 0;
    }
  }
`
const UploadButton = styled.button`
  background-color: #559adb;
  font-weight: 500;
  font-size: 16px;
  width: max-content;
  color: #292929;
  border: none;
  border-radius: 20px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
  margin: 0 auto;
`
const CameraImg = styled.img`
  margin: 0 auto;
  width: 150px;
`
const TitleUpload = styled.h2`
  font-weight: normal;
  color: ${({ theme }) => theme.text};
  text-align: center;
`
const MyVideosTable = () => {
  const { videoList, loading } = useSelector((state) => state.video)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchMyVideos())
  }, [])

  if (loading && videoList.length > 0) {
    return <Spinner />
  }

  if (!loading && videoList.length == 0) {
    return (
      <>
        <CameraImg src={camera} width='100' />
        <TitleUpload>Upload a video to get started</TitleUpload>
        <UploadButton onClick={() => dispatch(toggleOpenUpload(true))}>
          Upload video
        </UploadButton>
      </>
    )
  }

  if (!loading && videoList.length > 0) {
    return (
      <>
        <TableContainer>
          <Table>
            <THead>
              <TR>
                <TH style={{ textAlign: 'left' }}>Video</TH>
                <TH>Visibility</TH>
                <TH>Date</TH>
                <TH>Views</TH>
                <TH>Likes</TH>
                <TH>Actions</TH>
              </TR>
            </THead>
            <TBody>
              {videoList?.map((video) => (
                <TR key={video._id}>
                  <TD data-label='Video'>
                    <VideoTitle>
                      <Thumb src={video.imgUrl} alt='video thumb' />
                      <Title>{video.title}</Title>
                    </VideoTitle>
                  </TD>

                  <TD
                    data-label='Visibility'
                    style={{ textTransform: 'capitalize' }}
                  >
                    <span>{video.visibility}</span>
                  </TD>
                  <TD data-label='Date'>
                    <span>{dateFormat(video.createdAt, 'mmm d, yyyy')}</span>
                  </TD>
                  <TD data-label='Views'>
                    <span>{video.views}</span>
                  </TD>
                  <TD data-label='Likes'>
                    <span> {video.likes.length}</span>
                  </TD>
                  <TD data-label='Actions'>
                    <ActionButtons video={video} />
                  </TD>
                </TR>
              ))}
            </TBody>
          </Table>
        </TableContainer>
        <EditModalContainer />
      </>
    )
  }
}

export default MyVideosTable
