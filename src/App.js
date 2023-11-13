import React, { useState } from 'react';
import './App.css';

import SlotPage from './pages/SlotPage';
import RafflePage from './pages/RafflePage';
import SettingPage from './pages/SettingPage';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CelebrationIcon from '@mui/icons-material/Celebration';
import SettingsIcon from '@mui/icons-material/Settings';
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      style={{ width: '100%', height: '100%' }}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

function App() {
  const [tab, setTab] = useState(0);

  // 참여자 200명 , false로 세팅
  const [participants, setParticipants] = useState(
    [...new Array(200)].map((d, index) => {
      return { num: index + 1, isAwarded: false };
    }),
  );

  // 상품 리스트
  const [giftList, setGiftList] = useState([
    { name: 'LG 스탠바이미', count: 3, img: 'stan', isAwarded: false, type: 1 },
    { name: 'LG 스타일러', count: 3, img: 'styler', isAwarded: false, type: 1 },
    { name: 'LG 로봇청소기', count: 3, img: 'cleaner', isAwarded: false, type: 1 },
    { name: '다이슨 에어랩', count: 3, img: 'stan', isAwarded: false, type: 1 },
    { name: '다이슨 공기청정기', count: 3, img: 'stan', isAwarded: false, type: 1 },
    { name: '네스프레소 커피머신', count: 3, img: 'stan', isAwarded: false, type: 1 },

    { name: '알로코리아 3in1 충전기', count: 5, img: 'stan', isAwarded: false, type: 2 },
    { name: '폴로랄프로렌 머플러', count: 5, img: 'stan', isAwarded: false, type: 2 },
    { name: '디올 르 밤 핸드크림', count: 5, img: 'stan', isAwarded: false, type: 2 },
    { name: '탬버린즈 고체향수', count: 15, img: 'stan', isAwarded: false, type: 2 },
    { name: '보스톤 와인고블렛', count: 15, img: 'stan', isAwarded: false, type: 2 },
    { name: '렉슨미나 조명 S', count: 15, img: 'stan', isAwarded: false, type: 2 },
    { name: '알로코리아 3in1 충전기', count: 20, img: 'stan', isAwarded: false, type: 2 },
    { name: '칼리아 보조배터리', count: 20, img: 'stan', isAwarded: false, type: 2 },
    { name: '조말론 코롱 9ml', count: 20, img: 'stan', isAwarded: false, type: 2 },
    { name: '스타벅스 기프트카드', count: 30, img: 'stan', isAwarded: false, type: 2 },
    { name: '춘식이 페이스쿠션', count: 25, img: 'stan', isAwarded: false, type: 2 },
  ]);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  const styles = {
    container: {
      width: '100vw',
      height: '100vh',
      backgroundColor: 'black',
      display: 'flex',
      overflow: 'auto',
    },
  };

  return (
    <div style={styles.container}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={tab}
        onChange={handleChange}
        indicatorColor="none"
        style={{ minWidth: 30 }}
      >
        <Tab
          style={{ padding: 10, minWidth: 0, color: 'white' }}
          label={<AutoAwesomeIcon />}
          {...a11yProps(0)}
        />
        <Tab
          style={{ padding: 10, minWidth: 0, color: 'white' }}
          label={<CelebrationIcon />}
          {...a11yProps(1)}
        />
        <Tab
          style={{ padding: 10, minWidth: 0, color: 'white' }}
          label={<SettingsIcon />}
          {...a11yProps(2)}
        />
      </Tabs>
      <TabPanel value={tab} index={0}>
        <SlotPage
          participants={participants}
          giftList={giftList}
          onChangePart={(e) => setParticipants(e)}
          onChangeGift={(e) => setGiftList(e)}
        />
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <RafflePage
          participants={participants}
          giftList={giftList}
          onChangePart={(e) => setParticipants(e)}
          onChangeGift={(e) => setGiftList(e)}
        />
      </TabPanel>
      <TabPanel value={tab} index={2}>
        <SettingPage
          participants={participants}
          giftList={giftList}
          onChangePart={(e) => setParticipants(e)}
          onChangeGift={(e) => setGiftList(e)}
        />
      </TabPanel>
    </div>
  );
}

export default App;
