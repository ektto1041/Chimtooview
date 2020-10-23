import React, {useCallback, useEffect, useState} from 'react';

import BoardPresentation from './Presentation';

import {serverApis} from '../../Api';

const BoardContainer = ({
  history,
}) => {
  // Spin
  const [isSpin, setIsSpin] = useState(false);

  // BoardItemList
  const [boardItemList, setBoardItemList] = useState([]);

  // Pagiantion
  const [totalPage, setTotalPage] = useState(-1);       // 총 데이터 수 (-1이면 Pagination 이 보여지지 않음)
  const [pageCurrent, setPageCurrent] = useState(-1);   // 현재 페이지

  // USE EFFECT - 게시판 글들을 OrderBy Paging 하여 가져옴
  useEffect(() => {
    const initFunc = async () => {
      // Spin
      setIsSpin(true);

      // 게시판 글 수 가져오는 API
      await serverApis.getBoardItemAllCountByFilter('__BLANK')
      .then(r => {
        setTotalPage(r.data);
        setPageCurrent(1);
      })
      .catch(e => {
        console.error(e);
      });

      // 게시판 글 가져오는 API
      await serverApis.getBoardItemAllOrderByPaging('__BLANK', 1)
      .then(r => {
        setBoardItemList(r.data);
      })
      .catch(e => {
        console.error(e);
      });

      // Spin
      setIsSpin(false);
    };
    initFunc();
  }, [])

  // BoardItem 클릭
  const onClickBoardItem = useCallback((boardItemId) => {
    history.push(`/boardItem/${boardItemId}`);
  }, [history]);

  // 글쓰기 버튼
  const onClickPost = useCallback(() => {
    history.push('/postBoard');
  }, [history]);

  // Page 변경
  const onChangePageCurrent = useCallback(async (page) => {
    // Spin
    setIsSpin(true);

    // 현재 페이지 변경
    setPageCurrent(page);

    // Paging된 BoardItem List 를 가져오는 API
    await serverApis.getBoardItemAllOrderByPaging('__BLANK', page)
    .then(r => {
      setBoardItemList(r.data);
    })
    .catch(e => {
      console.error(e);
    })

    setIsSpin(false);
  }, []);

  return (
    <>
      <BoardPresentation
        isSpin={isSpin}
        boardItemList={boardItemList}
        totalPage={totalPage}
        pageCurrent={pageCurrent}

        onClickBoardItem={onClickBoardItem}
        onClickPost={onClickPost}
        onChangePageCurrent={onChangePageCurrent}
      />
    </>
  );
};

export default BoardContainer;