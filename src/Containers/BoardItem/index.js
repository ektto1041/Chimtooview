import React, { useEffect, useState } from 'react';

import BoardItemPresentation from './Presentation';

import {serverApis} from '../../Api';

const BoardItemContainer = ({
  match,
}) => {
  // Spin
  const [isSpin, setIsSpin] = useState(false);

  // BoardItem
  const [boardItem, setBoardItem] = useState({});

  useEffect(() => {
    const initFunc = async () => {
      // Spin
      setIsSpin(true);

      // BoardItem 가져오는 API
      await serverApis.getBoardItemById(match.params.boardItemId)
      .then(r => {
        console.log(r.data);

        setBoardItem(r.data);
      })
      .catch(e => {
        console.error(e);
      });

      // Spin
      setIsSpin(false);
    };
    initFunc();
  }, []);

  return (
    <>
      <BoardItemPresentation
        isSpin={isSpin}
        boardItem={boardItem}
      />
    </>
  );
};

export default BoardItemContainer;