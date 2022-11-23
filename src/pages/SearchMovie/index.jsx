import { useLocation } from 'react-router-dom';
import { useSearchMovies } from '../../context/searchMoviesContext';
import styled from 'styled-components';
import SearchResult from './SearchResult';

const Search = () => {
  const location = useLocation();
  const keyword = location.state.keyword;
  const { searchList } = useSearchMovies();

  return (
    <Container>
      <TitleWrapper>
        <span>'{keyword}' 검색결과</span>
      </TitleWrapper>
      {searchList.length === 0 ? (
        <div className="noResult">죄송합니다. 검색결과를 찾을 수 없습니다.</div>
      ) : (
        <ListContainer>
          {searchList.map((el, idx) => (
            <SearchResult key={idx} data={el} />
          ))}
        </ListContainer>
      )}
    </Container>
  );
};
export default Search;
const Container = styled.div`
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  width: 100%;
  padding: 20px;
  .noResult {
    margin: 50px;
  }
`;
const TitleWrapper = styled.div`
  text-align: left;
  width: 80%;
  span {
    font-size: 25px;
    font-weight: 700;
  }
`;
const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 80%;
  padding-top: 15px;
`;
