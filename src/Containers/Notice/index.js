import React, { useEffect, useState } from 'react';

import NoticePresentation from './Presentation.js';

import {serverApis} from '../../Api';

const NoticeContainer = () => {
  // Spin
  const [isSpin, setIsSpin] = useState(false);

  // NoticeList
  const [noticeList, setNoticeList] = useState([]);
  const [isOpenList, setIsOpenList] = useState([]);     // notice Item 이 열려있는 지 여부가 저장된 state / true이면 열림 false면 닫힘

  // Pagiantion
  const [totalPage, setTotalPage] = useState(-1);       // 총 데이터 수 (-1이면 Pagination 이 보여지지 않음)
  const [pageCurrent, setPageCurrent] = useState(-1);   // 현재 페이지

  useEffect(() => {
    const initFunc = async () => {
      setIsSpin(true);

      // totalPage 가져오기
      await serverApis.getNoticeAllCount()
      .then(r => {
        setTotalPage(r.data);
        setPageCurrent(1);
      })
      .catch(e => {
        console.error(e);
      });

      // 모든 공지사항 가져오기
      await serverApis.getNoticeAllOrderByPaging(1)
      .then(r => {
        setNoticeList(r.data);

        const newIsOpenList = [];
        for(let i=0; i<r.data.length; i++) {
          newIsOpenList.push(false);
        }

        setIsOpenList(newIsOpenList);
      })
      .catch(e => {
        console.error(e);
      })

      setIsSpin(false);
    }
    initFunc();
  }, []);

  const onClickNotice = (idx) => {
    const newIsOpenList = [];

    for(let i=0; i<isOpenList.length; i++) {
      newIsOpenList.push(idx === i ? !isOpenList[i] : isOpenList[i]);
    }

    setIsOpenList(newIsOpenList);
  }

  return (
    <>
      <NoticePresentation
        isSpin={isSpin}
        noticeList={noticeList}
        isOpenList={isOpenList}
        pageCurrent={pageCurrent}
        totalPage={totalPage}

        onClickNotice={onClickNotice}
      />
    </>
  );
};

export default NoticeContainer;