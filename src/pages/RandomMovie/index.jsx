/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';

import axios from 'axios';
import styled from 'styled-components';
import { flexBox, positionCenter } from '../../styles/mixins';
import { slotCountry, slotYear, slotType } from '../../constants';
import { useAlertModal } from '../../context/alertModalContext';
import Machine from './Machine/Machine';
import Loading from '../../components/Loading/Loading';
import RandomResult from './Result/RandomResult';

const Random = () => {
  const [state, setState] = useState({
    country: '',
    year: '',
    type: '',
  });
  const [halted, setHalted] = useState(true);
  const [ticketModal, setTicketModal] = useState(false);
  const [kobisInfo, setKobisInfo] = useState('');
  const [naverInfo, setNaverInfo] = useState([]);

  //버저 누른값 받아와서 처리
  const getSlotContent = (opt1, opt2, opt3) => {
    const RANDOM_MONTH = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
    const RANDOM_DAY = String(Math.floor(Math.random() * 29) + 1).padStart(2, '0');
    const processedYear = `${slotYear[opt2]}${RANDOM_MONTH}${RANDOM_DAY}`;
    setState({
      ...state,
      country: slotCountry[opt1][1],
      type: slotType[opt3][1],
      year: processedYear,
    });
  };
  const { show } = useAlertModal();
  // 랜덤 영화 한개 뽑기 from kobis
  const getRandomMovieFromKobis = async () => {
    try {
      const result = await axios.get(
        `http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${process.env.REACT_APP_KOBIS_API_KEY}&targetDt=${state.year}&itemPerPage=3&multiMovieYn=${state.type}&repNationCd=${state.country}`,
      );
      console.log(result.data.boxOfficeResult.dailyBoxOfficeList);
      if (result.data.boxOfficeResult.dailyBoxOfficeList.length === 0) {
        show('랜덤영화를 뽑지 못했습니다. 다시 뽑아주세요!');

        return;
      } else {
        setKobisInfo(result.data.boxOfficeResult.dailyBoxOfficeList[0]);
        return result.data.boxOfficeResult.dailyBoxOfficeList[0];
      }
    } catch (err) {
      console.log(err, 'kobis random error');
      show('죄송합니다. 잠시 후 다시 시도해주세요');
    }
  };
  // 뽑은 영화 상세정보요청 from 네이버
  const getMovieFromNaver = async (movie, year) => {
    let title = movie.replace(/<b>/gi, '').replace(/<\/b>/gi, '');
    console.log(title);
    try {
      const result = await axios.get(`/v1/search/movie.json?query=${title}&yearfrom=${year}&yearto=${year}`, {
        headers: {
          'X-Naver-Client-Id': process.env.REACT_APP_NAVER_ID_KEY,
          'X-Naver-Client-Secret': process.env.REACT_APP_NAVER_SECRET_KEY,
        },
      });
      return result.data.items[0];
    } catch (err) {
      show('죄송합니다. 잠시 후 다시 시도해주세요');
    }
  };
  // start 버튼
  const handleRestartSlot = () => {
    setHalted(false);
  };
  const [isLoading, setIsLoading] = useState(true);
  const getMovie = async () => {
    if (state.country) {
      const KobisResult = await getRandomMovieFromKobis();
      if (KobisResult) {
        const year = KobisResult.openDt.slice(0, 4);
        const NaverResult = await getMovieFromNaver(KobisResult.movieNm, year);
        NaverResult ? setNaverInfo(NaverResult) : setNaverInfo([]);
        setState({
          country: '',
          type: '',
          year: '',
        });
      }
    } else {
      return;
    }
  };

  useEffect(() => {
    getMovie();
    setIsLoading(true);
    setTimeout(() => {
      setTicketModal(true);
      setIsLoading(false);
    }, 900);
  }, [state.country, state]);

  return (
    <Container>
      <Wrapper>
        {isLoading && (
          <LoadingContainer>
            <Loading />
          </LoadingContainer>
        )}
        <Machine
          setTicketModal={setTicketModal}
          getSlotContent={getSlotContent}
          halted={halted}
          setHalted={setHalted}
        />
        {ticketModal && (
          <RandomResult setTicketModal={setTicketModal} kobisInfo={kobisInfo} naverInfo={naverInfo} />
        )}
        <ReStart onClick={handleRestartSlot}>START</ReStart>
      </Wrapper>
    </Container>
  );
};
export default Random;
const LoadingContainer = styled.div`
  top: 5px;
  ${flexBox()};
  ${positionCenter()};
  background-color: ${({ theme }) => theme.grayBrownColor};
  height: 340px;
  width: 600px;
`;
const Container = styled.div`
  min-height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Wrapper = styled.div``;
const ReStart = styled.div`
  font-family: 'Press Start 2P', cursive;
  font-size: 40px;
  cursor: pointer;
  position: relative;
  left: 932px;
  bottom: 260px;
  font-weight: 600;
  width: 150px;
  /* @keyframes blink-effect {
    50% {
      opacity: 0;
    }
  }
  & {
    animation: blink-effect 1.2s step-end infinite;
  }
  &:hover {
    color: violet;
  } */
`;
