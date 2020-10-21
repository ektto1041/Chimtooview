import React from 'react';
import styled from 'styled-components';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const Container = styled.div`
  width: 100%;
`;

const TitleInput = styled.input`
  width: 100%;
`;

const EditorBox = styled.div`
  width: 100%;
  min-height: 500px;

  .ck-content {
    height: 500px;
    overflow: vertical;
  }
`;

const Button = styled.div`
  width: 100%;
  height: 100px;

  background: blue;

  cursor: pointer;
`;

const PostNoticePresentation = ({
  title,
  content,
  onChangeTitle,
  onChangeContent,
  onClickPost,
}) => {
  return (
    <Container>
      <TitleInput value={title} onChange={onChangeTitle} />
      <EditorBox>
        <CKEditor
          editor={ClassicEditor}
          data={content}
          onChange={onChangeContent}
          config={(c) => {c.height = '500px';}}
        />
      </EditorBox>
      <Button onClick={onClickPost} >포스트</Button>
    </Container>
  );
};

export default PostNoticePresentation;