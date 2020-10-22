import React, { useState } from 'react';

import PostNoticePresentation from './Presentation';

import {serverApis} from '../../Api';

const PostNoticeContainer = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // RadioButton
  const [chosenType, setChosenType] = useState('apology');

  const onChangeType = (e) => {
    setChosenType(e.target.value);
  };

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onChangeContent = (e, editor) => {
    setContent(editor.getData());
  };

  const onClickPost = async () => {
    const newNoticeItem = [];

    newNoticeItem.push(title);
    newNoticeItem.push(content);
    newNoticeItem.push(chosenType);

    await serverApis.postNoticeItem(newNoticeItem)
    .then(r => {
      console.log(r.data);
    })
    .catch(e => {
      console.error(e);
    });
  }

  return (
    <>
      <PostNoticePresentation
        title={title}
        content={content}
        onChangeType={onChangeType}
        onChangeTitle={onChangeTitle}
        onChangeContent={onChangeContent}
        onClickPost={onClickPost}
      />
    </>
  );
};

export default PostNoticeContainer;