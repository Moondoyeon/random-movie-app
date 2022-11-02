/* eslint-disable react-hooks/exhaustive-deps */
import Machine from '../components/RandomMachine/Machine';
import RandomResult from '../components/RandomResult';
// import useDidMountEffect from '../utils/useDidmountEffect';
import styled from 'styled-components';
import { useState } from 'react';
import axios from 'axios';
import { slotCountry, slotYear, slotType } from '../constants';
import Loading from '../components/Loading';
import { useEffect } from 'react';
// 컴포넌트
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

  // 랜덤 영화 한개 뽑기 from kobis | 분명히 국내/외국 보내는데 구분없이 일별박스오피스응답이 오는것같다.
  const getRandomMovieFromKobis = async () => {
    try {
      const result = await axios.get(
        `http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${process.env.REACT_APP_KOBIS_API_KEY}&targetDt=${state.year}&itemPerPage=3&multiMovieYn=${state.type}&repNationCd=${state.country}`,
      );
      console.log(result.data.boxOfficeResult.dailyBoxOfficeList);
      if (result.data.boxOfficeResult.dailyBoxOfficeList.length === 0) {
        alert('랜덤 영화를 뽑지 못했습니다 ㅜ_ㅜ 다시 시도해주세요!');
        return;
      } else {
        setKobisInfo(result.data.boxOfficeResult.dailyBoxOfficeList[0]);
        return result.data.boxOfficeResult.dailyBoxOfficeList[0];
      }
    } catch (err) {
      console.log(err, 'kobis random error');
      alert('죄송합니다. 잠시 후 다시 시도해주세요 ㅜ_ㅜ');
    }
  };
  // 뽑은 영화 상세정보요청 from 네이버
  const getMovieFromNaver = async (movie, year) => {
    let title = movie.replace(/<b>/gi, '').replace(/<\/b>/gi, '');
    // const processedTitle = title.slice(0, 5);
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
      console.log(err, 'naver random error');
      alert('죄송합니다. 잠시 후 다시 시도해주세요 ㅜ_ㅜ');
    }
  };
  // start 버튼
  const handleRestartSlot = () => {
    setHalted(false);
  };
  // 최초 렌더링시 실행 x
  const [isLoading, setIsLoading] = useState(true);
  // useDidMountEffect(async () => {
  //   setIsLoading(true);
  //   if (state.country) {
  //     const KobisResult = await getRandomMovieFromKobis();
  //     if (KobisResult) {
  //       const year = KobisResult.openDt.slice(0, 4);
  //       const NaverResult = await getMovieFromNaver(KobisResult.movieNm, year);
  //       NaverResult ? setNaverInfo(NaverResult) : setNaverInfo([]);
  //       setIsLoading(false);
  //       setTicketModal(true);
  //       setState({
  //         country: '',
  //         type: '',
  //         year: '',
  //       });
  //     }
  //   } else {
  //     return;
  //   }
  // }, [state.country, state, setNaverInfo]);
  const getMovie = async () => {
    if (state.country) {
      const KobisResult = await getRandomMovieFromKobis();
      if (KobisResult) {
        const year = KobisResult.openDt.slice(0, 4);
        const NaverResult = await getMovieFromNaver(KobisResult.movieNm, year);
        NaverResult ? setNaverInfo(NaverResult) : setNaverInfo([]);
        setIsLoading(false);
        setTicketModal(true);
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
    setIsLoading(true);
    getMovie();
  }, [state.country, isLoading, state]);

  return (
    <Container>
      <Machine
        setTicketModal={setTicketModal}
        getSlotContent={getSlotContent}
        halted={halted}
        setHalted={setHalted}
      />
      {isLoading && <Loading />}
      {ticketModal ? (
        <>
          <RandomResult setTicketModal={setTicketModal} kobisInfo={kobisInfo} naverInfo={naverInfo} />
        </>
      ) : null}
      <ReStart onClick={handleRestartSlot}>START</ReStart>
    </Container>
  );
};
export default Random;
const Container = styled.div`
  margin-top: 150px;
`;
const ReStart = styled.div`
  font-family: 'Press Start 2P', cursive;

  font-size: 40px;
  cursor: pointer;
  position: relative;
  left: 932px;
  bottom: 260px;
  font-weight: 600;
  width: 150px;
  @keyframes blink-effect {
    50% {
      opacity: 0;
    }
  }
  & {
    animation: blink-effect 1.2s step-end infinite;
  }
  &:hover {
    color: violet;
  }
`;
