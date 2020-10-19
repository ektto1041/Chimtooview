import React from 'react';
import styled from 'styled-components';
import {Spin, Pagination} from 'antd';

import PlaylistItem from '../../components/PlaylistItem';

import {SORT_CATEGORY, SORT_ORDER} from '../../constants';

const Container = styled.div`
  width: 100%;
`;

const Wrapper = styled.div`
  padding: 20px;

  width: 100%;
`;

const SortBox = styled.div`
  width: 100%;

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

const Input = styled.input`
  width: 200px;
  height: 30px;

  outline: none;
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

const PaginationBox = styled.div`
  display:flex;
  justify-content: center;
`;


const PlListPresentation = ({
  list,
  isSpin,
  searchWord,
  totalPage,
  pageCurrent,

  onChangeSortCategory,
  onChangeSortOrder,
  onChangeSearchWord,
  onClickSearch,
  onChangePageCurrent,
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
                조회수 합계
                <RadioButton type='radio' name='sort_category' value={SORT_CATEGORY.VIEW_COUNT_SUM} onChange={onChangeSortCategory} />
                좋아요 합계
                <RadioButton type='radio' name='sort_category' value={SORT_CATEGORY.LIKE_COUNT_SUM} onChange={onChangeSortCategory} />
                싫어요 합계
                <RadioButton type='radio' name='sort_category' value={SORT_CATEGORY.DISLIKE_COUNT_SUM} onChange={onChangeSortCategory} />
                조회수 평균
                <RadioButton type='radio' name='sort_category' value={SORT_CATEGORY.VIEW_COUNT_AVG} onChange={onChangeSortCategory} />
                좋아요 평균
                <RadioButton type='radio' name='sort_category' value={SORT_CATEGORY.LIKE_COUNT_AVG} onChange={onChangeSortCategory} />
                싫어요 평균
                <RadioButton type='radio' name='sort_category' value={SORT_CATEGORY.DISLIKE_COUNT_AVG} onChange={onChangeSortCategory} />
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
          <SortBox style={{ marginTop: '10px' }}>
            <Line>
              <LineTitle>검색어</LineTitle>
              <LineContent>
                <Input type='text' value={searchWord} onChange={onChangeSearchWord}/>
              </LineContent>
            </Line>
          </SortBox>
          <ButtonBox>
            <Button onClick={onClickSearch}>검색</Button>
          </ButtonBox>
          <ItemBox>
            {list.map((item, idx) => (<PlaylistItem key={idx} item={item} />))}
          </ItemBox>
          {totalPage === -1 ?
          null :
          <PaginationBox>
            <Pagination defaultCurrent={1} current={pageCurrent} onChange={onChangePageCurrent} total={totalPage} pageSize={50}/>
          </PaginationBox>}
        </Wrapper>
      </Spin>
    </Container>
  );
};

export default PlListPresentation;