import React from 'react';
import styled from 'styled-components';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';

const Container = styled.div`
  width: 100%;
`;

const TypeBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 35px;

  margin-top: 10px;
`;

const RadioButton = styled.input`
  margin-right: 5px;
`;

const TitleBox = styled.div`
  display: flex;

  width: 100%;
  height: 35px;

  margin-top: 10px;
  margin-bottom: 10px;
`;

const TitleText = styled.div`
  width: 100px;
  height: 35px;

  padding-right: 10px;

  line-height: 35px;
  text-align: end;
`;

const TitleInput = styled.input`
  width: 800px;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;

  width: 100%:
  height: 35px;

  margin-bottom: 10px;
  margin-top: 10px;
`;

const Button = styled.div`
  width: 100px;
  height: 35px;

  line-height: 35px;
  text-align: center;
  color: black;

  box-sizing: border-box;
  border: .5px solid gray;

  background: white;

  cursor: pointer;

  transition: .5s all ease;
  &:hover {
    color: white;
    background: blue;
  }
`;

const PostNoticePresentation = ({
  title,
  content,
  onChangeType,
  onChangeTitle,
  onChangeContent,
  onClickPost,
}) => {
  return (
    <Container>
      <TypeBox>
        <RadioButton type='radio' name='notice_type' defaultChecked value='apology' onChange={onChangeType} />
        사과의 말씀
        <RadioButton type='radio' name='notice_type' value='normal' onChange={onChangeType} style={{ marginLeft: '30px' }} />
        공지사항
      </TypeBox>
      <TitleBox>
        <TitleText>제목 : </TitleText>
        <TitleInput value={title} onChange={onChangeTitle} />
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
      <ButtonBox>
        <Button onClick={onClickPost} >포스트</Button>
      </ButtonBox>
    </Container>
  );
};

export default PostNoticePresentation;