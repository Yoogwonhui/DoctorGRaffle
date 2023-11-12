import React, { useEffect, useState } from 'react';
import Slot from 'react-slot-machine';
import Button from '@mui/material/Button';
import { getRandomInt, addZero } from '../util';
import slot from '../assets/slot.png';
import CircularProgress from '@mui/material/CircularProgress';
import on from '../assets/lotteryAni.gif';
import off from '../assets/lottery.jpg';
import question from '../assets/question.png';

const maxTime = 2000;
const minTime = 1000;

export default function RafflePage({
  participants = [],
  giftList = [],
  onChangePart,
  onChangeGift,
}) {
  const [isRaffling, setIsRaffling] = useState(false);

  const [gift, setGift] = useState(null);

  const [raffleNums, setRaffleNums] = useState(null);

  const [buttonDisabled, setButtonDisabled] = useState(false);

  // gif를 위한 트리거
  const [isStartGif, setIsStartGif] = useState(false);

  // ?를 위한 트리거
  const [isShowQ, setIsShowQ] = useState(false);

  const [ShowNumList, SetShowNumList] = useState([]);

  const styles = {
    container: {
      position: 'relative',
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
      width: '100%',
      height: '100%',
    },
    raffleButton: {
      position: 'absolute',
      bottom: '10%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'orange',
      width: 400,
      height: 60,
      fontSize: 30,
      fontWeight: 900,
      zIndex: 20,
    },
    raffle: {
      position: 'absolute',
      bottom: '25%',
      left: '50%',
      transform: 'translate(-50%, -0%)',
      width: '70%',
      clipPath: 'circle(37%)',
    },
    qus: {
      position: 'absolute',
      bottom: '28%',
      left: '49.5%',
      transform: 'translate(-50%, -0%)',
      width: '10%',
      color: 'white',
    },
    ball: {
      width: 180,
      height: 180,
      borderRadius: 100,
      zIndex: 50,
      backgroundColor: '#f93283',
      fontSize: 80,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 700,
      color: 'white',
      margin: 10,
      border: '10px solid #d91263',
    },
  };

  useEffect(() => {
    const leftGiftList = giftList.filter((d) => !d.isAwarded && d.type === 2);
    const targetGift = leftGiftList[0];
    if (targetGift) {
      setGift(targetGift);
    }
  }, [giftList]);

  const onStartRaffling = () => {
    setIsStartGif(true);
    setTimeout(() => {
      setIsStartGif(false);
    }, 7500);
    setTimeout(() => {
      setIsShowQ(true);
      setTimeout(() => {
        setIsShowQ(false);
      }, 2300);
    }, 5200);

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

      for (let i = 0; i < gift.count; i++) {
        if (suffledLeftPeople[i]) raffleNumList.push(suffledLeftPeople[i]?.num);
      }

      console.log(raffleNumList.map((d) => addZero(d)));
      setRaffleNums(raffleNumList.map((d) => addZero(d)));

      const copyP = [...participants];
      for (let i = 0; i < raffleNumList.length; i++) {
        copyP[copyP.findIndex((d) => d.num === raffleNumList[i])].isAwarded = true;
      }
      onChangePart(copyP);

      setTimeout(() => {
        for (let i = 0; i < raffleNumList.length; i++) {
          setTimeout(() => {
            SetShowNumList([...raffleNumList.map((d) => addZero(d))].slice(0, i + 1));
          }, i * 300);
        }
      }, 8000);
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
    SetShowNumList([]);
  };

  return (
    <div style={styles.container}>
      <div
        style={{
          position: 'absolute',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
        }}
      >
        {ShowNumList.map((d) => (
          <div style={styles.ball}>{d}</div>
        ))}
      </div>

      <div style={styles.imgContainer}>
        {gift && (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div
              style={{
                width: '100%',
                color: 'white',
                fontSize: 40,
                textAlign: 'center',
                fontWeight: 'bold',

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
        {isStartGif ? (
          <img style={styles.raffle} src={on} alt="on" />
        ) : (
          <img style={styles.raffle} src={off} alt="off" />
        )}

        {isShowQ && <img src={question} alt="?" style={styles.qus} />}

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
