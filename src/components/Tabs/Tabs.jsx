import React, { useState } from 'react'
import styled from 'styled-components'
import FirstTab from './FirstTab'
import SecondTab from './SecondTab'
import TabNavItem from './TabNavItem'
import TabContent from './TabContent'

const TabOutlet = styled.div``

const TabNav = styled.ul`
  display: block;
  margin-top: 50px;
  margin-bottom: 0;
  padding-left: 5%;
`

const HR = styled.hr`
  width: 100%;
  margin-top: 0;
  border: 1px solid ${({ theme }) => theme.soft};
`
const Tabs = ({ videos, channelDesc }) => {
  const [activeTab, setActiveTab] = useState('tab1')

  return (
    <>
      <TabNav>
        <TabNavItem
          id='tab1'
          title='Videos'
          activeTab={activeTab === 'tab1'}
          setActiveTab={setActiveTab}
        />

        <TabNavItem
          id='tab2'
          title='About'
          activeTab={activeTab === 'tab2'}
          setActiveTab={setActiveTab}
        />
      </TabNav>
      <HR />

      <TabOutlet>
        <TabContent id='tab1' activeTab={activeTab}>
          <FirstTab videos={videos} />
        </TabContent>

        <TabContent id='tab2' activeTab={activeTab}>
          <SecondTab channelDesc={channelDesc} />
        </TabContent>
      </TabOutlet>
    </>
  )
}

export default Tabs
