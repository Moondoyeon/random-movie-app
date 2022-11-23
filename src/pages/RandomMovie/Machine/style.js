import styled from 'styled-components';
export const Container = styled.div`
  display: flex;
`;
export const SlotMachineContainer = styled.div`
  background-color: #d30431;
  width: 900px;
  height: 650px;
  border: 10px solid black;
  border-radius: 10px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const TitleWrapper = styled.div`
  background-color: #010e6c;
  width: 840px;
  height: 100px;
  border-radius: 5px;
  border: 10px black solid;
  .title {
    color: #ffe899;
    font-size: 55px;
    text-shadow: -5px 0 black, 0 5px black, 5px 0 black, 0 -5px black;
    text-align: center;
    font-family: 'Silkscreen', cursive;
  }
`;
export const SlotWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;
export const Outer = styled.div`
  /* display: flex; */
`;
export const Inner = styled.div`
  background-color: #010e6c;
  border: 10px solid black;
  border-radius: 5px;
  width: 720px;
  height: 360px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const Slot = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: #f2f2f2;
  border: 10px solid black;
  width: 200px;
  height: 250px;
  font-weight: 600;
  font-size: 30px;
  margin: 5px;
  .side {
    font-size: 20px;
  }
`;
export const BuzzerBtnContainer = styled.div`
  margin-left: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  button {
    cursor: pointer;
    background-color: #d30431;
    width: 170px;
    height: 60px;
    border: 8px solid black;
    border-bottom: 4px solid black;
    border-radius: 10px;
    transition: 0.3s;
  }
  button:active {
    box-shadow: 1px 1px 0 rgb(0, 0, 0, 0.5);
    position: relative;
    background-color: blue;
    top: 10px;
  }
  div {
    background-color: #443a3a;
    width: 200px;
    height: 50px;
    border-radius: 5px;
    border: 8px solid black;
    z-index: 999;
  }
`;
