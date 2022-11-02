import styled from 'styled-components';
import { ReactComponent as Barcode } from '../assets/barcode.svg';
import { ReactComponent as Star } from '../assets/star.svg';
import { ReactComponent as Close } from '../assets/close.svg';
import { ReactComponent as NoImage } from '../assets/noImage.svg';
const RandomResult = ({ setTicketModal, kobisInfo, naverInfo }) => {
  console.log(kobisInfo);
  console.log(naverInfo);
  const closeModal = () => {
    setTicketModal(false);
  };
  const audience = parseInt(kobisInfo.audiAcc).toLocaleString();
  const salesAmt = parseInt(kobisInfo.salesAmt).toLocaleString();
  const barcodeNumber = Math.floor(Math.random() * 100000000);
  let subtitle = '';
  if (naverInfo.length !== 0) {
    subtitle = naverInfo.subtitle.replace(/<b>/gi, '').replace(/<\/b>/gi, '');
  } else return;
  return (
    <ModalBack onClick={closeModal}>
      <Top>
        <CloseSVG onClick={closeModal} />
      </Top>
      <Container>
        <Bottom>
          <BottomLeft>
            <StarWrapper>
              <StarSVG />
              <StarSVG />
              <StarSVG />
              <StarSVG />
              <StarSVG />
            </StarWrapper>
            <Title>CINEMA TICKET</Title>
            <Content>
              {naverInfo.length === 0 ? <NoImageSVG /> : <img src={naverInfo.image} alt={naverInfo.title} />}
              <Info>
                <h3 className="movie-title">{kobisInfo.movieNm}</h3>
                <p className="movie-subtitle">{subtitle}</p>
                <div>개봉일 {kobisInfo.openDt}</div>
                <div>
                  평점 <StarSVG className="ratingStar" />
                  {naverInfo.length === 0 ? '0.00' : naverInfo.userRating}
                </div>
                <div>누적관객 {audience}명</div>
                <div>누적매출액 {salesAmt}원</div>
                {naverInfo.length === 0 ? null : (
                  <a href={naverInfo.link}>
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
const StarWrapper = styled.div``;
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
  position: relative;
  height: 340px;
  width: 600px;
  background-color: #1a2936;
`;
const Top = styled.div``;
const Bottom = styled.div`
  display: flex;
  align-items: center;
  color: #f5efd7;
  font-weight: 600;
  font-size: 18px;

  a {
    color: #f5efd7;
  }
`;
const BottomLeft = styled.div`
  width: 80%;
  border: 5px solid #f5efd7;
  border-radius: 10px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 320px;
  justify-content: center;
`;

const Title = styled.div`
  color: #e23830;
  font-size: 28px;
  font-weight: 700;
  text-align: center;
  width: 245px;
  border-bottom: 3px solid #f5efd7;
  margin-bottom: 10px;
`;
const Content = styled.div`
  display: flex;
  font-size: 15px;
  width: 85%;
  margin-bottom: 15px;
  justify-content: space-around;
  .movie-title {
    font-size: 22px;
  }
  .movie-subtitle {
    margin-bottom: 20px;
  }
`;
const Info = styled.div`
  margin-left: 10px;
  .ratingStar {
    color: #e23830;
    height: 13px;
    padding-top: 2px;
  }
`;
const BottomRight = styled.div`
  background-color: #f5efd7;
  width: 20%;
  height: 340px;
  padding-top: 0;
  padding-bottom: 0;
  padding-left: 10px;
  padding-right: 30px;
`;
const Number = styled.div`
  position: relative;
  transform: rotate(90deg);
  color: #3d3c3c;
  bottom: 175px;
  left: 55px;
`;
