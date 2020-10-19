import React, { useCallback, useState } from 'react';

import VideoListPresentation from './Presentation';

import {serverApis} from '../../Api';
import {SORT_CATEGORY, SORT_ORDER} from '../../constants';

const VideoListContainer = () => {
  // Video List
  const [list, setList] = useState([]);

  // Spin
  const [isSpin, setIsSpin] = useState(false);

  // RadioButton
  const [chosenSortCategory, setChosenSortCategory] = useState(SORT_CATEGORY.DATE);
  const [chosenSortOrder, setChosenSortOrder] = useState(SORT_ORDER.DSC);

  // Input
  const [searchWord, setSearchWord] = useState('');
  const [searchWordPlaylist, setSearchWordPlaylist] = useState('');

  // Pagination
  const [totalPage, setTotalPage] = useState(-1);       // 총 데이터 수 (-1이면 Pagination 이 보여지지 않음)
  const [pageCurrent, setPageCurrent] = useState(-1);   // 현재 페이지
  // Now - 현재 적용된 Filter 와 Sort
  const [nowSortCategory, setNowSortCategory] = useState(-1);
  const [nowSortOrder, setNowSortOrder] = useState(-1);
  const [nowSearchWord, setNowSearchWord] = useState('');
  const [nowSearchWordPlaylist, setNowSearchWordPlaylist] = useState('');

  // Sort Category 변경
  const onChangeSortCategory = useCallback((e) => {
    setChosenSortCategory(e.target.value);
  }, []);

  // Sort Order 변경
  const onChangeSortOrder = useCallback((e) => {
    setChosenSortOrder(e.target.value);
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
      // __BLANK 가 SearchWord 로 전달되면 DB에서 Contain 작업을 수행하지 않음
      const searchWordForApi = (searchWord.trim() === '' ? '__BLANK' : searchWord);
      const searchWordPlaylistForApi = (searchWordPlaylist.trim() === '' ? '__BLANK' : searchWordPlaylist);

      // Filter 가 적용된 Video List 의 데이터 수를 가져오는 API
      await serverApis.getVideoAllCountByFilter(searchWordForApi, searchWordPlaylistForApi)
      .then(r => {
        setTotalPage(r.data);
      })
      .catch(e => {
        console.error(e);
      })

      // Filter&Sort 가 적용된 Video List 를 가져오는 API
      await serverApis.getVideoAllOrderByPaging(chosenSortCategory, chosenSortOrder, searchWordForApi, searchWordPlaylistForApi, 1)
      .then(r => {
        const newList = [];
        for(let i=0; i<r.data.length; i++) {
          newList.push(r.data[i]);
        }

        setPageCurrent(1);

        setNowSortCategory(chosenSortCategory);
        setNowSortOrder(chosenSortOrder);
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
  }, [chosenSortCategory, chosenSortOrder, searchWord, searchWordPlaylist]);

  // Page 변경
  const onChangePageCurrent = useCallback(async (page) => {
    setIsSpin(true);

    // 현재 페이지 변경
    setPageCurrent(page);

    // Filter&Sort 가 적용된 Video List 를 가져오는 API
    await serverApis.getVideoAllOrderByPaging(nowSortCategory, nowSortOrder, nowSearchWord, nowSearchWordPlaylist, page)
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
  }, [nowSortCategory, nowSortOrder, nowSearchWord, nowSearchWordPlaylist])

  return (
    <>
      <VideoListPresentation
        list={list}
        isSpin={isSpin}
        searchWord={searchWord}
        searchWordPlaylist={searchWordPlaylist}
        totalPage={totalPage}
        pageCurrent={pageCurrent}

        onChangeSortCategory={onChangeSortCategory}
        onChangeSortOrder={onChangeSortOrder}
        onClickSearch={onClickSearch}
        onChangeSearchWord={onChangeSearchWord}
        onChangeSearchWordPlaylist={onChangeSearchWordPlaylist}
        onChangePageCurrent={onChangePageCurrent}
      />
    </>
  );
};

export default VideoListContainer;