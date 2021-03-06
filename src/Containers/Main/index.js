import React, { useCallback, useEffect, useState } from 'react';

import {serverApis} from '../../Api';
import {PATH} from '../../constants';

import Presentation from './Presentation';

const MainContainer = ({
  history,
  ownerId,
}) => {
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

  // 최신 공지사항
  const [newNotice, setNewNotice] = useState('');

  // 데이터 갱신 시각
  const [reloadTime, setReloadTime] = useState('');

  // Spin
  const [isSpin, setIsSpin] = useState(false);

  // Modal
  const [modalVisible, setModalVisible] = useState(false);
  const onCancelModal = useCallback(() => {
    setModalVisible(false);
  }, []);
  
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
        const newReloadTime = r.data.substring(0, 4) + '년 ' + r.data.substring(5, 7) + '월 ' + r.data.substring(8, 10) + '일 ' +
                              r.data.substring(11, 13) + '시 ' + r.data.substring(14, 16) + '분 ' + r.data.substring(17, 19) + '초';
        
        setReloadTime(newReloadTime);
      })
      .catch(e => {
        console.error(e);

        setIsSpin(false);
      });

      // 모든 Video 가져오기
      await serverApis.getVideoAllForTopFive(ownerId)
      .then(r => {
        const allVideoForTopFive = r.data;

        const newTopFive = {
          publishedAt: allVideoForTopFive[0],
          viewCount: allVideoForTopFive[1],
          likeCount: allVideoForTopFive[2],
          dislikeCount: allVideoForTopFive[3],
          likeRate: allVideoForTopFive[4],
          likeGap: allVideoForTopFive[5],
          viewLikeRate: allVideoForTopFive[6],
          viewLikeGap: allVideoForTopFive[7],
        };

        setTopFive(newTopFive);
      })
      .catch(e =>{
        console.error(e);

        setIsSpin(false);
      })

      // 최신 공지사항 가져오기
      await serverApis.getNoticeItemNew()
      .then(r => {
        setNewNotice(r.data);

        setIsSpin(false);
      })
      .catch(e => {
        console.error(e);

        setIsSpin(false);
      })
    };
    initFunc();
  }, [ownerId]);

  // 최신 공지사항 클릭
  const onClickNotice = useCallback(() => {
    history.push(PATH.NOTICE);
  }, [history]);

  // 도움말 클릭
  const onClickQuestion = useCallback(() => {
    setModalVisible(true);
  }, []);

  return (
    <>
      <Presentation
        topFive={topFive}
        reloadTime={reloadTime}
        newNotice={newNotice}
        isSpin={isSpin}
        modalVisible={modalVisible}

        onClickNotice={onClickNotice}
        onClickQuestion={onClickQuestion}
        onCancelModal={onCancelModal}
      />
    </>
  );
};
export default MainContainer;