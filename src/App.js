import React, { useState } from 'react';
import './App.css';

import SlotPage from './pages/SlotPage';
import RafflePage from './pages/RafflePage';
import SettingPage from './pages/SettingPage';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CelebrationIcon from '@mui/icons-material/Celebration';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import DiamondIcon from '@mui/icons-material/Diamond';
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
    [...new Array(185)].map((d, index) => {
      return { num: index + 1, isAwarded: false };
    }),
  );

  // 상품 리스트
  const [giftList, setGiftList] = useState([
    { name: '배민 5만원권', count: 15, img: 'baemin', isAwarded: false, type: 2, section: 1 },
    {
      name: '희녹 제주편백 스프레이',
      count: 15,
      img: 'spray',
      isAwarded: false,
      type: 2,
      section: 1,
    },
    { name: '다이슨 에어랩', count: 3, img: 'airlab', isAwarded: false, type: 1, section: 1 },
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    {
      name: '레고트 텀블러(400ml)',
      count: 30,
      img: 'tumbler',
      isAwarded: false,
      type: 2,
      section: 2,
    },
    {
      name: '이솝 핸드워시&핸드밤',
      count: 10,
      img: 'aesop',
      isAwarded: false,
      type: 2,
      section: 2,
    },
    { name: 'LG 스탠바이미', count: 1, img: 'stan', isAwarded: false, type: 1, section: 2 },
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    { name: '아웃백 10만원권', count: 5, img: 'outback', isAwarded: false, type: 2, section: 3 },
    { name: '풀리오 다리마사지기', count: 5, img: 'leg', isAwarded: false, type: 2, section: 3 },
    { name: '다이슨 공기청정기', count: 3, img: 'airclean', isAwarded: false, type: 1, section: 3 },
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    { name: '치킨 교환권', count: 20, img: 'chicken', isAwarded: false, type: 2, section: 4 },
    { name: '명품 립밤', count: 10, img: 'lip', isAwarded: false, type: 2, section: 4 },
    { name: '올리브영 5만원권', count: 20, img: 'olive', isAwarded: false, type: 2, section: 4 },
    { name: '아크네 머플러', count: 6, img: 'acne', isAwarded: false, type: 2, section: 4 },
    { name: '네스프레소 커피머신', count: 3, img: 'coffie', isAwarded: false, type: 1, section: 4 },
    { name: 'LG 로봇청소기', count: 1, img: 'lobot', isAwarded: false, type: 1, section: 4 },
    { name: '춘식이 페이스쿠션', count: 31, img: 'cushion', isAwarded: false, type: 2, section: 4 },
    { name: 'LG 스타일러', count: 1, img: 'styler', isAwarded: false, type: 1, section: 4 },
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
          label={<DiamondIcon />}
          {...a11yProps(0)}
        />
        <Tab
          style={{ padding: 10, minWidth: 0, color: 'white' }}
          label={<CelebrationIcon />}
          {...a11yProps(1)}
        />
        <Tab
          style={{ padding: 10, minWidth: 0, color: 'white' }}
          label={<AutoAwesomeIcon />}
          {...a11yProps(2)}
        />
        <Tab
          style={{ padding: 10, minWidth: 0, color: 'white' }}
          label={<CardGiftcardIcon />}
          {...a11yProps(3)}
        />
        <Tab
          style={{ padding: 10, minWidth: 0, color: 'white' }}
          label={<SettingsIcon />}
          {...a11yProps(4)}
        />
      </Tabs>
      <TabPanel value={tab} index={0}>
        <Section
          participants={participants}
          giftList={giftList}
          onChangePart={(e) => setParticipants(e)}
          onChangeGift={(e) => setGiftList(e)}
          sectionNum={1}
        />
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <Section
          participants={participants}
          giftList={giftList}
          onChangePart={(e) => setParticipants(e)}
          onChangeGift={(e) => setGiftList(e)}
          sectionNum={2}
        />
      </TabPanel>
      <TabPanel value={tab} index={2}>
        <Section
          participants={participants}
          giftList={giftList}
          onChangePart={(e) => setParticipants(e)}
          onChangeGift={(e) => setGiftList(e)}
          sectionNum={3}
        />
      </TabPanel>
      <TabPanel value={tab} index={3}>
        <Section
          participants={participants}
          giftList={giftList}
          onChangePart={(e) => setParticipants(e)}
          onChangeGift={(e) => setGiftList(e)}
          sectionNum={4}
        />
      </TabPanel>
      <TabPanel value={tab} index={4}>
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

const Section = ({ participants = [], giftList = [], onChangePart, onChangeGift, sectionNum }) => {
  const onChangeGift_ = (e) => {
    let newGiftArr = [];

    for (let i = 0; i < giftList.length; i++) {
      const target = giftList[i];

      const isFind = e.find((d) => d.name === target.name);

      if (isFind) {
        newGiftArr.push({ ...target, ...isFind });
      } else {
        newGiftArr.push(target);
      }
    }
    onChangeGift(newGiftArr);
  };

  return (
    <>
      {giftList.filter((d) => d.section === sectionNum && !d.isAwarded).length > 0 ? (
        <>
          {giftList.filter((d) => d.section === sectionNum && !d.isAwarded)[0].type === 1 ? (
            <SlotPage
              participants={participants}
              giftList={giftList.filter((d) => d.section === sectionNum)}
              onChangePart={(e) => {
                onChangePart(e);
              }}
              onChangeGift={(e) => {
                onChangeGift_(e);
              }}
            />
          ) : (
            <RafflePage
              participants={participants}
              giftList={giftList.filter((d) => d.section === sectionNum)}
              onChangePart={(e) => {
                onChangePart(e);
              }}
              onChangeGift={(e) => {
                onChangeGift_(e);
              }}
            />
          )}
        </>
      ) : (
        <div
          style={{
            color: 'white',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 100,
          }}
        >
          {sectionNum === 4
            ? ''
            : sectionNum === 1
            ? 'To be continued...'
            : sectionNum === 2
            ? "I'll be back..."
            : "It's not over..."}
        </div>
      )}
    </>
  );
};

export default App;
