import React, { useCallback, useState } from 'react';

import VideoListPresentation from './Presentation';

import {serverApis} from '../../Api';
import {SORT_CATEGORY, SORT_ORDER} from '../../constants';

const VideoListContainer = ({
  ownerId,
}) => {
  // Video List
  const [list, setList] = useState([]);

  // Spin
  const [isSpin, setIsSpin] = useState(false);

  // RadioButton
  const [chosenSortCategory, setChosenSortCategory] = useState(SORT_CATEGORY.DATE);
  const [chosenSortOrder, setChosenSortOrder] = useState(SORT_ORDER.DSC);

  // Input
  const [startViewCount, setStartViewCount] = useState(0);
  const [endViewCount, setEndViewCount] = useState(999999999);
  const [startLikeCount, setStartLikeCount] = useState(0);
  const [endLikeCount, setEndLikeCount] = useState(999999999);
  const [startDislikeCount, setStartDislikeCount] = useState(0);
  const [endDislikeCount, setEndDislikeCount] = useState(999999999);
  const [searchWord, setSearchWord] = useState('');
  const [searchWordPlaylist, setSearchWordPlaylist] = useState('');

  // DatePicker
  const [dateRange, setDateRange] = useState(['1900-01-01', '2100-01-01']);       // [시작 날짜, 끝 날짜]

  // Pagination
  const [totalPage, setTotalPage] = useState(-1);       // 총 데이터 수 (-1이면 Pagination 이 보여지지 않음)
  const [pageCurrent, setPageCurrent] = useState(-1);   // 현재 페이지
  // Now - 현재 적용된 Filter 와 Sort
  const [nowSortCategory, setNowSortCategory] = useState(-1);
  const [nowSortOrder, setNowSortOrder] = useState(-1);
  const [nowDateRange, setNowDateRange] = useState(['', '']);
  const [nowStartViewCount, setNowStartViewCount] = useState(0);
  const [nowEndViewCount, setNowEndViewCount] = useState(999999999);
  const [nowStartLikeCount, setNowStartLikeCount] = useState(0);
  const [nowEndLikeCount, setNowEndLikeCount] = useState(999999999);
  const [nowStartDislikeCount, setNowStartDislikeCount] = useState(0);
  const [nowEndDislikeCount, setNowEndDislikeCount] = useState(999999999);
  const [nowSearchWord, setNowSearchWord] = useState('');
  const [nowSearchWordPlaylist, setNowSearchWordPlaylist] = useState('');

  // Modal
  const [modalVisible, setModalVisible] = useState(false);
  const onCancelModal = useCallback(() => {
    setModalVisible(false);
  }, []); 


  // Sort Category 변경
  const onChangeSortCategory = useCallback((e) => {
    setChosenSortCategory(e.target.value);
  }, []);

  // Sort Order 변경
  const onChangeSortOrder = useCallback((e) => {
    setChosenSortOrder(e.target.value);
  }, []);

  // DataPicker 변경
  const onChangeStartDate = useCallback((date, dateStr) => {
    const newDateRange = [...dateRange];
    newDateRange[0] = dateStr === '' ? '1900-01-01' : dateStr;

    console.log(newDateRange);

    setDateRange(newDateRange);
  }, [dateRange]);
  const onChangeEndDate = useCallback((date, dateStr) => {
    const newDateRange = [...dateRange];
    newDateRange[1] = dateStr === '' ? '2100-01-01' : dateStr;

    console.log(newDateRange);

    setDateRange(newDateRange);
  }, [dateRange]);

  // 조회수 변경
  const onChangeStartViewCount = useCallback((e) => {
    setStartViewCount(e.target.value === '' ? 0 : e.target.value);
  }, []);
  const onChangeEndViewCount = useCallback((e) => {
    setEndViewCount(e.target.value === '' ? 999999999 : e.target.value);
  }, []);

  // 좋아요 변경
  const onChangeStartLikeCount = useCallback((e) => {
    setStartLikeCount(e.target.value === '' ? 0 : e.target.value);
  }, []);
  const onChangeEndLikeCount = useCallback((e) => {
    setEndLikeCount(e.target.value === '' ? 999999999 : e.target.value);
  }, []);

  // 싫어요 변경
  const onChangeStartDislikeCount = useCallback((e) => {
    setStartDislikeCount(e.target.value === '' ? 0 : e.target.value);
  }, []);
  const onChangeEndDislikeCount = useCallback((e) => {
    setEndDislikeCount(e.target.value === '' ? 999999999 : e.target.value);
  }, []);

  // 검색어 변경
  const onChangeSearchWord = useCallback((e) => {
    setSearchWord(e.target.value);
  }, []);

  // Playlist 검색어 변경
  const onChangeSearchWordPlaylist = useCallback((e) => {
    setSearchWordPlaylist(e.target.value);
  }, []);

  // 검색 버튼
  const onClickSearch = useCallback(async () => {
    setIsSpin(true);

    if((chosenSortCategory !== '') && (chosenSortOrder !== '')) {
      // 조회수 값 검사
      if(startViewCount > endViewCount) {
        alert('조회수 값을 다시 설정해주세요.');

        setIsSpin(false);
        return;
      }
      // 좋아요 값 검사
      if(startLikeCount > endLikeCount) {
        alert('좋아요 값을 다시 설정해주세요.');

        setIsSpin(false);
        return;
      }
      // 싫어요 값 검사
      if(startDislikeCount > endDislikeCount) {
        alert('싫어요 값을 다시 설정해주세요.');

        setIsSpin(false);
        return;
      }

      // __BLANK 가 SearchWord 로 전달되면 DB에서 Contain 작업을 수행하지 않음
      const searchWordForApi = (searchWord.trim() === '' ? '__BLANK' : searchWord);
      const searchWordPlaylistForApi = (searchWordPlaylist.trim() === '' ? '__BLANK' : searchWordPlaylist);

      // Filter 가 적용된 Video List 의 데이터 수를 가져오는 API
      await serverApis.getVideoAllCountByFilter(
        ownerId,
        dateRange[0], dateRange[1],
        startViewCount, endViewCount,
        startLikeCount, endLikeCount,
        startDislikeCount, endDislikeCount,
        searchWordForApi, searchWordPlaylistForApi
      )
      .then(r => {
        setTotalPage(r.data);
      })
      .catch(e => {
        console.error(e);
      })

      // Filter&Sort 가 적용된 Video List 를 가져오는 API
      await serverApis.getVideoAllOrderByPaging(
        ownerId,
        chosenSortCategory, chosenSortOrder,
        dateRange[0], dateRange[1],
        startViewCount, endViewCount,
        startLikeCount, endLikeCount,
        startDislikeCount, endDislikeCount,
        searchWordForApi, searchWordPlaylistForApi,
        1)
      .then(r => {
        const newList = [];
        for(let i=0; i<r.data.length; i++) {
          newList.push(r.data[i]);
        }

        setPageCurrent(1);

        setNowSortCategory(chosenSortCategory);
        setNowSortOrder(chosenSortOrder);
        setNowDateRange(dateRange);
        setNowStartViewCount(startViewCount);
        setNowEndViewCount(endViewCount);
        setNowStartLikeCount(startLikeCount);
        setNowEndLikeCount(endLikeCount);
        setNowStartDislikeCount(startDislikeCount);
        setNowEndDislikeCount(endDislikeCount);
        setNowSearchWord(searchWordForApi);
        setNowSearchWordPlaylist(searchWordPlaylistForApi);

        setList(r.data);        
      })
      .catch(e => {
        console.error(e);
      })
    } else {
      // 분류가 선택되지 않았을 떄 (에러의 가능성이 높음)
      alert('분류가 제대로 선택되지 않았습니다.');  
    }

    setIsSpin(false);
  }, [ownerId, chosenSortCategory, chosenSortOrder, dateRange, startViewCount, endViewCount, startLikeCount, endLikeCount, startDislikeCount, endDislikeCount, searchWord, searchWordPlaylist]);

  // Page 변경
  const onChangePageCurrent = useCallback(async (page) => {
    setIsSpin(true);

    // 현재 페이지 변경
    setPageCurrent(page);

    // Filter&Sort 가 적용된 Video List 를 가져오는 API
    await serverApis.getVideoAllOrderByPaging(
      ownerId,
      nowSortCategory, nowSortOrder,
      nowDateRange[0], nowDateRange[1],
      nowStartViewCount, nowEndViewCount,
      nowStartLikeCount, nowEndLikeCount,
      nowStartDislikeCount, nowEndDislikeCount,
      nowSearchWord, nowSearchWordPlaylist,
      page)
    .then(r => {
      const newList = [];
      for(let i=0; i<r.data.length; i++) {
        newList.push(r.data[i]);
      }

      setList(r.data);
    })
    .catch(e => {
      console.error(e);
    })

    setIsSpin(false);
  }, [ownerId, nowSortCategory, nowSortOrder, nowDateRange, nowStartViewCount, nowEndViewCount, nowStartLikeCount, nowEndLikeCount, nowStartDislikeCount, nowEndDislikeCount, nowSearchWord, nowSearchWordPlaylist])

  // 도움말 클릭
  const onClickQuestion = useCallback(() => {
    setModalVisible(true);
  }, []);

  return (
    <>
      <VideoListPresentation
        list={list}
        isSpin={isSpin}
        searchWord={searchWord}
        searchWordPlaylist={searchWordPlaylist}
        totalPage={totalPage}
        pageCurrent={pageCurrent}
        modalVisible={modalVisible}
        
        onCancelModal={onCancelModal}
        onChangeSortCategory={onChangeSortCategory}
        onChangeSortOrder={onChangeSortOrder}
        onChangeStartDate={onChangeStartDate}
        onChangeEndDate={onChangeEndDate}
        onClickSearch={onClickSearch}
        onChangeStartViewCount={onChangeStartViewCount}
        onChangeEndViewCount={onChangeEndViewCount}
        onChangeStartLikeCount={onChangeStartLikeCount}
        onChangeEndLikeCount={onChangeEndLikeCount}
        onChangeStartDislikeCount={onChangeStartDislikeCount}
        onChangeEndDislikeCount={onChangeEndDislikeCount}
        onChangeSearchWord={onChangeSearchWord}
        onChangeSearchWordPlaylist={onChangeSearchWordPlaylist}
        onChangePageCurrent={onChangePageCurrent}
        onClickQuestion={onClickQuestion}
      />
    </>
  );
};

export default VideoListContainer;