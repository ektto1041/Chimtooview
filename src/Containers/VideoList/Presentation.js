import React from 'react';
import styled from 'styled-components';
import {Spin} from 'antd';

import VideoItem from '../../components/VideoItem';

import {SORT_CATEGORY, SORT_ORDER} from '../../constants';

const Container = styled.div`
  width: 1200px;
`;

const Wrapper = styled.div`
  padding: 20px;

  width: 100%;
`;

const SortBox = styled.div`
  width: 100%;
  height: 100px;

  box-sizing: border-box;
  border: .5px solid gray;

  background-color: #e3e3e3;
`;

const Line = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  height: 50px;
`;

const LineTitle = styled.div`
  width: 10%;
  height: 50px;

  line-height: 50px;
  text-align: center;
  font-size: 1.2rem;
  font-weight: 600;
`;

const LineContent = styled.div`
  display: flex;
  align-items: center;

  width: 90%;
  height: 50px;
`;

const RadioButton = styled.input`
  margin-right: 20px;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 50px;
`;

const Button = styled.div`
  margin: 10px;

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

const ItemBox = styled.div`
  width: 100%;
`;

const VideoListPresentation = ({
  list,
  isSpin,

  onChangeSortCategory,
  onChangeSortOrder,
  onClickSearch,
}) => {
  return (
    <Container>
      <Spin spinning={isSpin}>
        <Wrapper>
          <SortBox>
            <Line>
              <LineTitle>분류</LineTitle>
              <LineContent>
                날짜
                <RadioButton type='radio' name='sort_category' defaultChecked value={SORT_CATEGORY.DATE} onChange={onChangeSortCategory} />
                조회수
                <RadioButton type='radio' name='sort_category' value={SORT_CATEGORY.VIEW_COUNT} onChange={onChangeSortCategory} />
                좋아요
                <RadioButton type='radio' name='sort_category' value={SORT_CATEGORY.LIKE_COUNT} onChange={onChangeSortCategory} />
                싫어요
                <RadioButton type='radio' name='sort_category' value={SORT_CATEGORY.DISLIKE_COUNT} onChange={onChangeSortCategory} />
                좋싫비
                <RadioButton type='radio' name='sort_category' value={SORT_CATEGORY.LIKE_RATE} onChange={onChangeSortCategory} />
                좋실차
                <RadioButton type='radio' name='sort_category' value={SORT_CATEGORY.LIKE_GAP} onChange={onChangeSortCategory} />
                조좋비
                <RadioButton type='radio' name='sort_category' value={SORT_CATEGORY.VIEW_LIKE_RATE} onChange={onChangeSortCategory} />
                조좋차
                <RadioButton type='radio' name='sort_category' value={SORT_CATEGORY.VIEW_LIKE_GAP} onChange={onChangeSortCategory} />
              </LineContent>
            </Line>
            <Line>
              <LineTitle>순서</LineTitle>
              <LineContent>
                내림차순
                <RadioButton type='radio' name='sort_order' defaultChecked value={SORT_ORDER.DSC} onChange={onChangeSortOrder} />
                오름차순
                <RadioButton type='radio' name='sort_order' value={SORT_ORDER.ASC} onChange={onChangeSortOrder} />
              </LineContent>
            </Line>
          </SortBox>
          <ButtonBox>
            <Button onClick={onClickSearch} >검색</Button>
            <Button>조건 초기화</Button>
          </ButtonBox>
          <ItemBox>
            {list.map((item, idx) => (<VideoItem key={idx} item={item} />))}
          </ItemBox>
        </Wrapper>
      </Spin>
    </Container>
  );
};

export default VideoListPresentation;