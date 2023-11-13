import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
export default function SettingPage({
  participants = [],
  giftList = [],
  onChangePart,
  onChangeGift,
}) {
  const styles = {
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'column',
      // backgroundColor: 'grey',
      overflow: 'auto',
      color: 'white',
      padding: 20,
    },
  };

  const changeForm = (arr) => {
    let result = [];

    let semi = [];

    for (let i = 0; i < arr.length; i++) {
      semi.push(arr[i]);
      if ((i + 1) % 20 === 0) {
        result.push(semi);
        semi = [];
      }
    }
    if (semi.length > 0) {
      result.push(semi);
    }

    return result;
  };

  return (
    <div style={styles.container}>
      <div style={{ display: 'flex', alignItems: 'center', padding: 5 }}>
        <IconButton
          onClick={() => {
            const copy = [...participants];
            copy.pop();
            onChangePart(copy);
          }}
          style={{ color: 'white' }}
        >
          <RemoveCircleOutlineIcon />
        </IconButton>

        <div
          style={{ fontSize: 20, fontWeight: 'bold', paddingBottom: 4 }}
        >{`직원수 ( ${participants.length}명 )`}</div>

        <IconButton
          onClick={() => {
            const copy = [...participants];
            copy.push({ num: participants.length + 1, isAwarded: false });
            onChangePart(copy);
          }}
          style={{ color: 'white' }}
        >
          <AddCircleOutlineIcon />
        </IconButton>
      </div>

      <div
        style={{ fontSize: 20, fontWeight: 'bold', paddingLeft: 10, paddingBottom: 4 }}
      >{`추첨 완료 : ${participants.filter((d) => d.isAwarded).length}명`}</div>

      <div style={{ overflow: 'auto', paddingBottom: 10 }}>
        {changeForm(participants).map((list, index) => (
          <div key={index} style={{ display: 'flex', overflow: 'auto' }}>
            {list.map((d, i) => (
              <FormControlLabel
                style={{ padding: 0, width: '4.6%' }}
                key={i}
                value="start"
                control={<Checkbox style={{ color: 'white' }} checked={d.isAwarded} />}
                label={d.num}
                labelPlacement="start"
                onChange={(e) => {
                  const copy = [...participants];
                  copy[d.num - 1].isAwarded = e.target.checked;
                  onChangePart(copy);
                }}
              />
            ))}
          </div>
        ))}
      </div>

      <div style={{ padding: 10, fontSize: 20, fontWeight: 'bold', marginTop: 20 }}>상품목록</div>

      <div style={{ padding: 10, fontWeight: 'bold' }}>{`슬롯 상품 ( 0 ~ 3 개 가능 )`}</div>

      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {giftList
          .filter((d) => d.type === 1)
          .map((d, i) => (
            <GiftCard
              type={1}
              onChange={(name, value) => {
                const copy = [...giftList];
                copy[copy.findIndex((d) => d.name === name)].isAwarded = value;
                onChangeGift(copy);
              }}
              onChangeCount={(name, count) => {
                const copy = [...giftList];
                copy[copy.findIndex((d) => d.name === name)].count = count;
                onChangeGift(copy);
              }}
              key={i}
              data={d}
            />
          ))}
      </div>

      <div style={{ borderBottom: '1px solid white', margin: '30px 10px' }}></div>

      <div style={{ padding: 10, fontWeight: 'bold' }}>{`룰렛 상품`}</div>

      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {giftList
          .filter((d) => d.type === 2)
          .map((d, i) => (
            <GiftCard
              onChange={(name, value) => {
                const copy = [...giftList];
                copy[copy.findIndex((d) => d.name === name)].isAwarded = value;
                onChangeGift(copy);
              }}
              onChangeCount={(name, count) => {
                const copy = [...giftList];
                copy[copy.findIndex((d) => d.name === name)].count = count;
                onChangeGift(copy);
              }}
              key={i}
              data={d}
            />
          ))}
      </div>
    </div>
  );
}

const GiftCard = ({ data, onChange, onChangeCount, type = 2 }) => {
  return (
    <div
      style={{
        margin: 10,
        padding: 10,
        paddingRight: 20,
        border: '1px solid white',
        borderRadius: 8,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Checkbox
          style={{ color: 'white' }}
          checked={data.isAwarded}
          onChange={(e) => {
            onChange(data.name, e.target.checked);
          }}
        />
        <div
          onClick={() => {
            onChange(data.name, !data.isAwarded);
          }}
          style={{ paddingBottom: 4, cursor: 'pointer' }}
        >
          {data.name}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ paddingLeft: 10, marginRight: 20 }}>수량 : </div>
        <IconButton
          onClick={() => {
            if (data.count > 0) onChangeCount(data.name, data.count - 1);
          }}
          style={{ color: 'white' }}
        >
          <RemoveCircleOutlineIcon />
        </IconButton>
        <div>{data.count}</div>
        <IconButton
          onClick={() => {
            if (type === 2 || data.count < 3) onChangeCount(data.name, data.count + 1);
          }}
          style={{ color: 'white' }}
        >
          <AddCircleOutlineIcon />
        </IconButton>
      </div>
    </div>
  );
};
