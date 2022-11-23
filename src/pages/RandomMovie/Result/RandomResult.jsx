import styled from 'styled-components';
import { flexBox } from '../../../styles/mixins';
import { ReactComponent as Barcode } from '../../../assets/barcode.svg';
import { ReactComponent as Star } from '../../../assets/star.svg';
import { ReactComponent as Close } from '../../../assets/close.svg';
import { ReactComponent as NoImage } from '../../../assets/noImage.svg';
const RandomResult = ({ setTicketModal, kobisInfo, naverInfo }) => {
  console.log(kobisInfo);
  console.log(naverInfo);
  console.log(naverInfo.length);
  const closeModal = () => {
    setTicketModal(false);
  };

  const audience = parseInt(kobisInfo.audiAcc).toLocaleString();
  const salesAmt = parseInt(kobisInfo.salesAmt).toLocaleString();
  const barcodeNumber = Math.floor(Math.random() * 100000000);
  let subtitle = '';
  if (naverInfo.length !== 0) {
    subtitle = naverInfo.subtitle
      .replace(/<b>/gi, '')
      .replace(/<\/b>/gi, '')
      .replace(/&apos;/gi, '');
  }

  return (
    <ModalBack>
      <Top>
        <CloseSVG onClick={closeModal} />
      </Top>
      <Container>
        <Bottom>
          <BottomLeft>
            <TicketTop>
              <StarWrapper>
                <StarSVG />
                <StarSVG />
                <StarSVG />
                <StarSVG />
                <StarSVG />
              </StarWrapper>
              <TicketTitle>CINEMA TICKET</TicketTitle>
            </TicketTop>
            <Content>
              <div>
                {naverInfo.length === 0 ? (
                  <NoImageSVG />
                ) : (
                  <img src={naverInfo.image} alt={naverInfo.title} />
                )}
              </div>
              <Info>
                <h3 className="movie-title">{kobisInfo.movieNm}</h3>
                <p className="movie-subtitle">{subtitle}</p>
                <div>개봉일 {kobisInfo.openDt}</div>
                {naverInfo.length === 0 || naverInfo.userRating === '0.00' ? null : (
                  <UserRating>
                    평점 <StarSVG className="ratingStar" />
                    {naverInfo.userRating}
                  </UserRating>
                )}
                <div>누적관객 {audience}명</div>
                <div>누적매출액 {salesAmt}원</div>
                {naverInfo.length === 0 ? null : (
                  <a href={naverInfo.link} target="_blank" rel="noopener noreferrer">
                    <span>더보기</span>
                  </a>
                )}
              </Info>
            </Content>
          </BottomLeft>
          <BottomRight>
            <BarcodeSVG />
            <Number>{barcodeNumber}</Number>
          </BottomRight>
        </Bottom>
      </Container>
    </ModalBack>
  );
};
export default RandomResult;
const BarcodeSVG = styled(Barcode)`
  width: 80px;
  height: 340px;
`;
const StarSVG = styled(Star)`
  width: 15px;
  margin: 0 3px;
`;
const CloseSVG = styled(Close)`
  position: relative;
  left: 285px;
  cursor: pointer;
`;
const NoImageSVG = styled(NoImage)`
  width: 110px;
  height: 160px;
  border-radius: 5px;
`;

const ModalBack = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 999;
  left: 0;
  bottom: 0;
  right: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.8);
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 340px;
  min-width: 600px;
  max-width: 640px;
  background-color: #1a2936;
`;
const Top = styled.div``;
const Bottom = styled.div`
  display: flex;
  color: #f5efd7;
  font-weight: 600;
  font-size: 18px;
`;
const BottomLeft = styled.div`
  width: 90%;
  border: 5px solid #f5efd7;
  border-radius: 10px;
  margin: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    color: #f5efd7;
  }
`;
const TicketTop = styled.div`
  height: 30%;
  padding: 8px;
`;
const StarWrapper = styled.div`
  text-align: center;
  height: 20px;
`;
const TicketTitle = styled.div`
  color: ${({ theme }) => theme.mediumWineColor};
  font-size: 26px;
  font-weight: 800;
  text-align: center;
  border-bottom: 3px solid #f5efd7;
`;
const Content = styled.div`
  ${flexBox('row', '', '')};
  height: 70%;
  font-size: 14px;
  padding-left: 25px;
  padding-right: 20px;
  img {
    height: 160px;
    width: 110px;
  }
  .movie-title {
    font-size: 18px;
  }
  .movie-subtitle {
    margin-bottom: 16px;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 80%;
  margin-left: 20px;
  .ratingStar {
    color: #e23830;
  }
`;
const UserRating = styled.div`
  display: flex;
  align-items: center;
`;
const BottomRight = styled.div`
  background-color: #f5efd7;
  width: 20%;
  height: 340px;

  padding-top: 0;
  padding-bottom: 0;
  padding-left: 10px;
  padding-right: 25px;
`;
const Number = styled.div`
  position: relative;
  transform: rotate(90deg);
  color: #3d3c3c;
  bottom: 175px;
  left: 55px;
`;
