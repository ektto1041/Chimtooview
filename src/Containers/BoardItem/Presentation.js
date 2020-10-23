import React from 'react';
import styled from 'styled-components';
import {Spin} from 'antd';
import ReactHtmlParser from 'react-html-parser';

const Container = styled.div`
  width: 100%;
`;

const Wrapper = styled.div`
  width: 100%;

  padding: 20px;
`;

const Head = styled.div`
  width: 1160px;
  height: 80px;

  padding-left: 20px;

  box-sizing: border-box;
  border-top: 3px solid gray;
`;

const Title = styled.div`
  width: 1160px;
  height: 40px;

  font-size: 1.3rem;
  font-weight: 600;
  line-height: 40px;
`;

const SubTitle = styled.div`
  display: flex;

  width: 1160px;
  height: 40px;
`;

const UserId = styled.div`
  width: 810px;

  font-size: 1rem;
  color: gray;
  line-height: 40px;
`;

const PublishedAt = styled.div`
  width: 200px;

  font-size: 1rem;
  color: gray;
  line-height: 40px;
`;

const ViewCount = styled.div`
  width: 150px;

  font-size: 1rem;
  color: gray;
  line-height: 40px;
`;

const Content = styled.div`
  width: 1160px;

  padding: 20px;

  box-sizing: border-box;
  border-top: 3px solid gray;
  border-bottom: 3px solid gray;
`;

const BoardItemPresentation = ({
  isSpin,
  boardItem,
}) => {
  return (
    <Container>
      <Spin spinning={isSpin}>
        <Wrapper>
          <Head>
            <Title>{boardItem.title}</Title>
            <SubTitle>
              <UserId>{boardItem.userId}</UserId>
              <PublishedAt>{boardItem?.publishedAt?.substring(0, 10)}</PublishedAt>
              <ViewCount>조회수: {boardItem.viewCount}</ViewCount>
            </SubTitle>
          </Head>
          <Content>{ReactHtmlParser(boardItem.content)}</Content>
        </Wrapper>
      </Spin>    
    </Container>
  );
};

export default BoardItemPresentation;