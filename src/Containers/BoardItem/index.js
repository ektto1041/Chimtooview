import React, { useEffect, useState, useCallback } from 'react';
import crypto from 'crypto';

import BoardItemPresentation from './Presentation';

import {serverApis} from '../../Api';

const BoardItemContainer = ({
  match,
  history,
}) => {
  // Spin
  const [isSpin, setIsSpin] = useState(false);
  const [isModalSpin, setIsModalSpin] = useState(false);

  // BoardItem
  const [boardItem, setBoardItem] = useState({});

  // CommentItem Input
  const [contentValue, setContentValue] = useState('');
  const [userIdValue, setUserIdValue] = useState('');
  const [userPwValue, setUserPwValue] = useState('');

  const onChangeContent = useCallback((e) => {
    setContentValue(e.target.value);
  }, []);
  const onChangeUserId = useCallback((e) => {
    setUserIdValue(e.target.value);
  }, []);
  const onChangeUserPw = useCallback((e) => {
    setUserPwValue(e.target.value);
  }, []);

  // Pagiantion
  const [totalPage, setTotalPage] = useState(-1);       // 총 데이터 수 (-1이면 Pagination 이 보여지지 않음)
  const [pageCurrent, setPageCurrent] = useState(-1);   // 현재 페이지

  // MODAL
  const [deleteBoardItemModalVisible, setDeleteBoardItemModalVisible] = useState(false);
  const onCancelDeleteBoardItemModal = useCallback(() => {
    setDeleteBoardItemModalVisible(false);
    setModalInputValue('');
  }, []);

  const [reportBoardItemModalVisible, setReportBoardItemModalVisible] = useState(false);
  const onCancelReportBoardItemModal = useCallback(() => {
    setReportBoardItemModalVisible(false);
    setModalInputValue('');
  }, []);

  const [reportCommentItemModalVisible, setReportCommentItemModalVisible] = useState(false);
  const onCancelReportCommentItemModal = useCallback(() => {
    setReportCommentItemModalVisible(false);
    setModalInputValue('');
  }, []);

  const [deleteCommentItemModalVisible, setDeleteCommentItemModalVisible] = useState(false);
  const onCancelDeleteCommentItemModal = useCallback(() => {
    setDeleteCommentItemModalVisible(false);
    setModalInputValue('');
  }, []);

  const [modalInputValue, setModalInputValue] = useState('');
  const onChangeModalInputValue = useCallback((e) => {
    setModalInputValue(e.target.value);
  }, []);

  // 댓글 삭제 시 선택한 댓글의 id를 저장하는 State
  const [chosenCommentItemIdx, setChosenCommentItemIdx] = useState('');

  // USE EFFECT
  useEffect(() => {
    const initFunc = async () => {
      // Spin
      setIsSpin(true);

      let newBoardItem = {};

      // BoardItem 가져오는 API
      await serverApis.getBoardItemById(match.params.boardItemId)
      .then(r => {
        newBoardItem = r.data;
        setTotalPage(r.data.commentItemCount);
        setPageCurrent(1);
      })
      .catch(e => {
        console.error(e);
      });

      // BoardItem 의 CommentItem 가져오는 API
      await serverApis.getCommentItemAllOrderByPaging(match.params.boardItemId, 1)
      .then(r => {
        newBoardItem.commentItemList = r.data;

        setBoardItem(newBoardItem);
      })

      // Spin
      setIsSpin(false);
    };
    initFunc();
  }, []);

  // 글 삭제 버튼
  const onClickDeleteBoardItem = useCallback(() => {
    setDeleteBoardItemModalVisible(true);
  }, []);

  // 글 신고 버튼
  const onClickReportBoardItem = useCallback(() => {
    setReportBoardItemModalVisible(true);
  }, []);

  // 댓글 삭제 버튼
  const onClickDeleteCommentItem = useCallback((idx) => {
    setChosenCommentItemIdx(idx);
    setDeleteCommentItemModalVisible(true);
  }, []);

  // 댓글 신고 버튼
  const onClickReportCommentItem = useCallback((idx) => {
    setChosenCommentItemIdx(idx);
    setReportCommentItemModalVisible(true);
  }, []);

  // 댓글 쓰기 버튼
  const onClickCommentItemPost = useCallback(() => {
    // string 길이 검사 함수
    const calcLength = (str) => {
      let count = 0;

      for(let i=0; i<str.length; i++) {
        if(escape(str.charAt(i)).length === 6) {
          count++;
        }
        count++;
      }

      return count;
    }

    // Spin
    setIsSpin(true);

    // userId 검사
    if(calcLength(userIdValue) < 4 || calcLength(userIdValue) > 12) {
      alert('댓글쓴이에는 영문,숫자 4~12글자 / 한글 2~6글자 까지 입력 가능합니다.');

      // Spin
      setIsSpin(false);
      return;
    }
    // userPw 검사
    if(calcLength(userPwValue) < 4 || calcLength(userPwValue) > 8) {
      alert('비밀번호에는 영문,숫자 4~8글자만 입력 가능합니다.');

      // Spin
      setIsSpin(false);
      return;
    }
    // content 검사
    if(calcLength(contentValue) < 4 || calcLength(contentValue) > 600) {
      alert('내용에는 영문,숫자 4~600글자 / 한글 2~300글자 까지 입력 가능합니다.');

      // Spin
      setIsSpin(false);
      return;
    }

    // userPw 암호화 1. Salt
    const bf = Buffer.alloc(64);
    const salt = crypto.randomFillSync(bf).toString('hex');

    // userPw 암호화 2. Crypto
    crypto.pbkdf2(userPwValue, salt, 612, 64, 'sha512', async (err, hash) => {
      if(err) {
        console.error(err);

        // Spin
        setIsSpin(false);
      } else {
        // 암호화가 성공하면 API
        const newCommentItem = {
          content: contentValue,
          userId: userIdValue,
          userPw: hash.toString('hex'),
          salt: salt,
          boardItemId: boardItem.id,
        };

        await serverApis.postCommentItem(newCommentItem)
        .then(r => {
          alert('댓글 작성이 완료되었습니다!');

          history.go(0);
        })
        .catch(e => {
          console.error(e);
        })

        // Spin
        setIsSpin(false);
      }
    })
  }, [history, contentValue, userIdValue, userPwValue, boardItem]);

  // Page 변경
  const onChangePageCurrent = useCallback(async (page) => {
    // 현재 페이지 변경
    setPageCurrent(page);

    // Paging된 CommentItem List 를 가져오는 API
    await serverApis.getCommentItemAllOrderByPaging(boardItem.id, page)
    .then(r => {
      const newBoardItem = {
        ...boardItem,
        commentItemList: r.data,
      };

      setBoardItem(newBoardItem);
    })
    .catch(e => {
      console.error(e);
    })
  }, [boardItem]);

  // 글 삭제 Modal 글 삭제 버튼
  const onClickDeleteBoardItemInModal = useCallback(() => {
    // Spin
    setIsModalSpin(true);
    
    // 비밀번호 검사
    crypto.pbkdf2(modalInputValue, boardItem.salt, 612, 64, 'sha512', async (err, hash) => {
      if(err) {
        console.error(err);

        // Spin
        setIsModalSpin(false);
      } else {
        // 암호화가 성공하면 기존 비밀번호와 비교
        if(hash.toString('hex') === boardItem.userPw) {
          await serverApis.deleteBoardItemById(boardItem.id)
          .then(r => {
            alert('삭제가 완료되었습니다!');
            
            history.push('/board');

            // Spin
            setIsModalSpin(false);
          })
          .catch(e => {
            console.error(e);

            // Spin
            setIsModalSpin(false);
          })
        } else {
          // 기존 비밀번호와 다를 때
          
          alert('비밀번호가 틀립니다.');

          // Spin
          setIsModalSpin(false);
        }
      }
    })
  }, [boardItem, modalInputValue, history]);

  // 글 신고 Modal 신고 버튼
  const onClickReportBoardItemInModal = useCallback(async () => {
    // 신고 이유 검사
    if(modalInputValue.trim() === '') {
      alert('이유를 적어주세요.');

      return;
    }

    // Spin
    setIsModalSpin(true);

    const newReports = {
      type: 'BoardItem',
      itemId: boardItem.id,
      content: modalInputValue,
    };

    await serverApis.postReports(newReports)
    .then(r => {
      alert('신고가 완료되었습니다!');

      setReportBoardItemModalVisible(false);
      setModalInputValue(false);
    })
    .catch(e => {
      console.error(e);
    })
  }, [boardItem, modalInputValue]);

  // 댓글 삭제 Modal 댓글 삭제 버튼
  const onClickDeleteCommentItemInModal = useCallback(() => {
    // Spin
    setIsModalSpin(true);
    
    // 비밀번호 검사
    crypto.pbkdf2(modalInputValue, boardItem.commentItemList[chosenCommentItemIdx].salt, 612, 64, 'sha512', async (err, hash) => {
      if(err) {
        console.error(err);

        // Spin
        setIsModalSpin(false);
      } else {
        // 암호화가 성공하면 기존 비밀번호와 비교
        if(hash.toString('hex') === boardItem.commentItemList[chosenCommentItemIdx].userPw) {
          await serverApis.deleteCommentItemById(boardItem.commentItemList[chosenCommentItemIdx].id)
          .then(r => {
            alert('삭제가 완료되었습니다!');
            
            history.go(0);

            // Spin
            setIsModalSpin(false);
          })
          .catch(e => {
            console.error(e);

            // Spin
            setIsModalSpin(false);
          })
        } else {
          // 기존 비밀번호와 다를 때
          
          alert('비밀번호가 틀립니다.');

          // Spin
          setIsModalSpin(false);
        }
      }
    })
  }, [boardItem, modalInputValue, chosenCommentItemIdx, history]);

  // 댓글 신고 Modal 신고 버튼
  const onClickReportCommentItemInModal = useCallback(async () => {
    // 신고 이유 검사
    if(modalInputValue.trim() === '') {
      alert('이유를 적어주세요.');

      return;
    }

    // Spin
    setIsModalSpin(true);

    const newReports = {
      type: 'CommentItem',
      itemId: boardItem.commentItemList[chosenCommentItemIdx].id,
      content: modalInputValue,
    };

    await serverApis.postReports(newReports)
    .then(r => {
      alert('신고가 완료되었습니다!');

      setReportCommentItemModalVisible(false);
      setModalInputValue(false);
    })
    .catch(e => {
      console.error(e);
    })

    // Spin
    setIsModalSpin(false);
  }, [boardItem, modalInputValue, chosenCommentItemIdx]);

  return (
    <>
      <BoardItemPresentation
        isSpin={isSpin}
        isModalSpin={isModalSpin}
        boardItem={boardItem}
        contentValue={contentValue}
        userIdValue={userIdValue}
        userPwValue={userPwValue}
        totalPage={totalPage}
        pageCurrent={pageCurrent}
        deleteBoardItemModalVisible={deleteBoardItemModalVisible}
        deleteCommentItemModalVisible={deleteCommentItemModalVisible}
        reportBoardItemModalVisible={reportBoardItemModalVisible}
        reportCommentItemModalVisible={reportCommentItemModalVisible}
        modalInputValue={modalInputValue}
        
        onCancelDeleteBoardItemModal={onCancelDeleteBoardItemModal}
        onCancelDeleteCommentItemModal={onCancelDeleteCommentItemModal}
        onCancelReportBoardItemModal={onCancelReportBoardItemModal}
        onCancelReportCommentItemModal={onCancelReportCommentItemModal}
        onChangeModalInputValue={onChangeModalInputValue}
        onClickDeleteBoardItem={onClickDeleteBoardItem}
        onClickDeleteCommentItem={onClickDeleteCommentItem}
        onClickReportBoardItem={onClickReportBoardItem}
        onClickReportCommentItem={onClickReportCommentItem}
        onChangeContent={onChangeContent}
        onChangeUserId={onChangeUserId}
        onChangeUserPw={onChangeUserPw}
        onClickCommentItemPost={onClickCommentItemPost}
        onChangePageCurrent={onChangePageCurrent}
        onClickDeleteBoardItemInModal={onClickDeleteBoardItemInModal}
        onClickDeleteCommentItemInModal={onClickDeleteCommentItemInModal}
        onClickReportBoardItemInModal={onClickReportBoardItemInModal}
        onClickReportCommentItemInModal={onClickReportCommentItemInModal}
      />
    </>
  );
};

export default BoardItemContainer;