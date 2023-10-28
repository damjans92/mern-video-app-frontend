import React from 'react'
import styled from 'styled-components'

const ProgressWrap = styled.div``
const ProgressContainer = styled.div`
  width: 100%;
  height: 5px;
`
const Progress = styled.div`
  height: 100%;
  margin-top: 12px;
  width: ${({ percentage }) => percentage + '%'};
  background: -webkit-linear-gradient(
    to right,
    #bd0909,
    #d78d00
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #bd0909, #d78d00);
  background-size: 600px 5px;
  border-radius: 5px;
  transition: all 0.3s;
`
const ProgressPerc = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.textSoft};
  text-align: right;
`

const ProgressBar = ({ uploadPerc }) => {
  return (
    <ProgressWrap>
      <ProgressPerc>Uploading: {uploadPerc + '%'}</ProgressPerc>
      <ProgressContainer>
        <Progress percentage={uploadPerc} />
      </ProgressContainer>
    </ProgressWrap>
  )
}

export default ProgressBar
