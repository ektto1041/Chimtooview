import React, { useCallback, useState } from 'react';
import crypto from 'crypto';

import PostBoardPresentation from './Presentation';

import {serverApis} from '../../Api';

const PostBoardConatiner = ({
  history,
}) => {
  // Spin
  const [isSpin, setIsSpin] = useState(false);

  // BoardItem
  const [titleValue, setTitleValue] = useState('');
  const [contentValue, setContentValue] = useState('');
  const [userIdValue, setUserIdValue] = useState('');
  const [userPwValue, setUserPwValue] = useState('');

  const onChangeTitle = useCallback((e) => {
    setTitleValue(e.target.value);
  }, []);
  const onChangeContent = useCallback((c) => {
    setContentValue(c);
  }, []);
  const onChangeUserId = useCallback((e) => {
    setUserIdValue(e.target.value);
  }, []);
  const onChangeUserPw = useCallback((e) => {
    setUserPwValue(e.target.value);
  }, []);

  // 글쓰기 버튼
  const onClickPost = useCallback(() => {
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

    // title 길이 검사
    if(calcLength(titleValue) < 4 || calcLength(titleValue) > 50) {
      alert('제목에는 영문,숫자 4~50글자 / 한글 2~25글자를 입력해야 합니다.');

      // Spin
      setIsSpin(false);
      return;
    }
    // userId 검사
    if(calcLength(userIdValue) < 4 || calcLength(userIdValue) > 12) {
      alert('글쓴이에는 영문,숫자 4~12글자 / 한글 2~6글자 까지 입력 가능합니다.');

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
        const newBoardItem = {
          title: titleValue,
          content: contentValue,
          userId: userIdValue,
          userPw: hash.toString('hex'),
          salt: salt,
        };

        await serverApis.postBoardItem(newBoardItem)
        .then(r => {
          alert('글 작성이 완료되었습니다!');

          history.push('/board');
        })
        .catch(e => {
          console.error(e);
        })

        // Spin
        setIsSpin(false);
      }
    })
  }, [history, titleValue, contentValue, userIdValue, userPwValue]);


  return (
    <>
      <PostBoardPresentation
        isSpin={isSpin}
        titleValue={titleValue}
        contentValue={contentValue}
        userIdValue={userIdValue}
        userPwValue={userPwValue}

        onChangeTitle={onChangeTitle}
        onChangeContent={onChangeContent}
        onChangeUserId={onChangeUserId}
        onChangeUserPw={onChangeUserPw}
        onClickPost={onClickPost}
      />
    </>
  );
};

export default PostBoardConatiner;