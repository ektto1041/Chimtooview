import React from 'react';
import styled from 'styled-components';
import {Spin, Pagination} from 'antd';

const Container = styled.div`
  width: 100%;
`;

const TitleBox = styled.div`
  display: flex;
  align-items: baseline;

  width: 100%;
  height: 80px;

  margin: 20px;
`;

const Title = styled.div`
  width: 150px;
  height: 80px;

  font-size: 3rem;
  font-weight: 600;
`;

const SubTitle = styled.div`
  height: 80px;

  font-size: 1.2rem;
`;

const ItemBox = styled.div`
  width: 1160px;

  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 20px;

  box-sizing: border-box;
  border: 2px solid gray;
`;

const ItemIndicator = styled.div`
  display: flex;

  height: 40px;

  background: #eaeaea;

  box-sizing: border-box;
  border-bottom: 2px solid gray;
`;

const ItemIndicatorPartition = styled.div`
  height: 40px;

  text-align: center;
  line-height: 40px;
  font-size: 1.2rem;
  font-weight: 600;
`;

const Item = styled.div`
  display: flex;

  height: 40px;

  background: #eaeaea;

  cursor: pointer;

  &:nth-of-type(odd) {
    background: #efefef;
  }
`;

const ItemTitle = styled.div`
  width: 830px;
  height: 40px;

  padding-left: 10px;
  
  line-height: 40px;
  font-size: 1.1rem;
  font-weight: 500;
`;

const ItemUserId = styled.div`
  width: 130px;
  height: 40px;

  padding-left: 10px;

  line-height: 40px;
  font-size: 1rem;
  font-weight: 500;
`;

const ItemDate = styled.div`
  width: 130px;
  height: 40px;

  line-height: 40px;
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
`;

const ItemViewCount = styled.div`
  width: 70px;
  height: 40px;

  line-height: 40px;
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;

  width: 100%;
  height: 50px;

  padding-right: 20px;
`;

const Button = styled.div`
  margin-left: 10px;
  margin-right: 10px;

  width: 100px;
  height: 30px;

  line-height: 30px;
  color: #c50066;
  font-size: .8rem;
  font-weight: 600;
  user-select: none;
  text-align: center;

  box-sizing: border-box;
  border: 2px solid #c50066;
  border-radius: 25px;
  outline: none;

  background: white;

  cursor: pointer;

  transition: .5s all ease;
  &:hover {
    background: #c50066;
    color: white;
  }
`;

const PaginationBox = styled.div`
  display:flex;
  justify-content: center;

  margin-bottom: 10px;
`;

const BoardPresentation = ({
  isSpin,
  boardItemList,
  totalPage,
  pageCurrent,

  onClickBoardItem,
  onClickPost,
  onChangePageCurrent,
}) => {
  return (
    <Container>
      <TitleBox>
        <Title>게시판</Title>
        <SubTitle>어떤 이야기든 좋습니다. 하지만 조금이라도 불씨가 타오르면 검열당합니다.</SubTitle>
      </TitleBox>
      <Spin spinning={isSpin}>
        <ItemBox>
          <ItemIndicator>
            <ItemIndicatorPartition style={{ width: '830px' }}>제목</ItemIndicatorPartition>
            <ItemIndicatorPartition style={{ width: '130px' }}>글쓴이</ItemIndicatorPartition>
            <ItemIndicatorPartition style={{ width: '130px' }}>날짜</ItemIndicatorPartition>
            <ItemIndicatorPartition style={{ width: '70px' }}>조회수</ItemIndicatorPartition>
          </ItemIndicator>
          {boardItemList.map((boardItem, idx) => (
            <Item onClick={() => onClickBoardItem(boardItem.id)} key={idx}>
              <ItemTitle>{boardItem.title}</ItemTitle>
              <ItemUserId>{boardItem.userId}</ItemUserId>
              <ItemDate>{boardItem.publishedAt.substring(0, 10)}</ItemDate>
              <ItemViewCount>{boardItem.viewCount}</ItemViewCount>
            </Item>
          ))}
        </ItemBox>
        <ButtonBox>
          <Button onClick={onClickPost}>글쓰기</Button>
        </ButtonBox>
        <PaginationBox>
          <Pagination defaultCurrent={1} current={pageCurrent} onChange={onChangePageCurrent} total={totalPage} pageSize={30}/>
        </PaginationBox>
      </Spin>
    </Container>
  );
};

export default BoardPresentation;