import SearchBar from './SearchBar';
import styled from 'styled-components';
import { ReactComponent as Logo } from '../assets/logo.svg';
import { Link } from 'react-router-dom';
import { useState } from 'react';
const Container = styled.header`
  display: flex;
  width: 100vw;
  justify-content: space-between;
  align-items: center;
  background-color: #ffd461;
  height: 90px;
  padding-left: 40px;
  padding-right: 20px;
  position: sticky;
  top: 0;
`;
const LogoSVG = styled(Logo)``;

const Nav = () => {
  const [keyword, setKeyword] = useState('');
  return (
    <Container>
      <Link to="/">
        <LogoSVG />
      </Link>
      <SearchBar setKeyword={setKeyword} keyword={keyword} />
    </Container>
  );
};
export default Nav;
