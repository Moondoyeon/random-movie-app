import {
  Container,
  SlotMachineContainer,
  TitleWrapper,
  SlotWrapper,
  Outer,
  Inner,
  Slot,
  BuzzerBtnContainer,
} from './style';
import { useEffect, useState, useRef } from 'react';
import { slotCountry, slotYear, slotType } from '../../constants';

// 슬롯머신 초기 숫자값
const getRandomNumber1 = () => {
  return Math.floor(Math.random() * 2); // 0,1
};
const getRandomNumber2 = () => {
  return Math.floor(Math.random() * 5); // 0,1,2,3,4
};
// 슬롯머신 초기 숫자값 받고나서 1씩 증가 (슬롯중간값)
const changeSlotNum1 = (item) => {
  if (item === 1) {
    return 0;
  }
  return item + 1;
};
const changeSlotNum2 = (item) => {
  if (item === 4) {
    return 0;
  }
  return item + 1;
};
// 슬롯머신 맨위, 맨아랫칸
const MoveTopToTheBottom = (option) => {
  switch (option) {
    case -1:
      return 1;
    case 2:
      return 0;
    default:
      return option;
  }
};
const MoveTopToTheBottom2 = (option) => {
  switch (option) {
    case -1:
      return 4;
    case 5:
      return 0;
    default:
      return option;
  }
};
const Machine = ({ getSlotContent, halted, setHalted }) => {
  const [firstOptionNum, setFisrtOptionNum] = useState(getRandomNumber1());
  const [secondOptionNum, setSecondOptionNum] = useState(getRandomNumber2());
  const [thirdOptionNum, setThirdOptionNum] = useState(getRandomNumber1());
  const timeInterval = useRef();
  // 슬롯 돌아가고, 멈추게 만든다.
  useEffect(() => {
    if (halted) return; //최초 렌더해도, 바로 슬롯이 돌아가지 않는 이유 | halted가 false 되면 timeInterval생성 및 돌아감.
    timeInterval.current = setInterval(() => {
      let slot1 = firstOptionNum;
      let slot2 = secondOptionNum;
      let slot3 = thirdOptionNum;
      setFisrtOptionNum(changeSlotNum1(slot1));
      setSecondOptionNum(changeSlotNum2(slot2));
      setThirdOptionNum(changeSlotNum1(slot3));
    }, 1000);
    // console.log("slot start");
    return () => {
      clearInterval(timeInterval.current);
      // console.log("slot stop");
    };
  }, [halted, firstOptionNum, secondOptionNum, thirdOptionNum]);

  // 버저 클릭시 실행
  const stopSlot = () => {
    if (!halted) {
      clearInterval(timeInterval.current); //삭제하고
      // console.log("interval remove");
      getSlotContent(firstOptionNum, secondOptionNum, thirdOptionNum);
    }
  };

  return (
    <Container>
      <SlotMachineContainer>
        <TitleWrapper>
          <div className="title">RANDOM MOVIE</div>
        </TitleWrapper>
        <SlotWrapper>
          <Outer>
            <Inner>
              <Slot>
                <div className="side">{slotCountry[MoveTopToTheBottom(firstOptionNum + 1)][0]}</div>
                <div>{slotCountry[firstOptionNum][0]}</div>
                <div className="side">{slotCountry[MoveTopToTheBottom(firstOptionNum - 1)][0]}</div>
              </Slot>
              <Slot>
                <div className="side">{slotYear[MoveTopToTheBottom2(secondOptionNum - 1)]}</div>
                <div>{slotYear[secondOptionNum]}</div>
                <div className="side">{slotYear[MoveTopToTheBottom2(secondOptionNum + 1)]}</div>
              </Slot>
              <Slot>
                <div className="side">{slotType[MoveTopToTheBottom(thirdOptionNum + 1)][0]}</div>
                <div>{slotType[thirdOptionNum][0]}</div>
                <div className="side">{slotType[MoveTopToTheBottom(thirdOptionNum - 1)][0]}</div>
              </Slot>
            </Inner>
          </Outer>
        </SlotWrapper>
      </SlotMachineContainer>
      <BuzzerBtnContainer>
        <button
          onClick={() => {
            setHalted(true);
            stopSlot();
          }}
        ></button>
        <div></div>
      </BuzzerBtnContainer>
    </Container>
  );
};
export default Machine;
