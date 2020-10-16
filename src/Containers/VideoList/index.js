import React, { useCallback, useEffect, useState } from 'react';

import VideoListPresentation from './Presentation';

import {serverApis} from '../../Api';
import {SORT_CATEGORY, SORT_ORDER} from '../../constants';

const VideoListContainer = ({
  allPlaylist,
  allVideo,
}) => {
  // Video List
  const [list, setList] = useState([]);

  // Spin
  const [isSpin, setIsSpin] = useState(false);

  // RadioButton
  const [nowSortCategory, setNowSortCategory] = useState(SORT_CATEGORY.DATE);
  const [nowSortOrder, setNowSortOrder] = useState(SORT_ORDER.DSC);

  // Sort Category 변경
  const onChangeSortCategory = useCallback((e) => {
    setNowSortCategory(e.target.value);
  }, []);

  // Sort Order 변경
  const onChangeSortOrder = useCallback((e) => {
    setNowSortOrder(e.target.value);
  }, []);

  // 검색 버튼
  const onClickSearch = useCallback(async () => {
    if((nowSortCategory !== '') && (nowSortOrder !== '')) {
      await serverApis.getVideoAllOrderByPaging(nowSortCategory, nowSortOrder)
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
    } else {
      alert('분류를 전부 선택해주세요.');
    }
  }, [nowSortCategory, nowSortOrder]);

  return (
    <>
      <VideoListPresentation
        list={list}
        isSpin={isSpin}

        onChangeSortCategory={onChangeSortCategory}
        onChangeSortOrder={onChangeSortOrder}
        onClickSearch={onClickSearch}
      />
    </>
  );
};

export default VideoListContainer;