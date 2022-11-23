import styled from 'styled-components';
import { positionCenter } from '../../styles/mixins';

function Loading() {
  return <Skeleton />;
}
export default Loading;

const Skeleton = styled.div`
  ${positionCenter()};
  z-index: 999;
  border: 8px solid ${({ theme }) => theme.beigeColor};
  border-top: 8px solid black;
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
