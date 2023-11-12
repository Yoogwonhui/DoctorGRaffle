import React, { useEffect, useState } from 'react';
import Slot from 'react-slot-machine';
import Button from '@mui/material/Button';
import { getRandomInt, addZero } from '../util';
import slot from '../assets/slot.png';
import CircularProgress from '@mui/material/CircularProgress';

const maxTime = 2000;
const minTime = 1000;

export default function SlotPage({ participants = [], giftList = [], onChangePart, onChangeGift }) {
  const [isRaffling, setIsRaffling] = useState(false);

  const [gift, setGift] = useState(null);

  const [raffleNums, setRaffleNums] = useState(null);

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const styles = {
    container: {
      display: 'flex',
      width: '100%',
      height: '100%',
    },
    imgContainer: {
      flex: 1,
    },
    raffleContiner: {
      display: 'flex',
      flex: 3,
      flexWrap: 'wrap',
      position: 'relative',
    },
    raffleButton: {
      position: 'absolute',
      bottom: '5%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'orange',
      width: 400,
      height: 60,
      fontSize: 30,
      fontWeight: 900,
      zIndex: 20,
    },
  };

  useEffect(() => {
    const leftGiftList = giftList.filter((d) => !d.isAwarded && d.type === 1);
    const targetGift = leftGiftList[0];
    if (targetGift) {
      setGift(targetGift);
    }
  }, [giftList]);

  const onStartRaffling = () => {
    setButtonDisabled(true);
    setTimeout(() => {
      setButtonDisabled(false);
    }, maxTime);
    // 랜덤으로 섞은 사람 리스트
    const suffledLeftPeople = participants
      .filter((d) => !d.isAwarded)
      .sort(() => Math.random() - 0.5);

    if (suffledLeftPeople.length > 0) {
      const raffleNumList = [];
      if (suffledLeftPeople[0]) raffleNumList.push(suffledLeftPeople[0]?.num);
      if (suffledLeftPeople[1]) raffleNumList.push(suffledLeftPeople[1]?.num);
      if (suffledLeftPeople[2]) raffleNumList.push(suffledLeftPeople[2]?.num);

      setRaffleNums(raffleNumList.map((d) => addZero(d)));

      const copyP = [...participants];
      for (let i = 0; i < raffleNumList.length; i++) {
        copyP[copyP.findIndex((d) => d.num === raffleNumList[i])].isAwarded = true;
      }
      onChangePart(copyP);
    } else {
      alert('모든 사람이 상품을 받았습니다 !');
    }
  };

  useEffect(() => {
    if (raffleNums) {
      setIsRaffling(true);
    }
  }, [raffleNums]);

  const onReset = () => {
    const copyG = [...giftList];
    copyG[copyG.findIndex((d) => d?.name === gift?.name)].isAwarded = true;
    onChangeGift(copyG);
    setIsRaffling(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.imgContainer}>
        {gift && (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div
              style={{
                width: '100%',
                color: 'white',
                fontSize: 40,
                fontWeight: 'bold',
                textAlign: 'center',
                marginTop: 30,
              }}
            >
              {`[ ${gift.name} ]`}
            </div>
            <div style={{ display: 'flex', flexGrow: 1, alignItems: 'center' }}>
              <img
                style={{ width: '100%' }}
                src={process.env.PUBLIC_URL + `/img/${gift.img}.png`}
                alt=""
              />
            </div>
          </div>
        )}
      </div>

      <div style={styles.raffleContiner}>
        <SlotComponent
          targetNum={raffleNums && raffleNums[0] ? raffleNums[0] : '000'}
          isTurning={isRaffling}
        />
        <SlotComponent
          targetNum={raffleNums && raffleNums[1] ? raffleNums[1] : '000'}
          isTurning={isRaffling}
        />
        <SlotComponent
          targetNum={raffleNums && raffleNums[2] ? raffleNums[2] : '000'}
          isTurning={isRaffling}
        />

        <Button
          disabled={buttonDisabled}
          variant="contained"
          style={styles.raffleButton}
          onClick={() => {
            if (!isRaffling) onStartRaffling();
            else onReset();
          }}
        >
          {buttonDisabled ? (
            <CircularProgress style={{ color: 'white' }} />
          ) : isRaffling ? (
            'NEXT !'
          ) : (
            'START !'
          )}
        </Button>
      </div>
    </div>
  );
}

// 슬롯
const SlotComponent = ({ targetNum, isTurning = false }) => {
  const list = [0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div style={{ display: 'flex', flex: 1, margin: 40, marginTop: 200, position: 'relative' }}>
      <img
        style={{ width: 400, height: 500, position: 'absolute', zIndex: 10 }}
        src={slot}
        alt="t"
      />
      <div style={{ position: 'absolute', top: 210, left: 97 }}>
        <Slot
          className="slot"
          duration={getRandomInt(minTime, maxTime)}
          target={isTurning ? targetNum[0] * 1 + 1 : 0}
          times={getRandomInt(5, 8)}
        >
          {list.map((value, idx) => (
            <div key={idx} className="slot-item">
              {value}
            </div>
          ))}
        </Slot>
      </div>

      <div style={{ position: 'absolute', top: 210, left: 174 }}>
        <Slot
          className="slot"
          duration={getRandomInt(minTime, maxTime)}
          target={isTurning ? targetNum[1] * 1 + 1 : 0}
          times={getRandomInt(5, 8)}
        >
          {list.map((value, idx) => (
            <div key={idx} className="slot-item">
              {value}
            </div>
          ))}
        </Slot>
      </div>

      <div style={{ position: 'absolute', top: 210, left: 252 }}>
        <Slot
          className="slot"
          duration={getRandomInt(minTime, maxTime)}
          target={isTurning ? targetNum[2] * 1 + 1 : 0}
          times={getRandomInt(5, 8)}
        >
          {list.map((value, idx) => (
            <div key={idx} className="slot-item">
              {value}
            </div>
          ))}
        </Slot>
      </div>
    </div>
  );
};
