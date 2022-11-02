import styled from "styled-components";
import { ReactComponent as Magnify } from "../assets/magnify.svg";
import axios from "axios";
import { useContext } from "react";
import { SearchListContext } from "../context/context";
import { useNavigate } from "react-router-dom";
const SearchBar = ({ setKeyword, keyword }) => {
  const { setSearchList } = useContext(SearchListContext);
  const navigate = useNavigate();
  const getProcessedList = (arr) => {
    let newList = arr.slice();
    newList = newList.filter((el) => el.userRating !== "0.00");
    return newList;
  };
  const getMovie = async () => {
    if (keyword === "") {
      setSearchList([]);
    }
    try {
      const result = await axios.get(`api/v1/search/movie.json?query=${keyword}&display=12`, {
        headers: {
          "X-Naver-Client-Id": process.env.REACT_APP_NAVER_ID_KEY,
          "X-Naver-Client-Secret": process.env.REACT_APP_NAVER_SECRET_KEY,
        },
      });
      const processedData = getProcessedList(result.data.items);
      setSearchList(processedData);
      navigate("/search", {
        state: {
          keyword: keyword,
        },
      });
    } catch (err) {
      console.log(err);
    }
    setKeyword("");
  };

  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleKeywordOnKeyUp = (e) => {
    if (e.key === "Enter") {
      getMovie();
    }
  };
  return (
    <Container>
      <CustomInput
        type="text"
        placeholder="영화제목을 입력하세요"
        value={keyword}
        onChange={handleKeywordChange}
        onKeyUp={handleKeywordOnKeyUp}
      ></CustomInput>
      <MagnifySVG onClick={getMovie} />
    </Container>
  );
};
export default SearchBar;
const Container = styled.div``;
const CustomInput = styled.input`
  background-color: black;
  opacity: 0.9;
  width: 280px;
  color: white;
  text-indent: 5px;
  font-weight: 600;
  padding: 10px;
  margin-bottom: 5px;
  border-radius: 20px;
  border: none;
  &::placeholder {
    color: white;
    font-style: italic;
  }
`;
const MagnifySVG = styled(Magnify)`
  position: relative;
  top: 7px;
  right: 35px;
  cursor: pointer;
`;
