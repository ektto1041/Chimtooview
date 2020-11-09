import React from 'react';
import styled from 'styled-components';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import {Spin} from 'antd';

import {COLOR} from '../../constants';

const Container = styled.div`
  width: 100%;
`;

const Notice = styled.div`
  width: 1160px;

  margin: 20px;
  padding: 20px;

  box-sizing: border-box;
  border: 2px solid gray;
`;

const Wrapper = styled.div`
  width 100%;
`;

const TitleBox = styled.div`
  display: flex;

  width: 100%;
  height: 35px;

  margin-top: 40px;
  margin-bottom: 10px;
`;

const TitleInput = styled.input`
  width: 100%;
`;

const Box = styled.div`
  display: flex;
  justify-content: flex-end;

  width: 100%;
  height: 50px;

  padding-right: 20px;
`;

const Input = styled.input`
  margin: 10px;

  width: 100px;
  height: 30px;

  line-height: 30px;
  font-size: 0.8rem;
  font-weight: 500;

  box-sizing: border-box;
  border: 2px solid ${COLOR.CHIM_MAIN};
  outline: none;

  background: white;
`;

const Button = styled.div`
  margin: 10px;

  width: 100px;
  height: 30px;

  line-height: 30px;
  color: ${COLOR.CHIM_MAIN};
  font-size: .8rem;
  font-weight: 600;
  user-select: none;
  text-align: center;

  box-sizing: border-box;
  border: 2px solid ${COLOR.CHIM_MAIN};
  border-radius: 25px;
  outline: none;

  background: white;

  cursor: pointer;

  transition: .5s all ease;
  &:hover {
    background: ${COLOR.CHIM_MAIN};
    color: white;
  }
`;

const PostBoardPresentation = ({
  isSpin,
  titleValue,
  contentValue,
  userIdValue,
  userPwValue,

  onChangeTitle,
  onChangeContent,
  onChangeUserId,
  onChangeUserPw,
  onClickPost,
}) => {
  return (
    <Container>
      <Notice>
        <h1>글쓰기 주의사항</h1>
        <p>1. 좋은 말만 씁시다.</p>
      </Notice>
      <Spin spinning={isSpin}>
        <Wrapper>
          <TitleBox>
            <TitleInput maxLength='50' value={titleValue} onChange={onChangeTitle} placeholder="  제목을 입력해주세요." />
          </TitleBox>
          <SunEditor
          lang='ko'
          name='editor'
          height="500"
          placeholder="내용을 입력해주세요."
          onChange={onChangeContent}
          setOptions={{
            buttonList:[
              ['font', 'fontSize'],
              ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
              ['fontColor', 'hiliteColor'],
              ['outdent', 'indent'],
              ['align', 'horizontalRule', 'list', 'lineHeight'],
              ['table', 'link']
            ]
          }}
          />
          <Box>
            <Input maxLength='12' value={userIdValue} onChange={onChangeUserId} placeholder=" 글쓴이"/>
            <Input maxLength='8' value={userPwValue} onChange={onChangeUserPw} type='password' placeholder=" 비밀번호"/>
          </Box>
          <Box>
            <Button onClick={onClickPost}>글쓰기</Button>
          </Box>
        </Wrapper>
      </Spin>
    </Container>
  );
};

export default PostBoardPresentation;