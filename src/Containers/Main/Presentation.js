import React from 'react';
import styled from 'styled-components';
import {Spin} from 'antd';

import VideoItem from '../../components/VideoItem';

import {EyeOutlined, LikeOutlined, DislikeOutlined} from '@ant-design/icons';

const Container = styled.div`
  width: 1200px;

  padding: 20px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
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

const Item = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  height: 90px;
  font-size: 1rem;

  &:nth-of-type(even) {
    background: #ececec;
  }
`;

const Thumbnail = styled.img`
  width: 120px;
  height: 90px;
`;

const Data = styled.div`
  height: 80px;
`;

const PlaylistTitle = styled.div`
  padding-left: 10px;

  height: 30px;

  line-height: 30px;
  font-size: 1.1rem;
  font-weight: 600;

  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const VideoTitle = styled.div`
  padding-left: 5px;

  height: 25px;

  line-height: 25px;
  font-size: 1rem;

  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const Description = styled.div`
  display: flex;
  align-items: center;

  padding-left: 5px;

  height: 25px;

  line-height: 25px;
  font-size: 1rem;
`;

const Icon = styled.div`
  width: 20px;
  height: 20px;

  line-height: 20px;
  color: #c50066;
`;

const MainPresentation = ({
  history,
  topFive,
  isSpin,
}) => {
  return (
    <Container>
      <Spin spinning={isSpin} >
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