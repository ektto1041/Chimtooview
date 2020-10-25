import React from 'react';
import styled from 'styled-components';
import {Spin, Pagination, DatePicker} from 'antd';

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

  box-sizing: border-box;
  border: .5px solid gray;

  background-color: #e3e3e3;
`;

const Line = styled.div`
  display: flex;
  align-items: center;

  width: 1160px;
  height: 50px;
`;

const HalfLine = styled.div`
  display: flex;
  align-items: center;

  width: 580px;
  height: 50px;
`;

const LineTitle = styled.div`
  width: 120px;
  height: 50px;

  line-height: 50px;
  text-align: center;
  font-size: 1.2rem;
  font-weight: 600;
`;

const LineContent = styled.div`
  display: flex;
  align-items: center;

  height: 50px;
`;

const RadioButton = styled.input`
  margin-left: 3px;
  margin-right: 20px;
`;

const Input = styled.input`
  width: 200px;
  height: 30px;

  outline: none;
  box-sizing: border-box;
  border: .5px solid gray;
`;

const DatePickerStyle = {
  height: 30,

  boxSizing: 'border-box',
  border: '.5px solid gray',
}

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

const VideoListPresentation = ({
  list,
  isSpin,
  searchWord,
  searchWordPlaylist,
  totalPage,
  pageCurrent,

  onChangeSortCategory,
  onChangeSortOrder,
  onChangeStartDate,
  onChangeEndDate,
  onClickSearch,
  onChangeStartViewCount,
  onChangeEndViewCount,
  onChangeStartLikeCount,
  onChangeEndLikeCount,
  onChangeStartDislikeCount,
  onChangeEndDislikeCount,
  onChangeSearchWord,
  onChangeSearchWordPlaylist,
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
                조회수
                <RadioButton type='radio' name='sort_category' value={SORT_CATEGORY.VIEW_COUNT} onChange={onChangeSortCategory} />
                길이
                <RadioButton type='radio' name='sort_category' value={SORT_CATEGORY.DURATION} onChange={onChangeSortCategory} />
                좋아요
                <RadioButton type='radio' name='sort_category' value={SORT_CATEGORY.LIKE_COUNT} onChange={onChangeSortCategory} />
                싫어요
                <RadioButton type='radio' name='sort_category' value={SORT_CATEGORY.DISLIKE_COUNT} onChange={onChangeSortCategory} />
                좋싫비
                <RadioButton type='radio' name='sort_category' value={SORT_CATEGORY.LIKE_DISLIKE_RATE} onChange={onChangeSortCategory} />
                좋실차
                <RadioButton type='radio' name='sort_category' value={SORT_CATEGORY.LIKE_DISLIKE_GAP} onChange={onChangeSortCategory} />
                조좋비
                <RadioButton type='radio' name='sort_category' value={SORT_CATEGORY.VIEW_LIKE_RATE} onChange={onChangeSortCategory} />
                조좋차
                <RadioButton type='radio' name='sort_category' value={SORT_CATEGORY.VIEW_LIKE_GAP} onChange={onChangeSortCategory} />
                좋길비
                <RadioButton type='radio' name='sort_category' value={SORT_CATEGORY.LIKE_DURATION_RATE} onChange={onChangeSortCategory} />
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
              <HalfLine>
                <LineTitle>날짜</LineTitle>
                <LineContent>
                  <DatePicker allowClear placeholder={'1900-01-01'} onChange={onChangeStartDate} style={DatePickerStyle} />
                  ~
                  <DatePicker allowClear placeholder={'2100-01-01'} onChange={onChangeEndDate} style={DatePickerStyle} />
                </LineContent>
              </HalfLine>
              <HalfLine>
                <LineTitle>조회수</LineTitle>
                <LineContent>
                  <Input type='number' placeholder=' 0' style={{ width: 144 }} min='0' max='999999999' onChange={onChangeStartViewCount} />
                  ~
                  <Input type='number' placeholder=' 999,999,999' style={{ width: 144 }} min='0' max='999999999' onChange={onChangeEndViewCount} />
                </LineContent>
              </HalfLine>
            </Line>
            <Line>
              <HalfLine>
                <LineTitle>좋아요</LineTitle>
                <LineContent>
                  <Input type='number' placeholder=' 0' style={{ width: 144 }} min='0' max='999999999' onChange={onChangeStartLikeCount} />
                  ~
                  <Input type='number' placeholder=' 999,999,999' style={{ width: 144 }} min='0' max='999999999' onChange={onChangeEndLikeCount} />
                </LineContent>
              </HalfLine>
              <HalfLine>
                <LineTitle>싫어요</LineTitle>
                <LineContent>
                  <Input type='number' placeholder=' 0' style={{ width: 144 }} min='0' max='999999999' onChange={onChangeStartDislikeCount} />
                  ~
                  <Input type='number' placeholder=' 999,999,999' style={{ width: 144 }} min='0' max='999999999' onChange={onChangeEndDislikeCount} />
                </LineContent>
              </HalfLine>
            </Line>
            <Line>
              <HalfLine>
                <LineTitle>재생목록</LineTitle>
                <LineContent>
                  <Input type='text' value={searchWordPlaylist} onChange={onChangeSearchWordPlaylist}/>
                </LineContent>
              </HalfLine>
              <HalfLine>
                <LineTitle>검색어</LineTitle>
                <LineContent>
                  <Input type='text' value={searchWord} onChange={onChangeSearchWord}/>
                </LineContent>
              </HalfLine>
            </Line>
          </SortBox>
          <ButtonBox>
            <Button onClick={onClickSearch} >검색</Button>
          </ButtonBox>
          <ItemBox>
            {list.map((item, idx) => (<VideoItem key={idx} item={item} />))}
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

export default VideoListPresentation;