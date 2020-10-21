import React, { useEffect, useState } from 'react';

import {serverApis} from '../../Api';
import {SORT_CATEGORY} from '../../constants';

import Presentation from './Presentation';

const MainContainer = () => {
  // 각 분류마다 상위 5개의 Video를 담는 State
  const [topFive, setTopFive] = useState({
    publishedAt: [],
    viewCount: [],
    likeCount: [],
    dislikeCount: [],
    likeRate: [],
    likeGap: [],
    viewLikeRate: [],
    viewLikeGap: [],
  });

  // 데이터 갱신 시각
  const [reloadTime, setReloadTime] = useState('');

  // Spin
  const [isSpin, setIsSpin] = useState(false);

  // USE EFFECT
  /**
   *  1. 모든 Video 를 가져옴
   *  2. 가져온 Video 를 분류에 따라 상위 5개씩 나눠 State에 저장
   */
  useEffect(() => {
    const initFunc = async () => {
      setIsSpin(true);

      // 데이터 갱신 시간 가져오기
      await serverApis.getReloadTime()
      .then(r => {
        console.log(r.data); // 2020-10-20T10:16:06.788

        const newReloadTime = r.data.substring(0, 4) + '년 ' + r.data.substring(5, 7) + '월 ' + r.data.substring(8, 10) + '일 ' +
                              r.data.substring(11, 13) + '시 ' + r.data.substring(14, 16) + '분 ' + r.data.substring(17, 19) + '초';
        
        setReloadTime(newReloadTime);
      })
      .catch(e => {
        console.error(e);
      });

      // 모든 Video 가져오기
      await serverApis.getVideoAllForTopFive()
      .then(r => {
        const allVideoForTopFive = r.data;

        const newTopFive = {
          publishedAt: allVideoForTopFive[SORT_CATEGORY.DATE],
          viewCount: allVideoForTopFive[SORT_CATEGORY.VIEW_COUNT],
          likeCount: allVideoForTopFive[SORT_CATEGORY.LIKE_COUNT],
          dislikeCount: allVideoForTopFive[SORT_CATEGORY.DISLIKE_COUNT],
          likeRate: allVideoForTopFive[SORT_CATEGORY.LIKE_RATE],
          likeGap: allVideoForTopFive[SORT_CATEGORY.LIKE_GAP],
          viewLikeRate: allVideoForTopFive[SORT_CATEGORY.VIEW_LIKE_RATE],
          viewLikeGap: allVideoForTopFive[SORT_CATEGORY.VIEW_LIKE_GAP],
        };

        setTopFive(newTopFive);

        setIsSpin(false);
      })
      .catch(e =>{
        console.error(e);

        setIsSpin(false);
      })
    };

    initFunc();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Presentation
        topFive={topFive}
        reloadTime={reloadTime}
        isSpin={isSpin}
      />
    </>
  );
};
export default MainContainer;