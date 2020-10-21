import React from 'react';
import styled from 'styled-components';
import {Spin} from 'antd';

import VideoItem from '../../components/VideoItem';

const Container = styled.div`
  width: 1200px;

  padding: 20px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const RefreshTime = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
`;

const Partition = styled.div`
  width: 50%;

  padding: 5px;
`;

const Title = styled.div`
  display: flex;
  align-items: center;

  margin-left: 10px;

  width: 100%;
  height: 75px;

  line-height: 75px;
  font-size: 2rem;
  font-weight: 600;
`;

const MainPresentation = ({
  topFive,
  reloadTime,
  isSpin,
}) => {
  return (
    <Container>
      <Spin spinning={isSpin} >
        <RefreshTime>데이터 갱신 시간: {reloadTime}</RefreshTime>
        <Wrapper>
          <Partition>
            <Title>최신</Title>
            {topFive.publishedAt.map((item, idx) => (
              <VideoItem key={idx} item={item}/>
            ))}
          </Partition>

          <Partition>
            <Title>조회수 Top 5</Title>
            {topFive.viewCount.map((item, idx) => (
              <VideoItem key={idx} item={item}/>
            ))}
          </Partition>
          
          <Partition>
            <Title>좋아요 Top 5</Title>
            {topFive.likeCount.map((item, idx) => (
              <VideoItem key={idx} item={item}/>
            ))}
          </Partition>
          
          <Partition>
            <Title>싫어요 Top 5</Title>
            {topFive.dislikeCount.map((item, idx) => (
              <VideoItem key={idx} item={item}/>
            ))}
          </Partition>
          
          <Partition>
            <Title>좋싫비 Top 5</Title>
            {topFive.likeRate.map((item, idx) => (
              <VideoItem key={idx} item={item}/>
            ))}
          </Partition>

          <Partition>
            <Title>좋싫차 Top 5</Title>
            {topFive.likeGap.map((item, idx) => (
              <VideoItem key={idx} item={item}/>
            ))}
          </Partition>

          <Partition>
            <Title>조좋비 Top 5</Title>
            {topFive.viewLikeRate.map((item, idx) => (
              <VideoItem key={idx} item={item}/>
            ))}
          </Partition>

          <Partition>
            <Title>조좋차 Top 5</Title>
            {topFive.viewLikeGap.map((item, idx) => (
              <VideoItem key={idx} item={item}/>
            ))}
          </Partition>
        </Wrapper>
      </Spin>
    </Container>
  );
};

export default MainPresentation;