import React from 'react';
import styled from 'styled-components';
import {Spin, Pagination} from 'antd';
import ReactHtmlParser from 'react-html-parser';

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
  width: 200px;
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

const Item = styled.div`
  background: #eaeaea;

  &:nth-of-type(odd) {
    background: #efefef;
  }
`;

const ItemHead = styled.div`
  display: flex;

  height: 75px;

  cursor: pointer;
`;

const ItemType = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 110px;
  
  text-align: center;
  font-size: 1.2rem;
  font-weight: 500;
  color: ${p => p.type === 'apology' ? 'red' : 'blue'};
`;

const ItemTitle = styled.div`
  display: flex;
  align-items: center;

  width: 1040px;

  padding-left: 20px;

  font-size: 1.2rem;
  font-weight: 700;
`;

const ItemDate = styled.div`
  display: flex;
  align-items: center;

  width: 110px;

  font-size: 1.1rem;
`;

const ItemContent = styled.div`
  display: ${p => p.isOpen ? 'block' : 'none'};

  padding: 20px;

  box-sizing: border-box;
  border-bottom: 2px solid gray;

  background: white;
`;

const PaginationBox = styled.div`
  display:flex;
  justify-content: center;

  margin-bottom: 10px;
`;

const NoticePresentation = ({
  isSpin,
  noticeList,
  isOpenList,
  pageCurrent,
  totalPage,

  onClickNotice,
  onChangePageCurrent,
}) => {
  return (
    <Container>
      <TitleBox>
        <Title>공지사항</Title>
        <SubTitle>침투뷰의 개선사항, 사과의 말씀 등이 올라옵니다.</SubTitle>
      </TitleBox>
      <Spin spinning={isSpin}>
        <ItemBox>
          {noticeList.map((noticeItem, idx) => (
            <Item key={idx}>
              <ItemHead onClick={() => onClickNotice(idx)}>
                <ItemType type={noticeItem.type} isOpen={isOpenList[idx]}>
                  {noticeItem.type === 'apology' ?
                  <>사과의<br />말씀</> :
                  <>공지사항</>}
                </ItemType>
                <ItemTitle>
                  {noticeItem.title}
                </ItemTitle>
                <ItemDate>
                  {noticeItem.publishedAt.substring(0,10)}
                </ItemDate>
              </ItemHead>
              <ItemContent isOpen={isOpenList[idx]}>
                {ReactHtmlParser(noticeItem.content)}
              </ItemContent>
            </Item>
          ))}
        </ItemBox>
        <PaginationBox>
          <Pagination defaultCurrent={1} current={pageCurrent} onChange={onChangePageCurrent} total={totalPage} pageSize={10}/>
        </PaginationBox>
      </Spin>
    </Container>
  );
};

export default NoticePresentation;