import React, { useCallback, useEffect, useState } from 'react';

import FramePresentation from './Presentation';

import {OWNER} from '../../constants';

const FrameContainer = ({
  history,
}) => {
  const [owner, setOwner] = useState(OWNER[0]);

  const onClickLogo = useCallback(() => {
  }, []);

  const onClickSubLogo = useCallback((ownerId) => {
    setOwner(OWNER[ownerId]);
  }, []);

  return (
    <>
      <FramePresentation
        history={history}
        owner={owner}

        onClickLogo={onClickLogo}
        onClickSubLogo={onClickSubLogo}
      />
    </>
  );
};

export default FrameContainer;