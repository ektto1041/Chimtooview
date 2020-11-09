import React from 'react';
import styled from 'styled-components';
import {Spin, Modal} from 'antd';
import {QuestionCircleOutlined} from '@ant-design/icons';

import VideoItem from '../../components/VideoItem';

import {JSX, COLOR} from '../../constants';

const Container = styled.div`
  width: 1200px;

  padding: 20px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const RefreshTime = styled.div`
  width: 1160px;  
  height: 50px;

  font-size: 1.2rem;
  font-weight: 600;
`;

const NewNotice = styled.div`
  width: 1160px;  
  height: 50px;

  padding-left: 20px;

  font-size: 1.2rem;
  font-weight: 600;
  line-height: 50px;

  box-sizing: border-box;
  border: 2px solid gray;
  
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const Partition = styled.div`
  width: 50%;

  padding: 5px;
`;

const Title = styled.div`
  display: flex;
  align-items: flex-end;

  margin-left: 10px;

  width: 100%;
  height: 75px;

  font-size: 2rem;
  font-weight: 600;
`;

const Icon = styled.div`
  align-self: center;

  width: 10px;
  height: 10px;

  margin-right: 10px;

  font-size: 1rem;
  line-height: 10px;
  color: ${COLOR.CHIM_MAIN};

  cursor: pointer;
`;

const ModalWrapper = styled.div`
  width: 300px;

  font-size: .9rem;
`;

const MainPresentation = ({
  topFive,
  reloadTime,
  newNotice,
  isSpin,
  modalVisible,

  onClickNotice,
  onCancelModal,
  onClickQuestion,
}) => {
  return (
    <Container>
      <Spin spinning={isSpin} >
        <RefreshTime>데이터 갱신 시간: {reloadTime}</RefreshTime>
        <NewNotice onClick={onClickNotice}>{newNotice.title}</NewNotice>
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
            <Title><Icon><QuestionCircleOutlined onClick={onClickQuestion} /></Icon>좋싫비 Top 5</Title>
            {topFive.likeRate.map((item, idx) => (
              <VideoItem key={idx} item={item}/>
            ))}
          </Partition>

          <Partition>
            <Title><Icon><QuestionCircleOutlined onClick={onClickQuestion} /></Icon>좋싫차 Top 5</Title>
            {topFive.likeGap.map((item, idx) => (
              <VideoItem key={idx} item={item}/>
            ))}
          </Partition>

          <Partition>
            <Title><Icon><QuestionCircleOutlined onClick={onClickQuestion} /></Icon>조좋비 Top 5</Title>
            {topFive.viewLikeRate.map((item, idx) => (
              <VideoItem key={idx} item={item}/>
            ))}
          </Partition>

          <Partition>
            <Title><Icon><QuestionCircleOutlined onClick={onClickQuestion} /></Icon>조좋차 Top 5</Title>
            {topFive.viewLikeGap.map((item, idx) => (
              <VideoItem key={idx} item={item}/>
            ))}
          </Partition>
        </Wrapper>
      </Spin>

      <Modal
        visible={modalVisible}
        centered
        title='도움말'
        footer={null}
        onCancel={onCancelModal}
      >
        <ModalWrapper>
          {JSX.TERM}
        </ModalWrapper>
      </Modal>
    </Container>
  );
};

export default MainPresentation;