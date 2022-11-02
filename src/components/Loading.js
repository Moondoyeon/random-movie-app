import styled from 'styled-components';

function Loading() {
  return (
    <Wrapper>
      <Skeleton />
    </Wrapper>
  );
}
export default Loading;
const Wrapper = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 80px;
  height: 80px;
  min-width: 100vh;
  min-height: 100vh;
`;
const Skeleton = styled.div`
  z-index: 999;
  position: relative;
  top: 20px;
  left: 35px;
  border: 8px solid rgb(250, 250, 250);
  border-top: 8px solid #0b0b0b;
  border-radius: 100%;
  transform: translate(-50%, -50%);
  width: 70px;
  height: 70px;
  transition: all 0.2s;
  animation-name: spinCircle;
  animation-duration: 0.8s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  @keyframes spinCircle {
    from {
      transform: translate(-50%, -50%) rotate(0);
    }
    to {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
`;
