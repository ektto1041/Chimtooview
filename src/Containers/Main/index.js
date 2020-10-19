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
  })

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
        isSpin={isSpin}
      />
    </>
  );
};
export default MainContainer;