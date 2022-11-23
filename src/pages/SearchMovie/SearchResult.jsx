import React from 'react';
import styled from 'styled-components';
import { ReactComponent as NoImage } from '../../assets/noImage.svg';
const SearchResult = ({ data }) => {
  const year = data.pubDate !== '' ? `(${data.pubDate})` : null;
  const title = data.title.replace(/<b>/gi, '').replace(/<\/b>/gi, '');
  const director = data.director.replace(/[^\w\sㄱ-힣]$/, '');
  const actor = data.actor.replace(/[^\w\sㄱ-힣]$/, '');
  return (
    <ItemContainer>
      <ImgWrapper>{data.image === '' ? <NoImageSVG /> : <img src={data.image} alt={title} />}</ImgWrapper>
      <ContentWrapper>
        <Row>
          <div className="data title">
            {title}
            {year}
          </div>
        </Row>
        <Row>
          <div className="data subtitle">{data.subtitle}</div>
        </Row>
        <Row>
          <div className="data">감독: {director}</div>
        </Row>
        <Row>
          <div className="data">출연: {actor}</div>
        </Row>
        <Row>
          <span>평점: </span>
          {data.userRating}
        </Row>
        <Row>
          <a href={data.link}>
            <span>더보기</span>
          </a>
        </Row>
      </ContentWrapper>
    </ItemContainer>
  );
};
export default SearchResult;
const ItemContainer = styled.li`
  list-style: none;
  display: flex;
  flex-basis: 33%;
  margin-top: 5px;
  margin-bottom: 5px;
  padding-top: 10px;
  padding-bottom: 10px;
`;
const ImgWrapper = styled.div`
  display: flex;
  img {
    width: 110px;
    height: 160px;
    border-radius: 5px;
  }
`;
const ContentWrapper = styled.div`
  padding-left: 10px;
  margin-right: 10px;
`;
const Row = styled.div`
  font-weight: 500;

  .data {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  .title {
    font-size: 18px;
    font-weight: 700;
  }
  .subtitle {
    margin-bottom: 43px;
  }
`;
const NoImageSVG = styled(NoImage)`
  width: 110px;
  height: 160px;
  border-radius: 5px;
`;
